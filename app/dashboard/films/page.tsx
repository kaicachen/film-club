import ListFilmsOrdered from '@/app/ui/dashboard/list-films-ordered';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilms, fetchFilmsOrdered } from '@/app/lib/data';

interface PageProps {
  searchParams?: {
    sort?: 'newest' | 'oldest';
  };
}

export default async function Page({ searchParams }: PageProps) {
  
  const sortOrder = searchParams?.sort === 'oldest' ? 'oldest' : 'newest';
  const films = await fetchFilmsOrdered(sortOrder);
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Films
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ListFilmsOrdered listFilmsOrdered={films}/>
      </div>
    </main>
  );
}