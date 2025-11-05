import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { Film } from '@/app/lib/definitions';
export default function ListFilms({ listFilms, }: { listFilms: Film[];}) {
  const film_poster_path = "/film-posters/";
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Films
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">

        <div className="bg-white px-6">
          {listFilms.map((film, i) => {
            return (
              <div
                key={film.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={`${film_poster_path}${film.film_poster_url}`}
                    alt={`${film.film_name}'s poster`}
                    className="mr-4 full"
                    width={64}
                    height={64}
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {film.film_name}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      ({film.film_year_released})
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      {film.film_director}
                    </p>
                    <p className="hidden text-sm text-gray-500 sm:block">
                      Discussed: {film.film_date_discussed
                                  ? new Date(film.film_date_discussed).toLocaleDateString()
                                  : 'N/A'}
                    </p>
                  </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  Host ID: {film.film_host}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
