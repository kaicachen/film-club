'use client';

import { useState, useEffect } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchMemberReviewChartData, fetchMembers } from '@/app/lib/data';

type RatingData = { rating: number; count: number };
type Member = { id: number; member_name: string };

export default function MemberReviewChart() {
  const chartHeight = 350;
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [ratings, setRatings] = useState<RatingData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch all members for dropdown
    fetchMembers().then(setMembers);
  }, []);

  useEffect(() => {
    if (selectedMember) {
      setLoading(true);
      fetchMemberReviewChartData(selectedMember)
        .then(setRatings)
        .finally(() => setLoading(false));
    }
  }, [selectedMember]);

  const topLabel = Math.max(...ratings.map(r => r.count), 10);
  const yAxisLabels = Array.from(
    { length: 5 },
    (_, i) => Math.round((topLabel / 4) * (4 - i))
  );

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Member Review Ratings
      </h2>

      {/* Dropdown */}
      <div className="mb-4">
        <label className="mr-2 text-gray-700 font-medium">Select Member:</label>
        <select
          className="rounded-md border border-gray-300 bg-white p-2 text-sm"
          value={selectedMember ?? ''}
          onChange={(e) => setSelectedMember(Number(e.target.value))}
        >
          <option value="">-- Choose a member --</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.member_name}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-gray-400 mt-2">Loading...</p>}

      {!loading && selectedMember && ratings.length === 0 && (
        <p className="text-gray-400 mt-2">No review data for this member.</p>
      )}

      {!loading && ratings.length > 0 && (
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
            <div
              className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
              style={{ height: `${chartHeight}px` }}
            >
              {yAxisLabels.map((label) => (
                <p key={label}>{label}</p>
              ))}
            </div>

            {ratings.map((r) => (
              <div key={r.rating} className="flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-md bg-blue-400"
                  style={{
                    height: `${(chartHeight / topLabel) * r.count}px`,
                  }}
                ></div>
                <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                  {r.rating}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center pb-2 pt-6">
            <ArrowPathIcon className="h-5 w-5 text-gray-500" />
            <h3 className="ml-2 text-sm text-gray-500">
              Updated just now
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}
