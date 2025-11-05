import ListFilms from '@/app/ui/dashboard/list-films';
import ListReviewsOrdered from '../ui/dashboard/list-reviews-ordered';
import { lusitana } from '@/app/ui/fonts';
import { fetchFilmReviewSummary, fetchLatestFilm } from '@/app/lib/data';
 
export default async function Page() {
  const films = await fetchLatestFilm();
  const reviews = await fetchFilmReviewSummary();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <FilmCard title="Films" value={listFilms}/> */}
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Film Discussed:
        </h2>
        <ListFilms listFilms={films}/>
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
        {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
        {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
        {/* <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <h2 className={`${lusitana.className} mb-4 text-l md:text-2xl`}>Reviews Summary</h2>
        <ListReviewsOrdered listReviewsOrdered={reviews} />
      </div>
    </main>
  );
}