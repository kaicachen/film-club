import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchReviewById } from '@/app/lib/data';
import 
 
export default async function Page(props: { params: Promise<{ film_id: string, member_id: string }> }) {
  const params = await props.params;
  const film_id = Number(params.film_id);
  const member_id = Number(params.member_id);
  const review_list = await fetchReviewById(film_id, member_id);
  const review = review_list[0];
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Reviews', href: '/dashboard/reviews' },
          {
            label: 'Edit Review',
            href: `/dashboard/reviews/${film_id}/${member_id}/edit`,
            active: true,
          },
        ]}
      />
      <Form review={review} />
    </main>
  );
}