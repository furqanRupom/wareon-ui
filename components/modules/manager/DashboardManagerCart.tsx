import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, CheckCircle, Clock, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import {
    getDashboardStats,
    getRevenueTrend,
    getRecentOrders,
    getOrderStatusBreakdown,
    getTopSellingProducts,
    getStockByCategory,
    getRestockQueueByPriority,
    getWeeklyComparison,
} from "@/services/dashboard/dashboard.service";
import { RevenueTrendChart } from "@/components/ui/revenue-trend-chart";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { WelcomeCard } from "../dashboard/welcomeCard";
import { TopProductsChart } from "@/components/ui/top-products-chart";
import { OrderStatusChart } from "@/components/ui/order-status-chart";

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

export default async function ManagerDashboardPage() {
    const [
        statsRes,
        revenueTrendRes,
        user,
        recentOrdersRes,
        orderStatusRes,
        topProductsRes,
        stockByCategoryRes,
        restockPriorityRes,
        weeklyComparisonRes,
    ] = await Promise.all([
        getDashboardStats(),
        getRevenueTrend("days=14"),
        getUserInfo(),
        getRecentOrders("limit=5"),
        getOrderStatusBreakdown(),
        getTopSellingProducts("limit=5&days=30"),
        getStockByCategory(),
        getRestockQueueByPriority(),
        getWeeklyComparison(),
    ]);

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
    const orderStatus = orderStatusRes?.success ? orderStatusRes.data : [];
    const topProducts = topProductsRes?.success ? topProductsRes.data : [];
    const stockByCategory = stockByCategoryRes?.success ? stockByCategoryRes.data : [];
    const restockPriority = restockPriorityRes?.success
        ? restockPriorityRes.data
        : { High: 0, Medium: 0, Low: 0 };
    const weekly = weeklyComparisonRes?.success
        ? weeklyComparisonRes.data
        : {
              thisWeek: { revenue: 0, orders: 0 },
              lastWeek: { revenue: 0, orders: 0 },
              revenueChangePercent: 0,
          };

    const isUp = weekly.revenueChangePercent >= 0;

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

            {/* Weekly Comparison */}
            <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                    <CardTitle>This week vs last week</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-8">
                    <div>
                        <p className="text-xs text-muted-foreground">This week revenue</p>
                        <p className="text-2xl font-bold">
                            ${weekly.thisWeek.revenue.toLocaleString()}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Last week revenue</p>
                        <p className="text-2xl font-bold text-muted-foreground">
                            ${weekly.lastWeek.revenue.toLocaleString()}
                        </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                        {isUp ? (
                            <TrendingUp className="h-5 w-5 text-green-600" />
                        ) : (
                            <TrendingDown className="h-5 w-5 text-red-600" />
                        )}
                        <span
                            className={`text-lg font-semibold ${
                                isUp ? "text-green-600" : "text-red-600"
                            }`}
                        >
                            {Math.abs(weekly.revenueChangePercent)}%
                        </span>
                    </div>
                </CardContent>
            </Card>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="rounded-2xl shadow-sm">
                    <CardHeader>
                        <CardTitle>Revenue Trend</CardTitle>
                        <CardDescription>Last 14 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RevenueTrendChart data={revenueTrend} />
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-sm">
                    <CardHeader>
                        <CardTitle>Top Selling Products</CardTitle>
                        <CardDescription>Last 30 days, by units sold</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <TopProductsChart data={topProducts} />
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-sm">
                    <CardHeader>
                        <CardTitle>Order Status</CardTitle>
                        <CardDescription>All-time breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <OrderStatusChart data={orderStatus} />
                    </CardContent>
                </Card>

                <Card className="rounded-2xl shadow-sm">
                    <CardHeader>
                        <CardTitle>Restock Queue</CardTitle>
                        <CardDescription>By priority</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm">High priority</span>
                            <Badge className="bg-red-500">{restockPriority.High}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Medium priority</span>
                            <Badge className="bg-yellow-500">{restockPriority.Medium}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm">Low priority</span>
                            <Badge className="bg-green-500">{restockPriority.Low}</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Stock by Category */}
            <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                    <CardTitle>Stock by Category</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {stockByCategory.length === 0 ? (
                        <p className="text-sm text-muted-foreground py-4 text-center">
                            No category data available.
                        </p>
                    ) : (
                        stockByCategory.map((cat: any,index:number) => (
                            <div
                                key={`${cat.categoryId}-${index}`}
                                className="flex items-center justify-between p-3 border rounded-xl"
                            >
                                <div>
                                    <p className="font-medium">{cat.categoryName}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {cat.productCount} products
                                    </p>
                                </div>
                                <p className="text-lg font-semibold">{cat.totalStock} units</p>
                            </div>
                        ))
                    )}
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
