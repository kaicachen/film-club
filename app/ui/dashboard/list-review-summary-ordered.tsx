'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowPathIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
// import clsx from 'clsx';
import Image from 'next/image';
import { convertToStars } from '@/app/utils/convertToStars';
import { lusitana } from '@/app/ui/fonts';
import { FilmReview, Film } from '@/app/lib/definitions';

export default function ListReviewSummaryOrdered({
    listReviewSummaryOrdered, listFilmsOrdered
}: Readonly<{ listReviewSummaryOrdered: FilmReview[], listFilmsOrdered: Film[] }>) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentSortOrder = searchParams.get('sort') === 'lowest' ? 'lowest' : 'highest';
    const currentCriteria = searchParams.get('criteria') || 'avg_final_rating';
    const film_poster_path = '/film-posters/';

    const handleCriteriaChange = (newCriteria: string) => {
        const params = new URLSearchParams(searchParams);
        // if same column clicked, flip order
        if (currentCriteria === newCriteria) {
            params.set('sort', currentSortOrder === 'highest' ? 'lowest' : 'highest');
        }
        params.set('criteria', newCriteria);
        router.push(`?${params.toString()}`);
    };

    const SortIcon = ({ column }: { column: string }) => {
        if (currentCriteria !== column) return null;
        return currentSortOrder === 'highest' ? (
            <ChevronUpIcon className="inline h-4 w-4 ml-1 text-gray-600" />
        ) : (
            <ChevronDownIcon className="inline h-4 w-4 ml-1 text-gray-600" />
        );
    };

    return (
        <div className="flex w-full flex-col md:col-span-4 overflow-x-auto">
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                <div className="relative overflow-y-auto max-h-[70vh] rounded-md border border-gray-200 bg-white">
                    {/* Sticky Sortable Header Row */}
                    <div className="sticky top-0 z-10 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4 bg-gray-100 text-gray-700 font-semibold px-6 py-2 text-sm md:text-base border-b border-gray-300 shadow-sm">
                        <div>Film</div>

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
                            onClick={() => handleCriteriaChange('like_percentage')}
                            className="flex items-center hover:text-blue-600 transition"
                        >
                            Like Percentage
                            <SortIcon column="like_percentage" />
                        </button>

                        <button
                            onClick={() => handleCriteriaChange('dislike_percentage')}
                            className="flex items-center hover:text-blue-600 transition"
                        >
                            Dislike Percentage
                            <SortIcon column="dislike_percentage" />
                        </button>
                        <button
                            onClick={() => handleCriteriaChange('reviews_count')}
                            className="flex items-center hover:text-blue-600 transition"
                        >
                            Review Count
                            <SortIcon column="reviews_count" />
                        </button>
                    </div>

                    {/* Member Rows */}
                    <div className="divide-y divide-gray-200">
                        {listReviewSummaryOrdered.map((review) => {
                            const film = listFilmsOrdered.find(f => f.id === review.film_id);
                            return (
                                <div
                                    key={review.film_id}
                                    className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4 py-3 px-6 items-center text-sm md:text-base"
                                >
                                    <div className="flex items-center font-semibold truncate">
                                        {film && (
                                            <Image
                                                src={`${film_poster_path}${film.film_poster_url}`}
                                                alt={`${film.film_name}'s poster`}
                                                className="mr-4"
                                                width={64}
                                                height={64}
                                            />
                                        )}
                                        <div>
                                            <p className="truncate">{review.film_name}</p>
                                            {film && (
                                                <>
                                                    <p className="hidden text-sm text-gray-500 sm:block">
                                                        ({film.film_year_released})
                                                    </p>
                                                    <p className="hidden text-sm text-gray-500 sm:block">
                                                        {film.film_director}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div>{convertToStars(review.avg_initial_rating)}</div>
                                    <div>{convertToStars(review.avg_final_rating)}</div>
                                    <div>{review.like_percentage}%</div>
                                    <div>{review.dislike_percentage}%</div>
                                    <div>{review.reviews_count}</div>
                                </div>
                            );
                        })}
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
