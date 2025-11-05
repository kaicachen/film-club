'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { Film } from '@/app/lib/definitions';

export default function ListFilmsOrdered({ listFilmsOrdered }: Readonly<{ listFilmsOrdered: Film[] }>) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const sort = searchParams.get('sort') === 'oldest' ? 'oldest' : 'newest';
    const film_poster_path = '/film-posters/';

    // Handle sort change by updating URL (triggers a new server fetch)
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;
        const params = new URLSearchParams(searchParams);
        params.set('sort', newSort);
        router.push(`?${params.toString()}`);
    };

  return (
    <div className="flex w-full flex-col md:col-span-4">
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
            {/* Sort Control */}
            <div className="flex justify-end mb-4">
            <label htmlFor="sort" className="mr-2 text-sm text-gray-600">
                Sort by Discussion Date:
            </label>
            <select
                id="sort"
                value={sort}
                onChange={handleSortChange}
                className="rounded-md border border-gray-300 px-2 py-1 text-sm"
            >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
            </select>
        </div>
        {/* Film List */}
        <div className="bg-white px-6">
            {listFilmsOrdered.map((film, i) => (
                <div
                    key={film.id}
                    className={clsx(
                        'flex flex-row items-center justify-between py-4',
                        { 'border-t': i !== 0 }
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
                            Discussed:{' '}
                            {film.film_date_discussed
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
            ))}
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
