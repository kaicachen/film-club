import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchMembers, fetchFilms } from '@/app/lib/data';
 
export default async function Page() {
  const members = await fetchMembers();
  const films = await fetchFilms();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Reviews', href: '/dashboard/reviews' },
          {
            label: 'Create Review',
            href: '/dashboard/reviews/create',
            active: true,
          },
        ]}
      />
      <Form members={members} films={films} />
    </main>
  );
}