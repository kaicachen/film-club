'use client';

import React from 'react';

export type ReviewChartDatum = {
  review_final_rating: number; // 1–10
  review_count: number;
};

interface MemberChartProps {
  chartData: ReviewChartDatum[];
}

const MemberChart: React.FC<MemberChartProps> = ({ chartData }) => {
  // Ensure all ratings 1–10 are displayed
  const fullRatings = Array.from({ length: 10 }, (_, i) => i + 1);

  const normalizedChartData = fullRatings.map((rating) => {
    const datum = chartData.find(d => d.review_final_rating === rating);
    return {
      review_final_rating: rating,
      review_count: datum?.review_count || 0
    };
  });

  const maxCount = Math.max(...normalizedChartData.map(d => d.review_count), 1);

  return (
    <div className="rounded-xl bg-gray-50 p-4 w-full overflow-x-auto">
      <div className="grid grid-cols-10 items-end gap-2 h-[350px]">
        {normalizedChartData.map((datum) => (
          <div key={datum.review_final_rating} className="flex flex-col items-center">
            {/* Review count on top */}
            <p className="text-xs font-medium text-gray-700">
              {datum.review_count}
            </p>

            {/* Bar */}
            <div
              className="w-full rounded-md bg-gradient-to-t from-blue-500 to-blue-300 transition-all duration-700"
              style={{
                height: `${(datum.review_count / maxCount) * 300}px`,
              }}
              title={`${datum.review_count} review${datum.review_count > 1 ? 's' : ''}`}
            ></div>

            {/* Rating label */}
            <p className="text-sm text-gray-400 mt-1">{datum.review_final_rating}</p>
          </div>
        ))}
      </div>

      {/* Y-axis labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        {Array.from({ length: maxCount }, (_, i) => maxCount - i).map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
};

export default MemberChart;
