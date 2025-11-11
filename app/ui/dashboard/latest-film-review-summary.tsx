import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestFilm } from '@/app/lib/data';

type LatestFilm = {
  film_id: number;
  avg_initial_rating: number;
  avg_final_rating: number;
  like_percentage: number;
  reviews_count: number;
  film_name: string;
  film_poster_url: string;
};


export default async function LatestFilmSummary() {
    const latest_film: LatestFilm[] = await fetchLatestFilm();
    const film_poster_path = '/film-posters/';

    return (
        <div className="flex w-full flex-col md:col-span-4">
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                <div className="relative overflow-y-auto max-h-[70vh] rounded-md border border-gray-200 bg-white">
                    {/* Sticky Sortable Header Row */}
                    <div className="sticky top-0 z-10 grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 bg-gray-100 text-gray-700 font-semibold px-6 py-2 text-sm md:text-base border-b border-gray-300 shadow-sm">
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
                            // onClick={() => handleCriteriaChange('reviews_count')}
                            className="flex items-center hover:text-blue-600 transition"
                        >
                            Review Count
                            {/* <SortIcon column="reviews_count" /> */}
                        </button>
                    </div>

                    {/* Member Rows */}
                    <div className="divide-y divide-gray-200">
                        {latest_film.map((review) => { return (
                                <div
                                    key={review.film_id}
                                    className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 py-3 px-6 items-center text-sm md:text-base"
                                >
                                    <div className="flex items-center font-semibold truncate">
                                        {review && (
                                            <Image
                                                src={`${film_poster_path}${review.film_poster_url}`}
                                                alt={`${review.film_name}'s poster`}
                                                className="mr-4"
                                                width={64}
                                                height={64}
                                            />
                                        )}
                                        {review.film_name}
                                    </div>
                                    <div>{review.avg_initial_rating}</div>
                                    <div>{review.avg_final_rating}</div>
                                    <div>{review.like_percentage}%</div>
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
