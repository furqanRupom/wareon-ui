// app/order/[orderId]/page.tsx
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Package, Truck, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getOrderById } from "@/services/order/oderManagement";

const orderStatuses = {
    pending: { label: "Pending", icon: Package, color: "text-yellow-500", bgColor: "bg-yellow-50 dark:bg-yellow-950" },
    confirmed: { label: "Confirmed", icon: CheckCircle, color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-950" },
    processing: { label: "Processing", icon: Package, color: "text-purple-500", bgColor: "bg-purple-50 dark:bg-purple-950" },
    shipped: { label: "Shipped", icon: Truck, color: "text-orange-500", bgColor: "bg-orange-50 dark:bg-orange-950" },
    delivered: { label: "Delivered", icon: CheckCircle, color: "text-green-500", bgColor: "bg-green-50 dark:bg-green-950" },
    cancelled: { label: "Cancelled", icon: Package, color: "text-red-500", bgColor: "bg-red-50 dark:bg-red-950" },
};

interface OrderPageProps {
    params: {
        orderId: string;
    };
}

export default async function OrderDetailPage({ params }: OrderPageProps) {
    const { orderId } = await params;

    let orderData;
    try {
        const response = await getOrderById(orderId);
        console.log('Order response:', response);

        if (!response.success || !response.data) {
            throw new Error(response.message || 'Order not found');
        }
        orderData = response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        return (
            <div className="min-h-screen bg-background py-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
                    <p className="text-muted-foreground mb-6">
                        The order you're looking for doesn't exist or couldn't be loaded.
                    </p>
                    <Link href="/shop">
                        <Button className="rounded-full">Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const order = orderData;
    const status = orderStatuses[order.status as keyof typeof orderStatuses] || orderStatuses.pending;
    const StatusIcon = status.icon;

    // Format dates
    const orderDate = new Date(order.createdAt);
    const estimatedDelivery = new Date(orderDate);
    estimatedDelivery.setDate(orderDate.getDate() + 7); // Default 7 days delivery

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/order">Orders</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Order #{order._id.slice(-8)}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                            Order Details
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Order #{order._id.slice(-8)} • Placed on{" "}
                            {orderDate.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                    <Link href="/shop">
                        <Button variant="outline" className="rounded-full">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Continue Shopping
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Status</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className={`flex items-center gap-3 p-4 rounded-lg ${status.bgColor}`}>
                                    <StatusIcon className={`h-8 w-8 ${status.color}`} />
                                    <div>
                                        <p className="font-semibold text-lg">{status.label}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Your order has been {order.status}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Order Date</p>
                                            <p className="text-sm font-medium">
                                                {orderDate.toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Truck className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Est. Delivery</p>
                                            <p className="text-sm font-medium">
                                                {estimatedDelivery.toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Order Items */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Items</CardTitle>
                                <CardDescription>{order.items.length} items</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {order.items.map((item: any, index: number) => (
                                    <div
                                        key={`${item.productId}-${index}`}
                                        className="flex gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                                    >
                                        {/* Placeholder image since API doesn't return image URLs */}
                                        <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shrink-0 flex items-center justify-center">
                                            <Package className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium">{item.productName}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Quantity: {item.quantity}
                                            </p>
                                            <p className="text-primary font-semibold mt-1">
                                                ${item.unitPrice.toFixed(2)} each
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">
                                                ${item.subtotal.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Order Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${order.totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span>Included</span>
                                </div>
                                <div className="border-t border-border pt-3 mt-2">
                                    <div className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span className="text-primary text-lg">
                                            ${order.totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Customer Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <p className="text-sm text-muted-foreground">Customer Name</p>
                                    <p className="font-medium">{order.customerName}</p>
                                </div>
                                {order.createdBy && (
                                    <>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Email</p>
                                            <p className="font-medium">{order.createdBy.email || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">User ID</p>
                                            <p className="font-medium text-sm">{order.createdBy._id}</p>
                                        </div>
                                    </>
                                )}
                                {order.notes && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">Order Notes</p>
                                        <p className="font-medium text-sm">{order.notes}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Order Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Timeline</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex gap-3">
                                    <div className="relative">
                                        <div className="h-3 w-3 rounded-full bg-green-500 mt-1.5"></div>
                                        {order.status !== 'delivered' && (
                                            <div className="absolute top-4 left-1.5 h-full w-0.5 bg-border"></div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">Order Placed</p>
                                        <p className="text-xs text-muted-foreground">
                                            {orderDate.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                {order.status !== 'pending' && order.status !== 'cancelled' && (
                                    <div className="flex gap-3">
                                        <div className="h-3 w-3 rounded-full bg-blue-500 mt-1.5"></div>
                                        <div>
                                            <p className="font-medium text-sm">Order Confirmed</p>
                                            <p className="text-xs text-muted-foreground">
                                                {orderDate.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {order.status === 'delivered' && (
                                    <div className="flex gap-3">
                                        <div className="h-3 w-3 rounded-full bg-green-500 mt-1.5"></div>
                                        <div>
                                            <p className="font-medium text-sm">Delivered</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(order.updatedAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {order.status === 'cancelled' && (
                                    <div className="flex gap-3">
                                        <div className="h-3 w-3 rounded-full bg-red-500 mt-1.5"></div>
                                        <div>
                                            <p className="font-medium text-sm">Order Cancelled</p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(order.updatedAt).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Track Order Button (if shipped) */}
                        {(order.status === 'shipped' || order.status === 'delivered') && (
                            <Button className="w-full rounded-full" variant="outline">
                                <Truck className="h-4 w-4 mr-2" />
                                Track Order
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}