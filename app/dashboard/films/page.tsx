import postgres from 'postgres';
import { Film } from '@/app/lib/definitions'
import { lusitana } from '@/app/ui/fonts';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export default async function FilmsPage() {
    const filmsData = await sql<Film[]>`
    SELECT *
    FROM films
  `;

    const films = filmsData.map((f) => ({ ...f}));

    return (
 <main style={{ padding: '2rem' }}>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
              Dashboard
            </h1>
      <ul className={`${lusitana.className} text-xl text-gray-800 md:text-xl md:leading-normal}`}>
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