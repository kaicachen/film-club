'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowPathIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
// import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { FilmReview } from '@/app/lib/definitions';

export default function ListReviewsOrdered({
    listReviewsOrdered,
}: Readonly<{ listReviewsOrdered: FilmReview[] }>) {
    // const router = useRouter();
    // const searchParams = useSearchParams();
    // const currentSortOrder = searchParams.get('sort') === 'lowest' ? 'lowest' : 'highest';
    // const currentCriteria = searchParams.get('criteria') || 'avg_final_rating';

    // // Handle changes for dropdowns
    // const handleSortChange = (newSort: string) => {
    //     const params = new URLSearchParams(searchParams);
    //     params.set('sort', newSort);
    //     router.push(`?${params.toString()}`);
    // };

    // const handleCriteriaChange = (newCriteria: string) => {
    //     const params = new URLSearchParams(searchParams);
    //     // if same column clicked, flip order
    //     if (currentCriteria === newCriteria) {
    //         params.set('sort', currentSortOrder === 'highest' ? 'lowest' : 'highest');
    //     }
    //     params.set('criteria', newCriteria);
    //     router.push(`?${params.toString()}`);
    // };

    // // Helper to render sort icon
    // const SortIcon = ({ column }: { column: string }) => {
    //     if (currentCriteria !== column) return null;
    //     return currentSortOrder === 'highest' ? (
    //         <ChevronUpIcon className="inline h-4 w-4 ml-1 text-gray-600" />
    //     ) : (
    //         <ChevronDownIcon className="inline h-4 w-4 ml-1 text-gray-600" />
    //     );
    // };

    return (
        <div className="flex w-full flex-col md:col-span-4">
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                {/* Sort Controls */}
                {/* <div className="flex justify-end mb-4 flex-wrap gap-2">
                    <label htmlFor="criteria" className="mr-2 text-sm text-gray-600">
                        Sort Criteria:
                    </label>
                    <select
                        id="criteria"
                        value={currentCriteria}
                        onChange={(e) => handleCriteriaChange(e.target.value)}
                        className="rounded-md border border-gray-300 px-2 py-1 text-sm mr-4"
                    >
                        <option value="avg_final_rating">Average Final Rating</option>
                        <option value="percent_likes">Like Percentage</option>
                    </select>

                    <label htmlFor="sort" className="mr-2 text-sm text-gray-600">
                        Sort Order:
                    </label>
                    <select
                        id="sort"
                        value={currentSortOrder}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="rounded-md border border-gray-300 px-2 py-1 text-sm"
                    >
                        <option value="highest">Highest</option>
                        <option value="lowest">Lowest</option>
                    </select>
                </div> */}

                {/* Scrollable Container */}
                <div className="relative overflow-y-auto max-h-[70vh] rounded-md border border-gray-200 bg-white">
                    {/* Sticky Sortable Header Row */}
                    <div className="sticky top-0 z-10 grid grid-cols-7 gap-4 bg-gray-100 text-gray-700 font-semibold px-6 py-2 text-sm md:text-base border-b border-gray-300 shadow-sm">
                        <div>Film</div>

                        <button
                            // onClick={() => handleCriteriaChange('avg_initial_rating')}
                            className="flex items-center hover:text-blue-600 transition"
                        >
                            Avg Initial Rating
                            {/* <SortIcon column="avg_initial_rating" /> */}
                        </button>

                        <button
                            // onClick={() => handleCriteriaChange('avg_final_rating')}
                            className="flex items-center hover:text-blue-600 transition"
                        >
                            Avg Final Rating
                            {/* <SortIcon column="avg_final_rating" /> */}
                        </button>

                        <button
                            // onClick={() => handleCriteriaChange('like_percentage')}
                            className="flex items-center hover:text-blue-600 transition"
                        >
                            Like Percentage
                            {/* <SortIcon column="like_percentage" /> */}
                        </button>

                        <button
                            // onClick={() => handleCriteriaChange('dislike_percentage')}
                            className="flex items-center hover:text-blue-600 transition"
                        >
                            Dislike Percentage
                            {/* <SortIcon column="dislike_percentage" /> */}
                        </button>
                    </div>

                    {/* Member Rows */}
                    <div className="divide-y divide-gray-200">
                        {listReviewsOrdered.map((film) => (
                            <div
                                key={film.film_id}
                                className="grid grid-cols-7 gap-4 py-3 px-6 items-center text-sm md:text-base"
                            >
                                <div className="font-semibold truncate">
                                    {film.film_name}
                                </div>
                                <div>{film.avg_initial_rating}</div>
                                <div>{film.avg_final_rating}</div>
                                <div>{film.like_percentage}%</div>
                                <div>{film.dislike_percentage}</div>
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
