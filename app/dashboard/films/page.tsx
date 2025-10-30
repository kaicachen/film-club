import postgres from 'postgres';
import { Film } from '@/app/lib/definitions'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export default async function FilmsPage() {
    const filmsData = await sql<Film[]>`
    SELECT *
    FROM films
  `;

    const films = filmsData.map((f) => ({ ...f}));

    return (
 <main style={{ padding: '2rem' }}>
      <h1>Films</h1>
      <ul>
        {films.map((film) => (
          <li key={film.id}>
            <strong>{film.film_name}</strong> ({film.film_year_released}) {film.film_director}
            {' | '}
            Date Discussed:{' '}
            {film.film_date_discussed
              ? new Date(film.film_date_discussed).toLocaleDateString()
              : 'N/A'}
          </li>
        ))}
      </ul>
    </main>
  );
}