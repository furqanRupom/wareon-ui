"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { updateOrderStatus } from "@/services/order/oderManagement";
import { IOrders } from "@/types/order.interface";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import InputFieldError from "@/components/shared/inputFieldError";

interface IOrderManagementDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    order?: IOrders;
}

const orderStatuses = [
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
];

const OrderManagementDialog = ({
    open,
    onClose,
    onSuccess,
    order,
}: IOrderManagementDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = !!order?._id;

    const [state, formAction, isPending] = useActionState(
        updateOrderStatus.bind(null, order?._id as string),
        null
    );

    const prevStateRef = useRef(state);

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message || "Order status updated successfully");
            if (formRef.current) {
                formRef.current.reset();
            }
            onSuccess();
            onClose();
        } else if (state?.message && !state.success) {
            toast.error(state.message);
        }
    }, [state, onSuccess, onClose]);

    const handleClose = () => {
        formRef.current?.reset();
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0 lg:min-w-lg">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Update Order Status</DialogTitle>
                </DialogHeader>

                <form action={formAction} className="flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        <Field>
                            <FieldLabel htmlFor="status">Order Status</FieldLabel>
                            <select
                                id="status"
                                name="status"
                                className="w-full rounded-md border border-input bg-background px-3 py-2"
                                defaultValue={order?.status || "pending"}
                            >
                                {orderStatuses.map((status) => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                            <InputFieldError field="status" state={state} />
                        </Field>

                        {order && (
                            <div className="text-sm bg-gray-50 p-3 rounded-md space-y-1">
                                <p><span className="font-medium">Order ID:</span> {order._id.slice(-8)}</p>
                                <p><span className="font-medium">Customer:</span> {order.customerName}</p>
                                <p><span className="font-medium">Current Status:</span> {order.status}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Updating..." : "Update Status"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default OrderManagementDialog;