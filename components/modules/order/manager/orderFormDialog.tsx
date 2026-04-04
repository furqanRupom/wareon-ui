"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateOrder } from "@/services/order/oderManagement";
import { IOrders } from "@/types/order.interface";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { X, Plus, Minus } from "lucide-react";
import InputFieldError from "@/components/shared/inputFieldError";

interface IOrderFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    order?: IOrders;
}

interface OrderItem {
    productId: string;
    quantity: number;
}

export const OrderFormDialog = ({
    open,
    onClose,
    onSuccess,
    order,
}: IOrderFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [items, setItems] = useState<OrderItem[]>([]);
    const [state, formAction, isPending] = useActionState(
        updateOrder.bind(null, order?._id as string),
        null
    );
    console.log(order)
    const prevStateRef = useRef(state);

    // Initialize items when order changes
    useEffect(() => {
        if (order?.items) {
            setItems(order.items);
        }
    }, [order]);

    const updateQuantity = (index: number, quantity: number) => {
        if (quantity < 1) return;
        const updatedItems = [...items];
        updatedItems[index].quantity = quantity;
        setItems(updatedItems);
    };

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message || "Order updated successfully");
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
        setItems(order?.items || []);
        formRef.current?.reset();
        onClose();
    };

    const handleSubmit = async (formData: FormData) => {
        formData.append("items", JSON.stringify(items));
        formAction(formData);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0 lg:min-w-2xl">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Edit Order Items</DialogTitle>
                </DialogHeader>

                <form action={handleSubmit} className="flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        <div className="space-y-3">
                            <Label>Order Items</Label>
                            <p className="text-sm text-muted-foreground">
                                Update the quantities of items in this order
                            </p>

                            {items.length > 0 ? (
                                <div className="space-y-2">
                                    {items.map((item, index) => (
                                        <div key={index} className="flex gap-2 items-center border p-3 rounded-lg">
                                            <div className="flex-1">
                                                <Input
                                                    value={item.productId}
                                                    disabled
                                                    className="bg-gray-50"
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(index, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-12 text-center font-medium">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(index, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No items in this order
                                </div>
                            )}
                        </div>

                        {/* Order Summary */}
                        {items.length > 0 && (
                            <div className="border-t pt-4">
                                <div className="bg-gray-50 p-3 rounded-md">
                                    <p className="text-sm font-medium">Order Summary</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Total Items: {items.reduce((sum, item) => sum + item.quantity, 0)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Note: Price changes will be reflected automatically
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending || items.length === 0}>
                            {isPending ? "Updating..." : "Update Order"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};