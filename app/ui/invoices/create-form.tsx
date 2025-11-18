import { Member, Film } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createReview } from '@/app/lib/actions';

export default function Form({ members, films }: { members: Member[], films: Film[] }) {
  return (
    <form action={createReview}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Member Name */}
        <div className="mb-4">
          <label htmlFor="member" className="mb-2 block text-sm font-medium">
            Choose Member
          </label>
          <div className="relative">
            <select
              id="member_id"
              name="member_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a member
              </option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.member_name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        
        {/* Film Name */}
        <div className="mb-4">
          <label htmlFor="film" className="mb-2 block text-sm font-medium">
            Choose Film
          </label>
          <div className="relative">
            <select
              id="film_id"
              name="film_id"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select a film
              </option>
              {films.map((film) => (
                <option key={film.id} value={film.id}>
                  {film.film_name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Initial Rating */}
        {/* <div className="mb-4">
          <label htmlFor="review_initial_rating" className="mb-2 block text-sm font-medium">
            Enter an Initial Rating
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="review_initial_rating"
                name="review_initial_rating"
                type="number"
                step="0.5"
                min="0.5"
                max="5"
                placeholder="Enter initial rating"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div> */}

        {/* Final Rating */}
        {/* <div className="mb-4">
          <label htmlFor="review_final_rating" className="mb-2 block text-sm font-medium">
            Enter an Final Rating
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="review_final_rating"
                name="review_final_rating"
                type="number"
                step="0.5"
                min="0.5"
                max="5"
                placeholder="Enter final rating"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div> */}

        {/* Initial Rating */}
        <div className="mb-4">
          <label htmlFor="review_initial_rating" className="mb-2 block text-sm font-medium">
            Select Initial Rating
          </label>
          <div className="relative mt-2 rounded-md">
            <select
              id="review_initial_rating"
              name="review_initial_rating"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select rating
              </option>
              {Array.from({ length: 10 }, (_, i) => (i + 1) / 2).map((rating) => (
                <option key={rating} value={rating}>
                  {rating} ⭐
                </option>
              ))}
            </select>
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/* Final Rating */}
        <div className="mb-4">
          <label htmlFor="review_final_rating" className="mb-2 block text-sm font-medium">
            Select Final Rating
          </label>
          <div className="relative mt-2 rounded-md">
            <select
              id="review_final_rating"
              name="review_final_rating"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select rating
              </option>
              {Array.from({ length: 10 }, (_, i) => (i + 1) / 2).map((rating) => (
                <option key={rating} value={rating}>
                  {rating} ⭐
                </option>
              ))}
            </select>
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>


        {/* Like/Dislike */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Select Like or Dislike
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="review_dislike"
                  name="review_like"
                  type="radio"
                  value="false"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="dislike"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Dislike <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="review_like"
                  name="review_like"
                  type="radio"
                  value="true"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="like"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Like <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/reviews"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Review</Button>
      </div>
    </form>
  );
}
