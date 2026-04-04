"use client";

import { DateCell } from "@/components/shared/cell/dateCell";
import { StatusBadgeCell } from "@/components/shared/cell/statusBadgeCell";
import { Column } from "@/components/shared/managementTable";
import { IOrders } from "@/types/order.interface";
import { Badge } from "@/components/ui/badge";

const orderStatusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
};

export const myOrderColumns: Column<IOrders>[] = [
    {
        header: "Order ID",
        accessor: (order) => (
            <span className="font-mono text-sm">{order._id.slice(-8)}</span>
        ),
    },
    {
        header: "Items",
        accessor: (order) => (
            <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
        ),
    },
    {
        header: "Status",
        accessor: (order) => (
            <Badge className={orderStatusColors[order.status as keyof typeof orderStatusColors]}>
                {order.status?.toUpperCase() || "PENDING"}
            </Badge>
        ),
    },
    {
        header: "Total",
        accessor: (order) => (
            <span className="font-semibold text-primary">
                ${order.totalPrice?.toFixed(2) || "0.00"}
            </span>
        ),
    },
    {
        header: "Order Date",
        accessor: (order) => <DateCell date={order.createdAt} />,
    },
];