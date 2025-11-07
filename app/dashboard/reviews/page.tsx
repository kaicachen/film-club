import ListReviewSummaryOrdered from '@/app/ui/dashboard/list-review-summary-ordered';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilmReviewSummaryOrdered, fetchFilmsOrdered } from '@/app/lib/data';

export default async function Page({ searchParams }: any) {
  const resolvedSearchParams = await searchParams;
  const sortOrder: 'highest' | 'lowest' =
      resolvedSearchParams?.sort === 'lowest' ? 'lowest' : 'highest';
  const validCriteria = ['avg_final_rating', 'like_percentage', 'reviews_count', 'avg_initial_rating', 'dislike_percentage'] as const;
  const criteriaParam = resolvedSearchParams?.criteria;
  const sortCriteria =
      validCriteria.includes(criteriaParam) ? criteriaParam : 'avg_final_rating';
  const reviews = await fetchFilmReviewSummaryOrdered(sortCriteria, sortOrder);
  const films = await fetchFilmsOrdered();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Reviews</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <h2 className={`${lusitana.className} mb-4 text-l md:text-2xl`}>Reviews Summary</h2>
        <ListReviewSummaryOrdered listReviewSummaryOrdered={reviews} listFilmsOrdered={films}/>
      </div>
    </main>
  );
}
