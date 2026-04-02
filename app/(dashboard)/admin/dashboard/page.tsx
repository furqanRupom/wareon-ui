// app/dashboard/page.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DollarSign,
    Package,
    ShoppingCart,
    Users,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

export default function DashboardPage() {
    const stats = [
        {
            title: "Total Revenue",
            value: "$45,231.89",
            change: "+20.1%",
            trend: "up",
            icon: DollarSign,
            description: "Compared to last month",
        },
        {
            title: "Total Orders",
            value: "2,345",
            change: "+12.3%",
            trend: "up",
            icon: ShoppingCart,
            description: "Compared to last month",
        },
        {
            title: "Total Products",
            value: "1,234",
            change: "+5.4%",
            trend: "up",
            icon: Package,
            description: "Compared to last month",
        },
        {
            title: "Total Customers",
            value: "12,345",
            change: "-2.1%",
            trend: "down",
            icon: Users,
            description: "Compared to last month",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back! Here's an overview of your store.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    {stat.title}
                                </CardTitle>
                                <Icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    {stat.trend === "up" ? (
                                        <TrendingUp className="h-3 w-3 text-green-500" />
                                    ) : (
                                        <TrendingDown className="h-3 w-3 text-red-500" />
                                    )}
                                    <span
                                        className={
                                            stat.trend === "up" ? "text-green-500" : "text-red-500"
                                        }
                                    >
                                        {stat.change}
                                    </span>
                                    <span>{stat.description}</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Recent Orders */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                        You have 12 new orders in the last 7 days.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((order) => (
                            <div
                                key={order}
                                className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                            >
                                <div>
                                    <p className="font-medium">Order #{order}234</p>
                                    <p className="text-sm text-muted-foreground">
                                        Customer: John Doe
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-medium">$129.99</p>
                                    <p className="text-sm text-muted-foreground">Pending</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}