import { ArrowPathIcon } from '@heroicons/react/24/outline';

type ChartData = { rating: number; count: number };

export default function MemberReviewChart({ chartData }: { chartData: ChartData[] }) {
  const chartHeight = 350;

  if (!chartData || chartData.length === 0) {
    return <p className="mt-4 text-gray-400">No data available for this member.</p>;
  }

  const topLabel = Math.max(...chartData.map((r) => r.count), 10);
  const yAxisLabels = Array.from({ length: 5 }, (_, i) =>
    Math.round((topLabel / 4) * (4 - i))
  );

  return (
    <div className="w-full md:col-span-4 rounded-xl bg-gray-50 p-4">
      <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
        <div
          className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
          style={{ height: `${chartHeight}px` }}
        >
          {yAxisLabels.map((label) => (
            <p key={label}>{label}</p>
          ))}
        </div>

        {chartData.map((r) => (
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
        <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
      </div>
    </div>
  );
}
