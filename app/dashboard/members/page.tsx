export const dynamic = 'force-dynamic';
export const revalidate = 0;

import ListMembersOrdered from '@/app/ui/dashboard/list-members-ordered';
import { lusitana } from '@/app/ui/fonts';
import {
  fetchMemberReviewSummary,
  fetchMembers,
  fetchMemberReviewChartData,
} from '@/app/lib/data';
import MemberChart, { ReviewChartDatum } from '@/app/ui/dashboard/member-chart';
import Link from 'next/link';

export default async function Page({ searchParams }: any) {
  const resolvedSearchParams = await searchParams;

  // Sorting logic for members list
  const sortOrder: 'highest' | 'lowest' =
    resolvedSearchParams?.sort === 'lowest' ? 'lowest' : 'highest';
  const validCriteria = [
    'avg_final_rating',
    'percent_likes',
    'review_count',
    'avg_intial_rating',
    'rating_change_stddev',
    'avg_rating_change',
  ] as const;

  const criteriaParam = resolvedSearchParams?.criteria;
  const sortCriteria = validCriteria.includes(criteriaParam)
    ? criteriaParam
    : 'avg_final_rating';

  // Fetch members data
  const allMembers = await fetchMembers();
  const members = await fetchMemberReviewSummary(sortCriteria, sortOrder);

  // Determine selected member
  const member_id = Number(resolvedSearchParams?.member_id) || allMembers[0]?.id || 1;
  const selectedMember = allMembers.find((m) => m.id === member_id);

  // Fetch chart data for the selected member
  const chartData: ReviewChartDatum[] = await fetchMemberReviewChartData(member_id);

  // Build preserved query params for member links
  const preservedParams = new URLSearchParams();
  if (resolvedSearchParams?.criteria) preservedParams.set('criteria', resolvedSearchParams.criteria);
  if (resolvedSearchParams?.sort) preservedParams.set('sort', resolvedSearchParams.sort);

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Members
      </h1>

      {/* Members table */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ListMembersOrdered
          key={`${sortCriteria}-${sortOrder}`}
          listMembersOrdered={members}
        />
      </div>

      {/* Member Chart Section */}
      <div className="mt-10">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Review Ratings Distribution ({selectedMember?.member_name || 'Unknown'})
        </h2>

        {/* Member selector */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <p className="text-gray-700 font-medium mr-2">Select Member:</p>
          {allMembers.map((m) => {
            const params = new URLSearchParams(preservedParams);
            params.set('member_id', m.id.toString());
            return (
              <Link
                key={m.id}
                href={`?${params.toString()}`}
                className={`rounded-md px-3 py-1 text-sm font-medium border transition
                  ${
                    member_id === m.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                  }`}
              >
                {m.member_name}
              </Link>
            );
          })}
        </div>

        {/* Chart */}
        <MemberChart chartData={chartData} />
      </div>
    </main>
  );
}
