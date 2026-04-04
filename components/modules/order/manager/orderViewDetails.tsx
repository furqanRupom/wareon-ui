"use client";

import InfoRow from "@/components/shared/infoRow";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatters";
import { IOrders } from "@/types/order.interface";
import { Calendar, Package, User, Hash, ClipboardList, DollarSign } from "lucide-react";

interface IOrderViewDialogProps {
    open: boolean;
    onClose: () => void;
    order: IOrders | null;
}

const orderStatusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
};

const OrderViewDetailDialog = ({ open, onClose, order }: IOrderViewDialogProps) => {
    if (!order) return null;

    const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = order.totalPrice || 0;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Order Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Order Header */}
                    <div className="flex flex-col gap-4 p-6 bg-linear-to-br from-green-50 to-teal-50 dark:from-green-950 dark:to-teal-950 rounded-lg mb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Order #{order._id.slice(-8)}</h2>
                                <Badge className={orderStatusColors[order.status as keyof typeof orderStatusColors]}>
                                    {order.status?.toUpperCase() || "PENDING"}
                                </Badge>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-primary">
                                    ${totalPrice.toFixed(2)}
                                </p>
                                <p className="text-sm text-muted-foreground">Total Amount</p>
                            </div>
                        </div>
                    </div>

                    {/* Information Grid */}
                    <div className="space-y-6">
                        {/* Customer Information */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <User className="h-5 w-5 text-blue-600" />
                                <h3 className="font-semibold text-lg">Customer Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <User className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Customer Name" value={order.customerName} />
                                </div>
                                {order.createdBy && (
                                    <div className="flex items-start gap-3">
                                        <Hash className="h-4 w-4 mt-1 text-muted-foreground" />
                                        <InfoRow label="User ID" value={order.createdBy._id?.slice(-8)} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <Separator />

                        {/* Order Items */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Package className="h-5 w-5 text-purple-600" />
                                <h3 className="font-semibold text-lg">Order Items</h3>
                            </div>
                            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                                <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground pb-2 border-b">
                                    <div className="col-span-6">Product ID</div>
                                    <div className="col-span-3 text-center">Quantity</div>
                                    <div className="col-span-3 text-right">Subtotal</div>
                                </div>
                                {order.items.map((item, index) => (
                                    <div key={index} className="grid grid-cols-12 gap-2 text-sm">
                                        <div className="col-span-6 font-mono">{item.productId.slice(-8)}</div>
                                        <div className="col-span-3 text-center">x{item.quantity}</div>
                                        <div className="col-span-3 text-right font-medium">
                                            ${(item.unitPrice  || 0).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                                <div className="border-t pt-3 mt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold">Total Items:</span>
                                        <span className="font-medium">{totalItems}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        {/* Order Notes */}
                        {order.notes && (
                            <>
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <ClipboardList className="h-5 w-5 text-orange-600" />
                                        <h3 className="font-semibold text-lg">Order Notes</h3>
                                    </div>
                                    <div className="bg-muted/50 p-4 rounded-lg">
                                        <p className="text-sm">{order.notes}</p>
                                    </div>
                                </div>
                                <Separator />
                            </>
                        )}

                        {/* System Information */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="h-5 w-5 text-gray-600" />
                                <h3 className="font-semibold text-lg">System Information</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Created On" value={formatDateTime(order.createdAt)} />
                                </div>
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                                    <InfoRow label="Last Updated" value={formatDateTime(order.updatedAt)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default OrderViewDetailDialog;