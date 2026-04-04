"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import ManagementTable from "@/components/shared/managementTable";
import { orderColumns } from "./orderColumns";
import DeleteConfirmationDialog from "@/components/shared/deleteConfirmationDialog";
import OrderManagementDialog from "./orderManagementDialog";
import { IOrders } from "@/types/order.interface";
import { cancelOrder } from "@/services/order/oderManagement";
import { OrderFormDialog } from "./orderFormDialog";
import OrderViewDetailDialog from "./orderViewDetails";

interface OrderTableProps {
    orders: IOrders[];
}

const OrderTable = ({ orders }: OrderTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingOrder, setDeletingOrder] = useState<IOrders | null>(null);
    const [viewingOrder, setViewingOrder] = useState<IOrders | null>(null);
    const [editingOrder, setEditingOrder] = useState<IOrders | null>(null);
    const [updatingStatus, setUpdatingStatus] = useState<IOrders | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (order: IOrders) => {
        setViewingOrder(order);
    };

    const handleEdit = (order: IOrders) => {
        setEditingOrder(order);
    };

    const handleStatusUpdate = (order: IOrders) => {
        setUpdatingStatus(order);
    };

    const handleDelete = (order: IOrders) => {
        setDeletingOrder(order);
    };

    const confirmDelete = async () => {
        if (!deletingOrder) return;

        setIsDeleting(true);
        const result = await cancelOrder(deletingOrder._id!);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Order cancelled successfully");
            setDeletingOrder(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to cancel order");
        }
    };

    // Add custom actions for orders
    const customActions = [
        {
            label: "Update Status",
            onClick: handleStatusUpdate,
            variant: "outline" as const,
        },
    ];

    return (
        <>
            <ManagementTable
                data={orders}
                columns={orderColumns}
                onView={handleView}
                // onEdit={handleEdit}
                // onDelete={handleDelete}  
                customActions={customActions}
                getRowKey={(order) => order._id!}
                emptyMessage="No orders found"
            />

            {/* Edit Order Items Dialog */}
            <OrderFormDialog
                open={!!editingOrder}
                onClose={() => setEditingOrder(null)}
                order={editingOrder!}
                onSuccess={() => {
                    setEditingOrder(null);
                    handleRefresh();
                }}
            />

            {/* Update Status Dialog */}
            <OrderManagementDialog
                open={!!updatingStatus}
                onClose={() => setUpdatingStatus(null)}
                order={updatingStatus!}
                onSuccess={() => {
                    setUpdatingStatus(null);
                    handleRefresh();
                }}
            />

            {/* View Order Detail Dialog */}
            <OrderViewDetailDialog
                open={!!viewingOrder}
                onClose={() => setViewingOrder(null)}
                order={viewingOrder}
            />

            {/* Delete/Cancel Confirmation Dialog */}
            <DeleteConfirmationDialog
                open={!!deletingOrder}
                onOpenChange={(open) => !open && setDeletingOrder(null)}
                onConfirm={confirmDelete}
                title="Cancel Order"
                description={`Are you sure you want to cancel order ${deletingOrder?._id.slice(-8)}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </>
    );
};

export default OrderTable;