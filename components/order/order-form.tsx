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
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createOrder } from "@/services/order/createOrder";
import { toast } from "sonner";

interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    stock: number;
    category?: string;
}

export default function OrderForm() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [state, formAction, isPending] = useActionState(createOrder, null);

    // Load cart from localStorage
    useEffect(() => {
        loadCartFromStorage();

        // Listen for cart updates
        window.addEventListener("cartUpdated", loadCartFromStorage);

        return () => {
            window.removeEventListener("cartUpdated", loadCartFromStorage);
        };
    }, []);

    const loadCartFromStorage = () => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            setCartItems(parsedCart);
        } else {
            setCartItems([]);
        }
        setLoading(false);
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        const item = cartItems.find(i => i.productId === productId);
        if (newQuantity > (item?.stock || 0)) {
            toast.success(`Only ${item?.stock} items available in stock.`);
            return;
        }

        const updatedCart = cartItems.map(item =>
            item.productId === productId
                ? { ...item, quantity: newQuantity }
                : item
        );

        setCartItems(updatedCart);
        // Update localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const removeItem = (productId: string) => {
        const itemToRemove = cartItems.find(item => item.productId === productId);
        const updatedCart = cartItems.filter(item => item.productId !== productId);

        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));

        toast.success(`${itemToRemove?.name} has been removed from your cart.`);
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
        // Validate cart is not empty
        if (cartItems.length === 0) {
            toast.error("Cart is empty");
            return;
        }

        // Add cart items to form data
        formData.append("items", JSON.stringify(cartItems.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
        }))));

        // Add totals to form data
        formData.append("subtotal", subtotal.toString());
        formData.append("shipping", shipping.toString());
        formData.append("tax", tax.toString());
        formData.append("total", total.toString());

        const result = await createOrder(null, formData);

        if (result.success) {
            // Clear cart after successful order
            localStorage.removeItem("cart");
            window.dispatchEvent(new Event("cartUpdated"));

            toast.success("Order placed successfully!");

            router.push(`/order/${result.orderId}`);
        } else if (result.errors) {
            // Errors will be handled by the form
            toast.error("Please fix the errors in the form and try again.");
        }
    };

    if (loading) {
        return (
            <Card className="text-center py-12">
                <CardContent>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground mt-4">Loading your cart...</p>
                </CardContent>
            </Card>
        );
    }

    if (cartItems.length === 0) {
        return (
            <Card className="text-center py-12">
                <CardContent>
                    <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                        Your cart is empty
                    </h3>
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
                        <CardFooter className="flex gap-3 pt-5">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1 rounded-full"
                                onClick={() => router.push("/cart")}
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Cart
                            </Button>
                            <Button
                                type="submit"
                                size={"lg"}
                                className="flex-1 rounded-full "
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
                <Card className="sticky top-20">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                        <CardDescription>
                            {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in cart
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Cart Items */}
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {cartItems.map((item) => (
                                <div key={item.productId} className="flex gap-3 border-b border-border pb-3">
                                    <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                                        <p className="text-primary font-semibold text-sm mt-1">
                                            ${item.price}
                                        </p>
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-6 w-6 rounded-full"
                                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="text-xs w-6 text-center font-medium">
                                                    {item.quantity}
                                                </span>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-6 w-6 rounded-full"
                                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                    disabled={item.quantity >= item.stock}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                                onClick={() => removeItem(item.productId)}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-sm">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="space-y-2 pt-2 border-t border-border">
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

                        {/* Shipping Info */}
                        <div className="pt-4 text-xs text-muted-foreground space-y-1">
                            <p>✓ Free shipping on orders over $100</p>
                            <p>✓ 30-day money-back guarantee</p>
                            <p>✓ Secure payment with SSL encryption</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}