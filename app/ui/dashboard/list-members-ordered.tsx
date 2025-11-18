'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowPathIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { convertToStars } from '@/app/utils/convertToStars';
import { lusitana } from '@/app/ui/fonts';
import { MemberReview } from '@/app/lib/definitions';

export default function ListMembersOrdered({
    listMembersOrdered,
}: Readonly<{ listMembersOrdered: MemberReview[] }>) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSortOrder = searchParams.get('sort') === 'lowest' ? 'lowest' : 'highest';
    const currentCriteria = searchParams.get('criteria') || 'avg_final_rating';

    // Handle changes for dropdowns
    // const handleSortChange = (newSort: string) => {
    //     const params = new URLSearchParams(searchParams);
    //     params.set('sort', newSort);
    //     router.push(`?${params.toString()}`);
    // };

    const handleCriteriaChange = (newCriteria: string) => {
        const params = new URLSearchParams(searchParams);
        // if same column clicked, flip order
        if (currentCriteria === newCriteria) {
            params.set('sort', currentSortOrder === 'highest' ? 'lowest' : 'highest');
        }
        params.set('criteria', newCriteria);
        router.push(`?${params.toString()}`);
        console.log('Fetching members for:', currentCriteria, currentSortOrder);
    };

    // Helper to render sort icon
    const SortIcon = ({ column }: { column: string }) => {
        if (currentCriteria !== column) return null;
        return currentSortOrder === 'highest' ? (
            <ChevronUpIcon className="inline h-4 w-4 ml-1 text-gray-600" />
        ) : (
            <ChevronDownIcon className="inline h-4 w-4 ml-1 text-gray-600" />
        );
    };

    return (
        <div className="flex w-full flex-col md:col-span-4">
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                {/* Scrollable Container */}
                <div className="relative overflow-y-auto max-h-[70vh] rounded-md border border-gray-200 bg-white">
                    {/* Sticky Sortable Header Row */}
                    <div className="sticky top-0 z-10 grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 bg-gray-100 text-gray-700 font-semibold px-6 py-2 text-sm md:text-base border-b border-gray-300 shadow-sm">
                        <div>Member</div>
                        <button
                            onClick={() => handleCriteriaChange('review_count')}
                            className="flex items-center hover:text-blue-600 transition"
                        >
                            Reviews / Hosted
                            <SortIcon column="review_count" />
                        </button>
                        <button
                            onClick={() => handleCriteriaChange('avg_initial_rating')}
                            className="flex items-center hover:text-blue-600 transition"
                        >
                            Avg Initial Rating
                            <SortIcon column="avg_initial_rating" />
                        </button>

                        <button
                            onClick={() => handleCriteriaChange('avg_final_rating')}
                            className="flex items-center hover:text-blue-600 transition"
                        >
                            Avg Final Rating
                            <SortIcon column="avg_final_rating" />
                        </button>

                        <button
                            onClick={() => handleCriteriaChange('percent_likes')}
                            className="flex items-center hover:text-blue-600 transition"
                        >
                            Percent Liked
                            <SortIcon column="percent_likes" />
                        </button>

                        <button
                            onClick={() => handleCriteriaChange('rating_change_stddev')}
                            className="flex items-center hover:text-blue-600 transition"
                        >
                            Std Dev
                            <SortIcon column="rating_change_stddev" />
                        </button>

                        <button
                            onClick={() => handleCriteriaChange('avg_rating_change')}
                            className="flex items-center hover:text-blue-600 transition"
                        >
                            Avg Rating Change
                            <SortIcon column="avg_rating_change" />
                        </button>
                    </div>

                    {/* Member Rows */}
                    <div className="divide-y divide-gray-200">
                        {listMembersOrdered.map((member) => (
                            <div
                                key={member.member_id}
                                className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 py-3 px-6 items-center text-sm md:text-base"
                            >
                                <div className="font-semibold truncate">
                                    {member.member_name}
                                </div>
                                <div className="text-gray-600">
                                    <div>Reviews: {member.review_count}</div>
                                    <div>Hosted: {member.host_count}</div>
                                </div>
                                <div>{convertToStars(member.avg_initial_rating)}</div>
                                <div>{convertToStars(member.avg_final_rating)}</div>
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
