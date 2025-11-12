export const dynamic = 'force-dynamic';
export const revalidate = 0;

import ListMembersOrdered from '@/app/ui/dashboard/list-members-ordered';
import { lusitana } from '@/app/ui/fonts';
import { fetchMemberReviewSummary, fetchMembers, fetchMemberReviewChartData } from '@/app/lib/data';
import MemberReviewChart from '@/app/ui/dashboard/member-review-chart';
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

  // Fetch members list
  const members = await fetchMemberReviewSummary(sortCriteria, sortOrder);

  // Fetch all members for the dropdown
  const allMembers = await fetchMembers();

  // Determine selected member
  const member_id = Number(resolvedSearchParams?.member_id) || allMembers[0]?.id || 1;
  const selectedMember = allMembers.find((m) => m.id === member_id);

  // Fetch chart data for the selected member
  const chartData = await fetchMemberReviewChartData(member_id);

  // Compute dynamic Y-axis labels
  const maxCount = Math.max(...chartData.map(d => d.review_count), 1);
  const yAxisLabels = Array.from({ length: maxCount }, (_, i) => maxCount - i);

  // Helper function to preserve other query params
  const buildMemberLink = (id: number) => {
    const params = new URLSearchParams(resolvedSearchParams || {});
    params.set('member_id', String(id));
    return `?${params.toString()}`;
  };

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Members
      </h1>

      {/* Members list grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ListMembersOrdered
          key={`${sortCriteria}-${sortOrder}`}
          listMembersOrdered={members}
        />
      </div>

      {/* Member Review Chart Section */}
      <div className="mt-10">
        <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Review Ratings Distribution ({selectedMember?.member_name || 'Unknown'})
        </h2>

        {/* Member selector */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <p className="text-gray-700 font-medium mr-2">Select Member:</p>
          {allMembers.map((m) => (
            <Link
              key={m.id}
              href={buildMemberLink(m.id)}
              className={`rounded-md px-3 py-1 text-sm font-medium border transition
                ${
                  member_id === m.id
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-blue-50'
                }`}
            >
              {m.member_name}
            </Link>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
            {/* Y-axis labels */}
            <div
              className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
              style={{ height: '350px' }}
            >
              {yAxisLabels.map((label) => (
                <p key={label}>{label}</p>
              ))}
            </div>

            {/* Bars */}
            {chartData.map((datum) => (
              <div key={datum.review_final_rating} className="relative flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-md bg-gradient-to-t from-blue-500 to-blue-300 transition-all duration-700"
                  style={{
                    height: `${(350 / maxCount) * datum.review_count}px`,
                  }}
                  title={`${datum.review_count} review${datum.review_count > 1 ? 's' : ''}`}
                ></div>
                <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                  {datum.review_final_rating}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
