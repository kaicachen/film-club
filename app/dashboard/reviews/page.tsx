import ListReviewSummaryOrdered from '@/app/ui/dashboard/list-review-summary-ordered';
import { lusitana } from '@/app/ui/fonts';
import { fetchReviewsOrdered } from '@/app/lib/data';
import ListReviewsOrdered from '@/app/ui/dashboard/list-reviews-ordered';

export default async function Page({ searchParams }: any) {
  const resolvedSearchParams = await searchParams;
  const sortOrder: 'highest' | 'lowest' =
      resolvedSearchParams?.sort === 'lowest' ? 'lowest' : 'highest';
  const validCriteria = ['review_final_rating', 'review_initial_rating', 'review_like', 'film_id', 'member_id'] as const;
  const criteriaParam = resolvedSearchParams?.criteria;
  const sortCriteria =
      validCriteria.includes(criteriaParam) ? criteriaParam : 'avg_final_rating';
  const reviews = await fetchReviewsOrdered(sortCriteria, sortOrder);
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Reviews</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <h2 className={`${lusitana.className} mb-4 text-l md:text-2xl`}>Reviews Summary</h2>
        <ListReviewsOrdered listReviewsOrdered={reviews}/>
      </div>
    </main>
  );
}
