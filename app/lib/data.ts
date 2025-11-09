import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
  Film,
  Member,
  Review,
  MemberReview,
  FilmReview
} from './definitions';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchFilms() {
  try {
  const data = await sql<Film[]>`SELECT * FROM films`;
  return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch films data.');
  }
}

export async function fetchFilmsOrdered(sortOrder: 'newest' | 'oldest' = 'newest'): Promise<Film[]> {
  try {
  const direction = sortOrder === 'oldest' ? sql`ASC` : sql`DESC` ;
  const data = await sql<Film[]>`SELECT * FROM films ORDER BY film_date_discussed ${direction}; `;
  return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ordered films data.');
  }
}

export async function fetchLatestFilm(): Promise<Film[]> {
  try {
    const data = await sql<Film[]>`SELECT * FROM films ORDER BY film_date_discussed DESC LIMIT 1;`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest film data.');
  }
}

export async function fetchHighestRatedFilm(): Promise<any[]> {
  try {
    const data = await sql.unsafe(`
    SELECT 
        r.film_id,
        r.avg_final_rating,
        f.film_name,
        f.film_director,
        f.film_year_released,
        f.film_poster_url,
        f.film_date_discussed
      FROM film_review_summary r
      JOIN films f ON r.film_id = f.id
      WHERE r.avg_final_rating = (
        SELECT MAX(avg_final_rating)
        FROM film_review_summary
      )
      ORDER BY f.film_name;`);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest film data.');
  }
}

export async function fetchLowestRatedFilm(): Promise<any[]> {
  try {
    const data = await sql.unsafe(`
    SELECT 
        r.film_id,
        r.avg_final_rating,
        f.film_name,
        f.film_director,
        f.film_year_released,
        f.film_poster_url,
        f.film_date_discussed
      FROM film_review_summary r
      JOIN films f ON r.film_id = f.id
      WHERE r.avg_final_rating = (
        SELECT MIN(avg_final_rating)
        FROM film_review_summary
      )
      ORDER BY f.film_name;`);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest film data.');
  }
}

export async function fetchMostLikedFilm(): Promise<any[]> {
  try {
    const data = await sql.unsafe(`
    SELECT 
        r.film_id,
        r.like_percentage,
        f.film_name,
        f.film_director,
        f.film_year_released,
        f.film_poster_url,
        f.film_date_discussed
      FROM film_review_summary r
      JOIN films f ON r.film_id = f.id
      WHERE r.like_percentage = (
        SELECT MAX(like_percentage)
        FROM film_review_summary
      )
      ORDER BY f.film_name;`);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest film data.');
  }
}

export async function fetchLeastLikedFilm(): Promise<any[]> {
  try {
    const data = await sql.unsafe(`
    SELECT 
        r.film_id,
        r.like_percentage,
        f.film_name,
        f.film_director,
        f.film_year_released,
        f.film_poster_url,
        f.film_date_discussed
      FROM film_review_summary r
      JOIN films f ON r.film_id = f.id
      WHERE r.like_percentage = (
        SELECT MIN(like_percentage)
        FROM film_review_summary
      )
      ORDER BY f.film_name;`);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch latest film data.');
  }
}

export async function fetchMembers() {
  try {
  const data = await sql<Member[]>`SELECT * FROM members`;
  return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch members data.');
  }
}

export async function fetchReviews() {
  try {
    const data = await sql<Review[]>`SELECT * FROM reviews ORDER BY film_id`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch members data.');
  }
}

export async function fetchReviewsOrdered(
  sortCriteria:
    | 'film_id'
    | 'member_id'
    | 'review_initial_rating'
    | 'review_final_rating'
    | 'review_like',
  sortOrder: 'highest' | 'lowest' = 'highest'
): Promise<any[]> {
  try {
    const validColumns = [
      'film_id',
      'member_id',
      'review_initial_rating',
      'review_final_rating',
      'review_like',
    ] as const;

    const sortColumn = validColumns.includes(sortCriteria)
      ? sortCriteria
      : 'review_final_rating';

    const direction = sortOrder === 'lowest' ? 'ASC' : 'DESC';

    const query = `
      SELECT 
        r.film_id,
        r.member_id,
        r.review_initial_rating,
        r.review_final_rating,
        r.review_like,
        m.member_name,
        f.film_name,
        f.film_director,
        f.film_year_released,
        f.film_poster_url,
        f.film_date_discussed
      FROM reviews r
      JOIN members m ON r.member_id = m.id
      JOIN films f ON r.film_id = f.id
      ORDER BY r.${sortColumn} ${direction};
    `;

    const data = await sql.unsafe(query);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch reviews data.');
  }
}


export async function fetchFilmReviewSummary(): Promise<FilmReview[]> {
  try {
    const data = await sql<FilmReview[]>`
      SELECT *
      FROM film_review_summary;
    `;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch film review summary view data.');
  }
}

export async function fetchFilmReviewSummaryOrdered(
  sortCriteria:
    | 'avg_initial_rating'
    | 'avg_final_rating'
    | 'like_percentage'
    | 'dislike_percentage'
    | 'reviews_count' = 'avg_final_rating',
  sortOrder: 'highest' | 'lowest' = 'highest'
): Promise<FilmReview[]> {
  try {
    const validColumns = [
      'avg_initial_rating',
      'avg_final_rating',
      'like_percentage',
      'dislike_percentage',
      'reviews_count',
    ] as const;

    const sortColumn = validColumns.includes(sortCriteria)
      ? sortCriteria
      : 'avg_final_rating';

    const direction = sortOrder === 'lowest' ? 'ASC' : 'DESC';

    const query = `
      SELECT *
      FROM film_review_summary
      ORDER BY ${sortColumn} ${direction};
    `;

    // console.log('Query:', query);

    const data = await sql.unsafe<FilmReview[]>(query);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch member review summary view data.');
  }
}

export async function fetchMemberReviewSummary(
  sortCriteria:
    | 'avg_initial_rating'
    | 'avg_final_rating'
    | 'percent_likes'
    | 'rating_change_stddev'
    | 'avg_rating_change'
    | 'review_count' = 'avg_final_rating',
  sortOrder: 'highest' | 'lowest' = 'highest'
): Promise<MemberReview[]> {
  try {
    const validColumns = [
      'avg_initial_rating',
      'avg_final_rating',
      'percent_likes',
      'rating_change_stddev',
      'avg_rating_change',
      'review_count',
    ] as const;

    const sortColumn = validColumns.includes(sortCriteria)
      ? sortCriteria
      : 'avg_final_rating';

    const direction = sortOrder === 'lowest' ? 'ASC' : 'DESC';

    const query = `
      SELECT *
      FROM member_review_summary
      ORDER BY ${sortColumn} ${direction};
    `;

    // console.log('Query:', query);

    const data = await sql.unsafe<MemberReview[]>(query);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch member review summary view data.');
  }
}


export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType[]>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
