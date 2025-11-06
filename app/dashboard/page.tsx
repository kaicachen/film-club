import ListFilms from '@/app/ui/dashboard/list-films';
import ListReviewSummaryOrdered from '../ui/dashboard/list-review-summary-ordered';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestFilm, fetchFilmReviewSummaryOrdered } from '@/app/lib/data';

export default async function Page({ searchParams }: any) {
  const films = await fetchLatestFilm();
  const resolvedSearchParams = await searchParams;
  const sortOrder: 'highest' | 'lowest' =
      resolvedSearchParams?.sort === 'lowest' ? 'lowest' : 'highest';
  const validCriteria = ['avg_final_rating', 'like_percentage', 'reviews_count', 'avg_initial_rating', 'dislike_percentage'] as const;
  const criteriaParam = resolvedSearchParams?.criteria;
  const sortCriteria =
      validCriteria.includes(criteriaParam) ? criteriaParam : 'avg_final_rating';
  const reviews = await fetchFilmReviewSummaryOrdered(sortCriteria, sortOrder);

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
          <ListReviewSummaryOrdered listReviewSummaryOrdered={reviews} />
        </div>
      </div>
    </main>
  );
}
