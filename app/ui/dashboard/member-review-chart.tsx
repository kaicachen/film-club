import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

type ReviewChartDatum = {
  review_final_rating: number;
  review_count: number;
};

export default function MemberReviewChart({
  chartData,
  selectedMemberId,
}: {
  chartData: ReviewChartDatum[];
  selectedMemberId: number;
}) {
  if (!chartData || chartData.length === 0) {
    return <p className="mt-4 text-gray-400">No reviews found.</p>;
  }

  const chartHeight = 350;
  const maxValue = Math.max(...chartData.map((d) => d.review_count), 1);

  return (
    <div className="w-full md:col-span-4">
      <div className={`${lusitana.className} mb-4 text-lg md:text-xl`}>
        Review Ratings Distribution (Member #{selectedMemberId})
      </div>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          {/* Y-axis labels */}
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {[maxValue, Math.round(maxValue / 2), 0].map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {/* Bars */}
          {chartData.map((data) => (
            <div key={data.review_final_rating} className="flex flex-col items-center gap-2">
              <div
                title={`${data.review_count} review${
                  data.review_count !== 1 ? 's' : ''
                }`}
                className="w-full rounded-md bg-gradient-to-t from-blue-500 to-blue-300 transition-all duration-700 ease-out hover:from-blue-600 hover:to-blue-400"
                style={{
                  height: `${(chartHeight / maxValue) * data.review_count}px`,
                }}
              ></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                {data.review_final_rating}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
