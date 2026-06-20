import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, CheckCircle, Clock, DollarSign } from "lucide-react";
import {
    getDashboardStats,
    getRevenueTrend,
    getRecentOrders,
} from "@/services/dashboard/dashboard.service";
import { RevenueTrendChart } from "@/components/ui/revenue-trend-chart";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { WelcomeCard } from "../dashboard/welcomeCard";

function getStatusBadge(status: string) {
    switch (status) {
        case "delivered":
            return <Badge className="bg-green-500">Delivered</Badge>;
        case "pending":
            return <Badge className="bg-yellow-500">Pending</Badge>;
        case "confirmed":
            return <Badge className="bg-blue-500">Confirmed</Badge>;
        case "shipped":
            return <Badge className="bg-blue-500">Shipped</Badge>;
        case "cancelled":
            return <Badge className="bg-red-500">Cancelled</Badge>;
        default:
            return <Badge>Unknown</Badge>;
    }
}

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
}

export default async function UserDashboardPage() {
    const [statsRes, revenueTrendRes, user, recentOrdersRes] = await Promise.all([
        getDashboardStats(),
        getRevenueTrend("days=14"),
        getUserInfo(),
        getRecentOrders("limit=5"),
    ]);
    const name = user.name;

    const stats = statsRes?.success
        ? statsRes.data
        : {
              ordersToday: 0,
              pendingOrders: 0,
              completedOrders: 0,
              revenueToday: 0,
              lowStockCount: 0,
              totalProducts: 0,
              outOfStockCount: 0,
          };

    const revenueTrend = revenueTrendRes?.success ? revenueTrendRes.data : [];
    const recentOrders = recentOrdersRes?.success ? recentOrdersRes.data : [];

    return (
        <div className="p-6 space-y-6">
            <WelcomeCard name={user.name} />

            {!statsRes?.success && (
                <p className="text-sm text-red-600">
                    {statsRes?.message ?? "Failed to load dashboard stats."}
                </p>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm">Orders Today</CardTitle>
                        <Package className="h-5 w-5" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{stats.ordersToday}</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm">Completed</CardTitle>
                        <CheckCircle className="h-5 w-5" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm">Revenue Today</CardTitle>
                        <DollarSign className="h-5 w-5" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-red-600">
                            ${stats.revenueToday.toLocaleString()}
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm">Pending</CardTitle>
                        <Clock className="h-5 w-5" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Revenue Trend Chart */}
            <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                    <CardDescription>Last 14 days</CardDescription>
                </CardHeader>
                <CardContent>
                    <RevenueTrendChart data={revenueTrend} />
                </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {recentOrders.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-4 text-center">
                            No recent orders found.
                        </p>
                    ) : (
                        recentOrders.map((order: any) => (
                            <div
                                key={order.id}
                                className="flex items-center justify-between p-3 border rounded-xl"
                            >
                                <div>
                                    <p className="font-medium">{order.customerName}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    {getStatusBadge(order.status)}
                                    <Button size="sm" variant="outline">
                                        View
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
