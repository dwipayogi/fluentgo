"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "8 May", accuracy: 87 },
  { month: "9 May", accuracy: 60 },
  { month: "10 May", accuracy: 81 },
  { month: "11 May", accuracy: 73 },
  { month: "Yesterday", accuracy: 85 },
  { month: "Today", accuracy: 95 },
];

const chartConfig = {
  accuracy: {
    label: "accuracy",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function ChartData() {
  return (
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
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="accuracy"
          type="natural"
          stroke="var(--color-accuracy)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-accuracy)",
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ChartContainer>
  );
}
