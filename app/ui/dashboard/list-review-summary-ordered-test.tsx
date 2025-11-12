'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowPathIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useState } from 'react';
import { FilmReview, Film } from '@/app/lib/definitions';

export default function ListReviewSummaryOrderedTest({
  listReviewSummaryOrdered,
  listFilmsOrdered,
}: Readonly<{ listReviewSummaryOrdered: FilmReview[]; listFilmsOrdered: Film[] }>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSortOrder = searchParams.get('sort') === 'lowest' ? 'lowest' : 'highest';
  const currentCriteria = searchParams.get('criteria') || 'avg_final_rating';
  const film_poster_path = '/film-posters/';

  const handleCriteriaChange = (newCriteria: string) => {
    const params = new URLSearchParams(searchParams);
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

  // Track which card is expanded (for mobile)
  const [expandedFilm, setExpandedFilm] = useState<number | null>(null);
  const toggleExpand = (id: number) => {
    setExpandedFilm(expandedFilm === id ? null : id);
  };

  return (
    <div className="flex w-full flex-col overflow-x-auto">
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">

        {/* Desktop Table View */}
        <div className="hidden md:block relative overflow-y-auto max-h-[70vh] rounded-md border border-gray-200 bg-white">
          <div className="sticky top-0 z-10 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4 bg-gray-100 text-gray-700 font-semibold px-6 py-2 text-sm border-b border-gray-300 shadow-sm">
            <div>Film</div>
            <button onClick={() => handleCriteriaChange('avg_initial_rating')} className="flex items-center hover:text-blue-600 transition">
              Avg Initial <SortIcon column="avg_initial_rating" />
            </button>
            <button onClick={() => handleCriteriaChange('avg_final_rating')} className="flex items-center hover:text-blue-600 transition">
              Avg Final <SortIcon column="avg_final_rating" />
            </button>
            <button onClick={() => handleCriteriaChange('like_percentage')} className="flex items-center hover:text-blue-600 transition">
              Like % <SortIcon column="like_percentage" />
            </button>
            <button onClick={() => handleCriteriaChange('dislike_percentage')} className="flex items-center hover:text-blue-600 transition">
              Dislike % <SortIcon column="dislike_percentage" />
            </button>
            <button onClick={() => handleCriteriaChange('reviews_count')} className="flex items-center hover:text-blue-600 transition">
              Reviews <SortIcon column="reviews_count" />
            </button>
          </div>

          <div className="divide-y divide-gray-200">
            {listReviewSummaryOrdered.map((review) => {
              const film = listFilmsOrdered.find((f) => f.id === review.film_id);
              return (
                <div
                  key={review.film_id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-4 py-3 px-6 items-center text-sm"
                >
                  <div className="flex items-center font-semibold truncate">
                    {film && (
                      <Image
                        src={`${film_poster_path}${film.film_poster_url}`}
                        alt={`${film.film_name}'s poster`}
                        className="mr-4"
                        width={48}
                        height={48}
                      />
                    )}
                    <div>
                      <p className="truncate">{review.film_name}</p>
                      {film && (
                        <>
                          <p className="text-gray-500 text-xs">({film.film_year_released})</p>
                          <p className="text-gray-500 text-xs">{film.film_director}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div>{review.avg_initial_rating}</div>
                  <div>{review.avg_final_rating}</div>
                  <div>{review.like_percentage}%</div>
                  <div>{review.dislike_percentage}%</div>
                  <div>{review.reviews_count}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3 mt-2">
          {listReviewSummaryOrdered.map((review) => {
            const film = listFilmsOrdered.find((f) => f.id === review.film_id);
            const isExpanded = expandedFilm === review.film_id;
            return (
              <div
                key={review.film_id}
                className="rounded-lg border border-gray-200 bg-white shadow-sm p-4 transition"
              >
                <div className="flex justify-between items-center" onClick={() => toggleExpand(review.film_id)}>
                  <div className="flex items-center">
                    {film && (
                      <Image
                        src={`${film_poster_path}${film.film_poster_url}`}
                        alt={`${film.film_name}'s poster`}
                        className="mr-3 rounded-md"
                        width={48}
                        height={48}
                      />
                    )}
                    <div>
                      <p className="font-semibold">{review.film_name}</p>
                      {film && (
                        <p className="text-gray-500 text-sm">({film.film_year_released})</p>
                      )}
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  )}
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="mt-3 text-sm text-gray-700 space-y-1">
                    <div className="flex justify-between"><span>Avg Initial:</span> <span>{review.avg_initial_rating}</span></div>
                    <div className="flex justify-between"><span>Avg Final:</span> <span>{review.avg_final_rating}</span></div>
                    <div className="flex justify-between"><span>Likes:</span> <span>{review.like_percentage}%</span></div>
                    <div className="flex justify-between"><span>Dislikes:</span> <span>{review.dislike_percentage}%</span></div>
                    <div className="flex justify-between"><span>Reviews:</span> <span>{review.reviews_count}</span></div>
                  </div>
                )}
              </div>
            );
          })}
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
