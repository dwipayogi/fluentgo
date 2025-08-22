"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";

interface ChartDataType {
  date: string;
  accuracy: number;
  total_answers: number;
}

interface ChartProps {
  userId: number;
}

const chartConfig = {
  accuracy: {
    label: "Accuracy (%)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ChartData({ userId }: ChartProps) {
  const [chartData, setChartData] = useState<ChartDataType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          `/api/daily-accuracy?user_id=${userId}&days=5`
        );
        if (response.ok) {
          const data = await response.json();

          // Generate last 5 days including today
          const today = new Date();
          const last5Days = [];

          for (let i = 4; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateString = date.toISOString().split("T")[0];

            // Find data for this date
            const dayData = data.data?.find((item: any) => {
              const itemDate = new Date(item.date).toISOString().split("T")[0];
              return itemDate === dateString;
            });

            // Format label
            let label;
            if (i === 0) {
              label = "Today";
            } else if (i === 1) {
              label = "Yesterday";
            } else {
              label = date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              });
            }

            last5Days.push({
              date: dateString,
              label,
              accuracy: parseInt(dayData?.avg_accuracy) || 0,
              total_answers: parseInt(dayData?.total_answers) || 0,
            });
          }

          setChartData(last5Days);
        } else {
          console.error("Failed to fetch chart data");
          // Fallback to empty data structure
          setChartData(generateEmptyDays());
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setChartData(generateEmptyDays());
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchChartData();
    } else {
      setChartData(generateEmptyDays());
      setLoading(false);
    }
  }, [userId]);

  const generateEmptyDays = () => {
    const today = new Date();
    const emptyDays = [];

    for (let i = 4; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      let label;
      if (i === 0) {
        label = "Today";
      } else if (i === 1) {
        label = "Yesterday";
      } else {
        label = date.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
        });
      }

      emptyDays.push({
        date: date.toISOString().split("T")[0],
        label,
        accuracy: 0,
        total_answers: 0,
      });
    }

    return emptyDays;
  };

  if (loading) {
    return (
      <div className="h-32 flex items-center justify-center">
        <div className="text-sm text-gray-500">Loading chart data...</div>
      </div>
    );
  }

  // Check if there's any data
  const hasData = chartData.some((item) => item.accuracy > 0);

  return (
    <div className="space-y-2">
      {hasData && (
        <div className="text-xs text-gray-600 dark:text-gray-400">
          Last 5 days accuracy trend
        </div>
      )}
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tick={{ fontSize: 12 }}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, name) => [`${value}%`, `Accuracy`]}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    const data = payload[0].payload;
                    return `${label} (${data.total_answers} questions)`;
                  }
                  return label;
                }}
              />
            }
          />
          <Line
            dataKey="accuracy"
            type="linear"
            stroke="var(--color-accuracy)"
            strokeWidth={3}
            dot={{
              fill: "var(--color-accuracy)",
              strokeWidth: 2,
              r: 5,
            }}
            activeDot={{
              r: 7,
              stroke: "var(--color-accuracy)",
              strokeWidth: 3,
            }}
          />
        </LineChart>
      </ChartContainer>
      {!hasData && (
        <div className="text-center py-4">
          <div className="text-xs text-gray-500">
            No practice data yet. Start learning to see your progress!
          </div>
        </div>
      )}
    </div>
  );
}
