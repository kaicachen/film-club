import ListFilmsOrdered from '@/app/ui/dashboard/list-films-ordered';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilmsOrdered } from '@/app/lib/data';

export default async function Page({
  searchParams,
}: {
  searchParams?: { sort?: 'newest' | 'oldest' };
}) {
  const sortOrder = searchParams?.sort === 'oldest' ? 'oldest' : 'newest';
  const films = await fetchFilmsOrdered(sortOrder);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Films</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ListFilmsOrdered listFilmsOrdered={films} />
      </div>
    </main>
  );
}
