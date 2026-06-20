"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

type RevenueTrendPoint = {
    date: string;
    revenue: number;
    orders: number;
};

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

export function RevenueTrendChart({ data }: { data: RevenueTrendPoint[] }) {
    if (!data || data.length === 0) {
        return (
            <p className="text-sm text-muted-foreground py-8 text-center">
                No revenue data available.
            </p>
        );
    }

    return (
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
            <AreaChart data={data} margin={{ left: 0, right: 12, top: 12 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) =>
                        new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                        })
                    }
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} width={50} />
                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            indicator="line"
                            labelFormatter={(value) =>
                                new Date(value).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })
                            }
                        />
                    }
                />
                <Area
                    dataKey="revenue"
                    type="monotone"
                    fill="var(--color-revenue)"
                    fillOpacity={0.2}
                    stroke="var(--color-revenue)"
                    strokeWidth={2}
                />
            </AreaChart>
        </ChartContainer>
    );
}
