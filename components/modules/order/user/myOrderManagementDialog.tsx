"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cancelOrder, updateOrder } from "@/services/order/oderManagement";
import { IOrders } from "@/types/order.interface";
import { useState, useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Minus, Plus } from "lucide-react";

interface IMyOrderManagementDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    order?: IOrders;
    type: "cancel" | "update";
}

interface OrderItem {
    productId: string;
    quantity: number;
}

const MyOrderManagementDialog = ({
    open,
    onClose,
    onSuccess,
    order,
    type,
}: IMyOrderManagementDialogProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCancel = async () => {
        if (!order) return;
        setIsLoading(true);

        const result = await cancelOrder(order._id);
        setIsLoading(false);

        if (result.success) {
            toast.success(result.message || "Order cancelled successfully");
            onSuccess();
            onClose();
        } else {
            toast.error(result.message || "Failed to cancel order");
        }
    };




    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cancel Order</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p className="text-muted-foreground">
                        Are you sure you want to cancel order #{order?._id.slice(-8)}?
                        This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            No, Keep It
                        </Button>
                        <Button variant="destructive" onClick={handleCancel} disabled={isLoading}>
                            {isLoading ? "Cancelling..." : "Yes, Cancel Order"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );

   
};

export default MyOrderManagementDialog;