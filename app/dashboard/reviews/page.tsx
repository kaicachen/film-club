import ListReviewsOrdered from '@/app/ui/dashboard/list-reviews-ordered';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilmReviewSummary } from '@/app/lib/data';

export default async function Page({ searchParams }: any) {
  const sortOrder: 'highest' | 'lowest' =
      searchParams?.sort === 'lowest' ? 'lowest' : 'highest';
  const validCriteria = ['avg_final_rating', 'percent_likes', 'review_count'] as const;
  const criteriaParam = searchParams?.criteria;
  const sortCriteria =
      validCriteria.includes(criteriaParam) ? criteriaParam : 'avg_final_rating';

  const members = await fetchMemberReviewSummary(sortCriteria, sortOrder);
  const reviews = await fetchFilmReviewSummary();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Reviews</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ListReviewsOrdered listReviewsOrdered={reviews} />
      </div>
    </main>
  );
}
