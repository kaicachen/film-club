import ListMembersOrdered from '@/app/ui/dashboard/list-members-ordered';
import { lusitana } from '@/app/ui/fonts';
import { fetchMemberReviewSummary } from '@/app/lib/data';

export default async function Page({ searchParams }: any) {
    const sortOrder: 'highest' | 'lowest' =
        searchParams?.sort === 'lowest' ? 'lowest' : 'highest';
    const validCriteria = ['avg_final_rating', 'percent_likes', 'review_count'] as const;
    const criteriaParam = searchParams?.criteria;
    const sortCriteria =
        validCriteria.includes(criteriaParam) ? criteriaParam : 'avg_final_rating';

    const members = await fetchMemberReviewSummary(sortCriteria, sortOrder);

    return (
        <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Members</h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ListMembersOrdered listMembersOrdered={members}/>
        </div>
        </main>
    );
}
