import ListReviewsOrdered from '@/app/ui/dashboard/list-reviews-ordered';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilmReviewSummary } from '@/app/lib/data';

export default async function Page({ searchParams }: any) {
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
