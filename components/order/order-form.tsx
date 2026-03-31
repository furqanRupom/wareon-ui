// components/order/order-form.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createOrder } from "@/app/services/order/createOrder";

interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    stock: number;
}

const mockProducts = {
    "1": { name: "Chic Transparent Fashion Handbag", price: 61, image: "https://i.imgur.com/Lqaqz59.jpg", stock: 50 },
    "2": { name: "Premium Cotton Shirt", price: 49, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=200&h=200&fit=crop", stock: 35 },
    "3": { name: "Classic Crew Neck T-Shirt", price: 29, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop", stock: 100 },
    "4": { name: "Urban Bomber Jacket", price: 89, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=200&fit=crop", stock: 20 },
};

export default function OrderForm() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [state, formAction, isPending] = useActionState(createOrder, null);

    useEffect(() => {
        // Load cart from localStorage or use mock data
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        } else {
            // Mock cart items for demo
            const mockCart = [
                {
                    productId: "1",
                    name: mockProducts["1"].name,
                    price: mockProducts["1"].price,
                    quantity: 2,
                    image: mockProducts["1"].image,
                    stock: mockProducts["1"].stock,
                },
                {
                    productId: "2",
                    name: mockProducts["2"].name,
                    price: mockProducts["2"].price,
                    quantity: 1,
                    image: mockProducts["2"].image,
                    stock: mockProducts["2"].stock,
                },
            ];
            setCartItems(mockCart);
        }
    }, []);

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        const product = mockProducts[productId as keyof typeof mockProducts];
        if (newQuantity > product.stock) return;

        setCartItems(prev =>
            prev.map(item =>
                item.productId === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const removeItem = (productId: string) => {
        setCartItems(prev => prev.filter(item => item.productId !== productId));
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    const getFieldError = (fieldName: string) => {
        if (!state?.errors) return null;
        const fieldError = state.errors.find(
            (error: any) => error.field === fieldName
        );
        return fieldError ? fieldError.message : null;
    };

    const handleSubmit = async (formData: FormData) => {
        // Add cart items to form data
        formData.append("items", JSON.stringify(cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }))));

        const result = await createOrder(null, formData);
        if (result.success) {
            localStorage.removeItem("cart");
            router.push(`/order/${result.orderId}`);
        }
    };

    if (cartItems.length === 0) {
        return (
            <Card className="text-center py-12">
                <CardContent>
                    <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground mb-6">
                        Add some products to your cart before placing an order.
                    </p>
                    <Link href="/shop">
                        <Button className="rounded-full">Browse Products</Button>
                    </Link>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Customer Information</CardTitle>
                        <CardDescription>
                            Please provide your details to complete the order
                        </CardDescription>
                    </CardHeader>
                    <form action={handleSubmit}>
                        <CardContent className="space-y-4">
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="customerName">Full Name</FieldLabel>
                                    <Input
                                        id="customerName"
                                        name="customerName"
                                        type="text"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                    {getFieldError("customerName") && (
                                        <FieldDescription className="text-destructive">
                                            {getFieldError("customerName")}
                                        </FieldDescription>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                    {getFieldError("email") && (
                                        <FieldDescription className="text-destructive">
                                            {getFieldError("email")}
                                        </FieldDescription>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        required
                                    />
                                    {getFieldError("phone") && (
                                        <FieldDescription className="text-destructive">
                                            {getFieldError("phone")}
                                        </FieldDescription>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="address">Shipping Address</FieldLabel>
                                    <Textarea
                                        id="address"
                                        name="address"
                                        placeholder="Enter your full address"
                                        rows={3}
                                        required
                                    />
                                    {getFieldError("address") && (
                                        <FieldDescription className="text-destructive">
                                            {getFieldError("address")}
                                        </FieldDescription>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="notes">Order Notes (Optional)</FieldLabel>
                                    <Textarea
                                        id="notes"
                                        name="notes"
                                        placeholder="Special instructions, delivery preferences, etc."
                                        rows={2}
                                    />
                                </Field>
                            </FieldGroup>
                        </CardContent>
                        <CardFooter>
                            <Button
                                type="submit"
                                className="w-full rounded-full"
                                disabled={isPending}
                            >
                                {isPending ? "Placing Order..." : "Place Order"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>

            {/* Order Summary */}
            <div>
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                        <CardDescription>{cartItems.length} items in cart</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.productId} className="flex gap-3 border-b border-border pb-3">
                                <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                                    <p className="text-primary font-semibold text-sm mt-1">
                                        ${item.price}
                                    </p>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="h-7 w-7 rounded-full"
                                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <span className="text-sm w-8 text-center">{item.quantity}</span>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="h-7 w-7 rounded-full"
                                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-destructive hover:text-destructive"
                                            onClick={() => removeItem(item.productId)}
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="space-y-2 pt-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Shipping</span>
                                <span className="font-medium">
                                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Tax (10%)</span>
                                <span className="font-medium">${tax.toFixed(2)}</span>
                            </div>
                            <div className="border-t border-border pt-2 mt-2">
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span className="text-primary text-lg">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}