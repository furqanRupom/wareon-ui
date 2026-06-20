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
import {
  Calendar,
  Package,
  User,
  Hash,
  ClipboardList,
  Phone,
  MapPin,
  CreditCard,
  Truck,
} from "lucide-react";

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

const OrderViewDetailDialog = ({
  open,
  onClose,
  order,
}: IOrderViewDialogProps) => {
  if (!order) return null;

  const totalItems = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = order.totalPrice || 0;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl lg:max-w-5xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
          {/* HEADER */}
          <div className="p-6 rounded-lg bg-muted/50">
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Order #{order._id.slice(-8)}
                </h2>

                <Badge
                  className={
                    orderStatusColors[
                      order.status as keyof typeof orderStatusColors
                    ]
                  }
                >
                  {order.status?.toUpperCase()}
                </Badge>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-primary">
                  ${totalPrice.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total Amount
                </p>
              </div>
            </div>
          </div>

          {/* CUSTOMER INFO */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User className="h-5 w-5" />
              <h3 className="font-semibold">Customer Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
              <InfoRow label="Name" value={order.customerName} />

              {order.phone && (
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-1" />
                  <InfoRow label="Phone" value={order.phone} />
                </div>
              )}

              {order.alternatePhone && (
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-1" />
                  <InfoRow
                    label="Alternate Phone"
                    value={order.alternatePhone}
                  />
                </div>
              )}

            </div>
          </div>

          <Separator />

          {/* DELIVERY INFO */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5" />
              <h3 className="font-semibold">Delivery Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
              <InfoRow label="Address" value={order.address} />
              <InfoRow label="City" value={order.city} />
              <InfoRow label="Landmark" value={order.landmark} />
            </div>
          </div>

          <Separator />

          {/* PAYMENT INFO */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-5 w-5" />
              <h3 className="font-semibold">Payment Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
              <InfoRow
                label="Payment Method"
                value={order.paymentMethod}
              />

              <InfoRow
                label="Delivery Fee"
                value={`$${order.deliveryFee || 0}`}
              />

              <InfoRow
                label="Total Price"
                value={`$${order.totalPrice}`}
              />
            </div>
          </div>

          <Separator />

          {/* ITEMS */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-5 w-5" />
              <h3 className="font-semibold">Order Items</h3>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="grid grid-cols-12 text-sm font-medium border-b pb-2">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-center">Unit</div>
                <div className="col-span-3 text-right">Subtotal</div>
              </div>

              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 text-sm py-1"
                >
                  <div className="col-span-5">
                    {item.productName}
                  </div>

                  <div className="col-span-2 text-center">
                    x{item.quantity}
                  </div>

                  <div className="col-span-2 text-center">
                    ${item.unitPrice}
                  </div>

                  <div className="col-span-3 text-right font-medium">
                    ${item.subtotal}
                  </div>
                </div>
              ))}

              <div className="border-t pt-3 mt-3 flex justify-between">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* NOTES */}
          {order.notes && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ClipboardList className="h-5 w-5" />
                <h3 className="font-semibold">Notes</h3>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                {order.notes}
              </div>
            </div>
          )}

          <Separator />

          {/* SYSTEM INFO */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-5 w-5" />
              <h3 className="font-semibold">System Info</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
              <InfoRow
                label="Created At"
                value={formatDateTime(order.createdAt)}
              />
              <InfoRow
                label="Updated At"
                value={formatDateTime(order.updatedAt)}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderViewDetailDialog;
