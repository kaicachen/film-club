'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { MemberReview } from '@/app/lib/definitions';

export default function ListMembersOrdered({
    listMembersOrdered,
}: Readonly<{ listMembersOrdered: MemberReview[] }>) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sort = searchParams.get('sort') === 'highest' ? 'lowest' : 'highest';
    const criteria = searchParams.get('criteria') || 'avg_final_rating';

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;
        const params = new URLSearchParams(searchParams);
        params.set('sort', newSort);
        router.push(`?${params.toString()}`);
    };

    const handleCriteriaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCriteria = e.target.value;
        const params = new URLSearchParams(searchParams);
        params.set('criteria', newCriteria);
        router.push(`?${params.toString()}`);
    };

    return (
        <div className="flex w-full flex-col md:col-span-4">
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                {/* Sort Controls */}
                <div className="flex justify-end mb-4 flex-wrap gap-2">
                    <label htmlFor="criteria" className="mr-2 text-sm text-gray-600">
                        Sort Criteria:
                    </label>
                    <select
                        id="criteria"
                        value={criteria}
                        onChange={handleCriteriaChange}
                        className="rounded-md border border-gray-300 px-2 py-1 text-sm mr-4"
                    >
                        <option value="avg_final_rating">Average Final Rating</option>
                        <option value="percent_likes">Percent Liked</option>
                        <option value="review_count">Number of Reviews</option>
                    </select>

                    <label htmlFor="sort" className="mr-2 text-sm text-gray-600">
                        Sort Order:
                    </label>
                    <select
                        id="sort"
                        value={sort}
                        onChange={handleSortChange}
                        className="rounded-md border border-gray-300 px-2 py-1 text-sm"
                    >
                        <option value="highest">Highest</option>
                        <option value="lowest">Lowest</option>
                    </select>
                </div>

                {/* Scrollable container for header + members */}
                <div className="relative overflow-y-auto max-h-[70vh] rounded-md border border-gray-200 bg-white">
                    {/* Sticky Header Row */}
                    <div className="sticky top-0 z-10 grid grid-cols-7 gap-4 bg-gray-100 text-gray-700 font-semibold px-6 py-2 text-sm md:text-base border-b border-gray-300 shadow-sm">
                        <div>Member</div>
                        <div>Reviews / Hosted</div>
                        <div>Avg Initial Rating</div>
                        <div>Avg Final Rating</div>
                        <div>Percent Liked</div>
                        <div>Std Dev</div>
                        <div>Avg Rating Change</div>
                    </div>

                    {/* Member Rows */}
                    <div className="divide-y divide-gray-200">
                        {listMembersOrdered.map((member) => (
                            <div
                                key={member.member_id}
                                className="grid grid-cols-7 gap-4 py-3 px-6 items-center text-sm md:text-base"
                            >
                                <div className="font-semibold truncate">
                                    {member.member_name}
                                </div>
                                <div className="text-gray-600">
                                    <div>Reviews: {member.review_count}</div>
                                    <div>Hosted: {member.host_count}</div>
                                </div>
                                <div>{member.avg_initial_rating}</div>
                                <div>{member.avg_final_rating}</div>
                                <div>{member.percent_likes}%</div>
                                <div>{member.rating_change_stddev}</div>
                                <div>{member.avg_rating_change}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center pb-2 pt-6">
                    <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                    <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
                </div>
            </div>
        </div>
    );
}
