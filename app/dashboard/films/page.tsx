import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function FilmsPage() {
    const films = await sql`
    SELECT *
    FROM films
  `;

    return (
    <main style={{ padding: '2rem' }}>
      <h1>🎬 Films</h1>
      <ul>
        {films.map((film) => (
          <li key={film.id}>
            <strong>{film.film_name}</strong> ({film.film_year_released})— {film.film_director} | Date Discussed: {film.film_date_discussed}
          </li>
        ))}
      </ul>
    </main>
  );
}