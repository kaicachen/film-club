'use client';

import { Member, Film } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createReview, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form({ members, films }: { members: Member[], films: Film[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createReview, initialState);
  return (
    <form action={formAction}>
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
              aria-describedby="member-error"
              required
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
          <div id="member-error" aria-live="polite" aria-atomic="true">
            {state.errors?.member_id &&
              state.errors.member_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
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
              aria-describedby="film-error"
              required
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
          <div id="film-error" aria-live="polite" aria-atomic="true">
            {state.errors?.film_id &&
              state.errors.film_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

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
              aria-describedby="intial-rating-error"
              required
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
          <div id="initial-rating-error" aria-live="polite" aria-atomic="true">
            {state.errors?.review_initial_rating &&
              state.errors.review_initial_rating.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
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
              aria-describedby="final-rating-error"
              required
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
          <div id="final-rating-error" aria-live="polite" aria-atomic="true">
            {state.errors?.review_final_rating &&
              state.errors.review_final_rating.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Like/Dislike */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Select Like or Dislike
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <label htmlFor="review_like" className="flex items-center cursor-pointer">
                <input
                  id="review_like"
                  name="review_like"
                  type="radio"
                  value="true"
                  className="h-4 w-4"
                />
                <span className="ml-2">Like</span>
              </label>

              <label htmlFor="review_dislike" className="flex items-center cursor-pointer">
                <input
                  id="review_dislike"
                  name="review_like"
                  type="radio"
                  value="false"
                  required
                  className="h-4 w-4"
                />
                <span className="ml-2">Dislike</span>
              </label>
            </div>
            <div id="review_like-error" aria-live="polite" aria-atomic="true">
              {state.errors?.review_like?.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
              ))}
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
