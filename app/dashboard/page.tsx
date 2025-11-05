import ListFilms from '@/app/ui/dashboard/list-films';
import ListReviewsOrdered from '../ui/dashboard/list-reviews-ordered';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilmReviewSummary, fetchLatestFilm } from '@/app/lib/data';

export default async function Page() {
  const films = await fetchLatestFilm();
  const reviews = await fetchFilmReviewSummary();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-6 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Latest Film Discussed
          </h2>
          <ListFilms listFilms={films} />
        </div>
        <div className="flex-1">
          <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Reviews Summary
          </h2>
          <ListReviewsOrdered listReviewsOrdered={reviews} />
        </div>
      </div>
    </main>
  );
}
