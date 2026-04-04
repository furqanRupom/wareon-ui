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
import { X, Plus, Minus } from "lucide-react";
import InputFieldError from "@/components/shared/inputFieldError";

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
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<OrderItem[]>(order?.items || []);
    const [newProductId, setNewProductId] = useState("");
    const [newQuantity, setNewQuantity] = useState(1);

    // For update order with server action
    const [state, formAction, isPending] = useActionState(
        updateOrder.bind(null, order?._id as string),
        null
    );

    const prevStateRef = useRef(state);

    const addItem = () => {
        if (!newProductId.trim()) {
            toast.error("Please enter product ID");
            return;
        }

        const existingItem = items.find(item => item.productId === newProductId);
        if (existingItem) {
            toast.error("Product already in order");
            return;
        }

        setItems([...items, { productId: newProductId, quantity: newQuantity }]);
        setNewProductId("");
        setNewQuantity(1);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateQuantity = (index: number, quantity: number) => {
        if (quantity < 1) return;
        const updatedItems = [...items];
        updatedItems[index].quantity = quantity;
        setItems(updatedItems);
    };

    // Handle success/error from server action
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

    const handleUpdate = async (formData: FormData) => {
        if (!order) return;
        formData.append("items", JSON.stringify(items));
        formAction(formData);
    };

    if (type === "cancel") {
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
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0 lg:min-w-2xl">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Update Order Items</DialogTitle>
                </DialogHeader>

                <form action={handleUpdate} className="flex flex-col flex-1 min-h-0">
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        <div className="space-y-3">
                            <Label>Order Items</Label>

                            {items.length > 0 && (
                                <div className="space-y-2">
                                    {items.map((item, index) => (
                                        <div key={index} className="flex gap-2 items-center border p-3 rounded-lg">
                                            <div className="flex-1">
                                                <Input
                                                    value={item.productId}
                                                    disabled
                                                    className="bg-gray-50"
                                                    name={`items[${index}].productId`}
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
                                                <span className="w-12 text-center">{item.quantity}</span>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(index, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeItem(index)}
                                                className="text-red-500"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="border-t pt-3">
                                <Label className="mb-2 block">Add New Item</Label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Product ID"
                                        value={newProductId}
                                        onChange={(e) => setNewProductId(e.target.value)}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Qty"
                                        className="w-24"
                                        value={newQuantity}
                                        onChange={(e) => setNewQuantity(parseInt(e.target.value) || 1)}
                                        min={1}
                                    />
                                    <Button type="button" onClick={addItem} variant="outline">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Updating..." : "Update Order"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default MyOrderManagementDialog;