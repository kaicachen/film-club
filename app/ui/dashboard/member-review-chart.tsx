'use client'; // If you plan to use client-side interactivity (optional)

import React from 'react';

export interface ReviewChartDatum {
  review_final_rating: number;
  review_count: number;
}

interface MemberChartProps {
  chartData: ReviewChartDatum[];
}

export default function MemberChart({ chartData }: MemberChartProps) {
  const maxCount = Math.max(...chartData.map(d => d.review_count), 1);
  const yAxisLabels = Array.from({ length: maxCount }, (_, i) => maxCount - i);

  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
        {/* Y-axis labels */}
        <div
          className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
          style={{ height: '350px' }}
        >
          {yAxisLabels.map((label) => (
            <p key={label}>{label}</p>
          ))}
        </div>

        {/* Bars */}
        {chartData.map((datum) => (
          <div
            key={datum.review_final_rating}
            className="relative flex flex-col items-center gap-2"
          >
            <div
              className="w-full rounded-md bg-gradient-to-t from-blue-500 to-blue-300 transition-all duration-700"
              style={{
                height: `${(350 / maxCount) * datum.review_count}px`,
              }}
              title={`${datum.review_count} review${
                datum.review_count > 1 ? 's' : ''
              }`}
            ></div>
            <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
              {datum.review_final_rating}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
