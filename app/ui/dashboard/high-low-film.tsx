import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { convertToStars } from '@/app/utils/convertToStars';
import { lusitana } from '@/app/ui/fonts';

type JoinedFilm = {
  film_id: number;
  avg_final_rating: number;
  film_name: string;
  film_poster_url: string;
};

export default function HighLowFilm({ highLowFilm, }: { highLowFilm: JoinedFilm[];}) {
  const film_poster_path = "/film-posters/";
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="relative overflow-y-auto max-h-[70vh] rounded-md border border-gray-200 bg-white">
          <div className="top-0 z-10 grid grid-cols-[1fr_1fr] gap-4 bg-gray-100 text-gray-700 font-semibold px-6 py-2 text-sm md:text-base border-b border-gray-300 shadow-sm">
            <div>Film</div>
            {/* <div>Director</div>
            <div>Year Released</div>
            <div>Date Discussed</div> */}
            <div>Avg Final Rating</div>
          </div>

          <div className="divide-y divide-gray-200">
            {highLowFilm.map((film) => (
              <div
                key={film.film_id}
                className="grid grid-cols-[1fr_1fr] gap-4 py-3 px-6 items-center text-sm md:text-base"
              >
                {/* Film info */}
                <div className="flex items-center font-semibold truncate">
                  <Image
                    src={`${film_poster_path}${film.film_poster_url}`}
                    alt={`${film.film_name}'s poster`}
                    className="mr-4"
                    width={64}
                    height={64}
                  />
                  {/* <span className="truncate">{film.film_name}</span> */}
                </div>
                {/* <div>{film.film_director ?? '—'}</div>
                <div>{film.film_year_released ?? '—'}</div>
                <div>{film.film_date_discussed ? new Date(film.film_date_discussed).toLocaleDateString() : 'N/A'}</div> */}
                <div>{convertToStars(film.avg_final_rating) ?? '—'}</div>
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
