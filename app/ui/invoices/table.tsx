'use client';

import Image from 'next/image';
import { UpdateReview, DeleteReview } from '@/app/ui/invoices/buttons';
import { convertToStars } from '@/app/utils/convertToStars';

type Review = {
  film_id: number;
  member_id: number;
  review_initial_rating: number | null;
  review_final_rating: number | null;
  review_like: boolean | null;
  member_name: string;
  film_name: string;
  film_director: string;
  film_year_released: number;
  film_poster_url: string;
  film_date_discussed: string;
};

export default function ReviewCard({ review }: { review: Review }) {
  const film_poster_path = '/film-posters/';

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden w-full rounded-md bg-white p-4 mb-2">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <Image
                  src={`${film_poster_path}${review.film_poster_url}`}
                  className="rounded-md"
                  width={64}
                  height={64}
                  alt={`${review.film_name} poster`}
                />
                <div>
                  <p className="font-semibold">{review.film_name}</p>
                  <p className="text-sm text-gray-500">
                    {review.film_director} ({review.film_year_released})
                  </p>
                  <p className="text-sm text-gray-500">
                    Discussed on: {review.film_date_discussed}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between pt-4">
              <div>
                <p>Initial Rating: {convertToStars(review.review_initial_rating) ?? '—'}</p>
                <p>Final Rating: {convertToStars(review.review_final_rating) ?? '—'}</p>
                <p>{review.review_like ? 'Liked' : 'Disliked'}</p>
              </div>
              <div className="flex justify-end gap-2">
                <UpdateReview film_id={String(review.film_id)} member_id={String(review.member_id)} />
                <DeleteReview film_id={String(review.film_id)} member_id={String(review.member_id)} />
              </div>
            </div>
          </div>

          {/* Desktop View */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal bg-gray-100">
              <tr>
                <th className="px-4 py-5 font-medium sm:pl-6">Film</th>
                <th className="px-3 py-5 font-medium">Member</th>
                <th className="px-3 py-5 font-medium">Initial Rating</th>
                <th className="px-3 py-5 font-medium">Final Rating</th>
                <th className="px-3 py-5 font-medium">Like</th>
                <th className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={`${film_poster_path}${review.film_poster_url}`}
                      className="rounded-md"
                      width={64}
                      height={64}
                      alt={`${review.film_name} poster`}
                    />
                    <p>{review.film_name}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3">{review.member_name}</td>
                <td className="whitespace-nowrap px-3 py-3">
                  {convertToStars(review.review_initial_rating) ?? '—'}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {convertToStars(review.review_final_rating) ?? '—'}
                </td>
                <td className="whitespace-nowrap px-3 py-3">
                  {review.review_like ? 'Liked' : 'Disliked'}
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-2">
                    <UpdateReview film_id={String(review.film_id)} member_id={String(review.member_id)} />
                    <DeleteReview film_id={String(review.film_id)} member_id={String(review.member_id)} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
