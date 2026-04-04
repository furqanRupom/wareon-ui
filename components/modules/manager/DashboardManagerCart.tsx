"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, CheckCircle, XCircle, Clock, DollarSign } from "lucide-react";

export default function ManagerDashboardPage() {
    // Mock data
    const stats = {
        totalOrders: 120,
        approvedOrders: 95,
        cancelledOrders: 15,
        pendingOrders: 10,
        totalRevenue: 12500, // USD or your currency
    };

    const recentOrders = [
        { id: "#2001", status: "approved", date: "2026-04-01", amount: 250 },
        { id: "#2002", status: "pending", date: "2026-04-02", amount: 180 },
        { id: "#2003", status: "cancelled", date: "2026-04-03", amount: 90 },
    ];

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "approved":
                return <Badge className="bg-green-500">Approved</Badge>;
            case "pending":
                return <Badge className="bg-yellow-500">Pending</Badge>;
            case "cancelled":
                return <Badge className="bg-red-500">Cancelled</Badge>;
            default:
                return <Badge>Unknown</Badge>;
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Manager Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="shadow-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm">Total Orders</CardTitle>
                        <Package className="h-5 w-5" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">{stats.totalOrders}</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm">Approved</CardTitle>
                        <CheckCircle className="h-5 w-5" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-green-600">{stats.approvedOrders}</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm">Cancelled</CardTitle>
                        <XCircle className="h-5 w-5" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-red-600">{stats.cancelledOrders}</p>
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

                <Card className="shadow-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-sm">Total Revenue</CardTitle>
                        <DollarSign className="h-5 w-5" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold text-blue-600">${stats.totalRevenue}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Orders */}
            <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {recentOrders.map((order) => (
                        <div
                            key={order.id}
                            className="flex items-center justify-between p-3 border rounded-xl"
                        >
                            <div>
                                <p className="font-medium">{order.id}</p>
                                <p className="text-xs text-muted-foreground">{order.date}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold">${order.amount}</span>
                                {getStatusBadge(order.status)}
                                <Button size="sm" variant="outline">
                                    View
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
