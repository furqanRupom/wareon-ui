"use client";

import { DateCell } from "@/components/shared/cell/dateCell";
import { StatusBadgeCell } from "@/components/shared/cell/statusBadgeCell";
import { Column } from "@/components/shared/managementTable";
import { IOrders } from "@/types/order.interface";
import { Badge } from "@/components/ui/badge";

const orderStatusColors = {
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    confirmed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    shipped: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    delivered: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export const orderColumns: Column<IOrders>[] = [
    {
        header: "Order ID",
        accessor: (order) => (
            <span className="font-mono text-sm">{order._id.slice(-8)}</span>
        ),
        sortKey: "_id",
    },
    {
        header: "Customer Name",
        accessor: (order) => (
            <div className="flex flex-col">
                <span className="font-medium text-sm">{order.customerName}</span>
                <span className="text-xs text-muted-foreground">{order.items.length} items</span>
            </div>
        ),
        sortKey: "customerName",
    },
    {
        header: "Total Items",
        accessor: (order) => (
            <span className="font-medium">
                {order.items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
        ),
    },
    {
        header: "Status",
        accessor: (order) => (
            <Badge className={orderStatusColors[order.status as keyof typeof orderStatusColors]}>
                {order.status?.toUpperCase() || "PENDING"}
            </Badge>
        ),
        sortKey: "status",
    },
    {
        header: "Total Price",
        accessor: (order) => (
            <span className="font-semibold text-primary">
                ${order.totalPrice?.toFixed(2) || "0.00"}
            </span>
        ),
        sortKey: "totalPrice",
    },
    {
        header: "Created",
        accessor: (order) => <DateCell date={order.createdAt} />,
        sortKey: "createdAt",
    },
];