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

// Mock order data
const mockOrders: Record<string, any> = {
    "order_123": {
        id: "order_123",
        customerName: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 8900",
        address: "123 Main St, New York, NY 10001",
        notes: "Please leave at the door",
        items: [
            {
                productId: "1",
                name: "Chic Transparent Fashion Handbag",
                price: 61,
                quantity: 2,
                image: "https://i.imgur.com/Lqaqz59.jpg",
            },
            {
                productId: "2",
                name: "Premium Cotton Shirt",
                price: 49,
                quantity: 1,
                image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop",
            },
        ],
        subtotal: 171,
        shipping: 10,
        tax: 17.1,
        total: 198.1,
        status: "confirmed",
        orderDate: "2024-03-15T10:30:00Z",
        estimatedDelivery: "2024-03-20T10:30:00Z",
    },
};

const orderStatuses = {
    pending: { label: "Pending", icon: Package, color: "text-yellow-500" },
    confirmed: { label: "Confirmed", icon: CheckCircle, color: "text-blue-500" },
    processing: { label: "Processing", icon: Package, color: "text-purple-500" },
    shipped: { label: "Shipped", icon: Truck, color: "text-orange-500" },
    delivered: { label: "Delivered", icon: CheckCircle, color: "text-green-500" },
    cancelled: { label: "Cancelled", icon: Package, color: "text-red-500" },
};

interface OrderPageProps {
    params: {
        orderId: string;
    };
}

export default async function OrderDetailPage({ params }: OrderPageProps) {
    const order = mockOrders[params.orderId];

    if (!order) {
        return (
            <div className="min-h-screen bg-background py-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
                    <p className="text-muted-foreground mb-6">
                        The order you're looking for doesn't exist.
                    </p>
                    <Link href="/shop">
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const status = orderStatuses[order.status as keyof typeof orderStatuses];
    const StatusIcon = status.icon;

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
                            <BreadcrumbLink href="/order">Order</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Order #{order.id.slice(-8)}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                            Order Details
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Order #{order.id.slice(-8)} • Placed on{" "}
                            {new Date(order.orderDate).toLocaleDateString()}
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
                                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
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
                                                {new Date(order.orderDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Truck className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Est. Delivery</p>
                                            <p className="text-sm font-medium">
                                                {new Date(order.estimatedDelivery).toLocaleDateString()}
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
                                {order.items.map((item: any) => (
                                    <div
                                        key={item.productId}
                                        className="flex gap-4 border-b border-border pb-4 last:border-0 last:pb-0"
                                    >
                                        <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                Quantity: {item.quantity}
                                            </p>
                                            <p className="text-primary font-semibold mt-1">
                                                ${item.price} each
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-semibold">
                                                ${(item.price * item.quantity).toFixed(2)}
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
                                    <span>${order.subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>
                                        {order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span>${order.tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-border pt-3 mt-2">
                                    <div className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span className="text-primary text-lg">
                                            ${order.total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Shipping Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div>
                                    <p className="text-sm text-muted-foreground">Customer Name</p>
                                    <p className="font-medium">{order.customerName}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium">{order.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <p className="font-medium">{order.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Shipping Address</p>
                                    <p className="font-medium">{order.address}</p>
                                </div>
                                {order.notes && (
                                    <div>
                                        <p className="text-sm text-muted-foreground">Order Notes</p>
                                        <p className="font-medium text-sm">{order.notes}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Track Order Button */}
                        <Button className="w-full rounded-full" variant="outline">
                            <Truck className="h-4 w-4 mr-2" />
                            Track Order
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}