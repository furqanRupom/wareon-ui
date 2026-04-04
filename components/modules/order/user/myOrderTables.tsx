"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ManagementTable from "@/components/shared/managementTable";
import { myOrderColumns } from "./myOrderColumns";
import { IOrders } from "@/types/order.interface";
import MyOrderManagementDialog from "./myOrderManagementDialog";
import OrderViewDetailDialog from "../manager/orderViewDetails";

interface MyOrderTableProps {
    orders: IOrders[];
}

const MyOrderTable = ({ orders }: MyOrderTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [viewingOrder, setViewingOrder] = useState<IOrders | null>(null);
    const [cancellingOrder, setCancellingOrder] = useState<IOrders | null>(null);
    const [updatingOrder, setUpdatingOrder] = useState<IOrders | null>(null);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (order: IOrders) => {
        setViewingOrder(order);
    };

    const handleCancel = (order: IOrders) => {
        setCancellingOrder(order);
    };

    const handleUpdate = (order: IOrders) => {
        setUpdatingOrder(order);
    };

    // Custom actions for user orders
    const customActions = [
        {
            label: "Cancel Order",
            onClick: handleCancel,
            variant: "destructive" as const,
            showCondition: (order: IOrders) => order.status === "pending" || order.status === "confirmed",
        },
    ];

    return (
        <>
            <ManagementTable
                data={orders}
                columns={myOrderColumns}
                onView={handleView}
                customActions={customActions}
                getRowKey={(order) => order._id!}
                emptyMessage="No orders found"
            />

         
            <MyOrderManagementDialog
                open={!!cancellingOrder}
                onClose={() => setCancellingOrder(null)}
                order={cancellingOrder!}
                type="cancel"
                onSuccess={() => {
                    setCancellingOrder(null);
                    handleRefresh();
                }}
            />

            {/* View Order Detail Dialog */}
            <OrderViewDetailDialog
                open={!!viewingOrder}
                onClose={() => setViewingOrder(null)}
                order={viewingOrder}
            />
        </>
    );
};

export default MyOrderTable;