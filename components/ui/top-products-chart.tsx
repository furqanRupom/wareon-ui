"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

type TopProduct = {
    productId: string;
    name: string;
    quantitySold: number;
    revenue: number;
};

const chartConfig = {
    quantitySold: {
        label: "Units sold",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

export function TopProductsChart({ data }: { data: TopProduct[] }) {
    if (!data || data.length === 0) {
        return (
            <p className="text-sm text-muted-foreground py-8 text-center">
                No sales data available.
            </p>
        );
    }

    return (
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
            <BarChart data={data} layout="vertical" margin={{ left: 0, right: 12 }}>
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis
                    type="category"
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    width={110}
                    tickFormatter={(value: string) =>
                        value.length > 14 ? `${value.slice(0, 14)}…` : value
                    }
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar
                    dataKey="quantitySold"
                    fill="var(--color-quantitySold)"
                    radius={4}
                />
            </BarChart>
        </ChartContainer>
    );
}
