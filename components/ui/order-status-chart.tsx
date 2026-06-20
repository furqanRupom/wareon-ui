"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";

type StatusBreakdown = { status: string; count: number };

const STATUS_COLORS: Record<string, string> = {
    pending: "var(--chart-1)",
    confirmed: "var(--chart-2)",
    shipped: "var(--chart-3)",
    delivered: "var(--chart-4)",
    cancelled: "var(--chart-5)",
};

const chartConfig = {
    count: { label: "Orders" },
} satisfies ChartConfig;

export function OrderStatusChart({ data }: { data: StatusBreakdown[] }) {
    if (!data || data.length === 0) {
        return (
            <p className="text-sm text-muted-foreground py-8 text-center">
                No order data available.
            </p>
        );
    }

    return (
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
            <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="status" hideLabel />} />
                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="status"
                    innerRadius={55}
                    outerRadius={85}
                    strokeWidth={2}
                >
                    {data.map((entry) => (
                        <Cell
                            key={entry.status}
                            fill={STATUS_COLORS[entry.status] ?? "var(--chart-1)"}
                        />
                    ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent nameKey="status" />} />
            </PieChart>
        </ChartContainer>
    );
}
