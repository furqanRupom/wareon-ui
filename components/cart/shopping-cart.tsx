// app/cart/page.tsx (updated with proper cart display)
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";

interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    stock: number;
    category: string;
}

export default function ShoppingCart() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCart();
        window.addEventListener("cartUpdated", loadCart);
        return () => window.removeEventListener("cartUpdated", loadCart);
    }, []);

    const loadCart = () => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        } else {
            setCartItems([]);
        }
        setLoading(false);
    };

    const saveCartToLocalStorage = (items: CartItem[]) => {
        localStorage.setItem("cart", JSON.stringify(items));
        window.dispatchEvent(new Event("cartUpdated"));
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
        saveCartToLocalStorage(updatedCart);
    };

    const removeItem = (productId: string) => {
        const itemToRemove = cartItems.find(item => item.productId === productId);
        const updatedCart = cartItems.filter(item => item.productId !== productId);

        setCartItems(updatedCart);
        saveCartToLocalStorage(updatedCart);

        toast.success(`${itemToRemove?.name} has been removed from your cart.`);
    };

    const clearCart = () => {
        setCartItems([]);
        saveCartToLocalStorage([]);
        toast.success("Your cart has been cleared.");
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    if (loading) {
        return (
            <div className="min-h-screen bg-background py-8">
                <div className="container mx-auto px-4 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4">
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                            Shopping Cart
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            {cartItems.length} items in your cart
                        </p>
                    </div>
                    <Link href="/shop">
                        <Button variant="outline" className="rounded-full">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Continue Shopping
                        </Button>
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                Your cart is empty
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                Looks like you haven't added any items to your cart yet.
                            </p>
                            <Link href="/shop">
                                <Button className="rounded-full">Start Shopping</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardContent className="p-0">
                                    <div className="divide-y divide-border">
                                        {cartItems.map((item) => (
                                            <div
                                                key={item.productId}
                                                className="p-4 hover:bg-muted/10 transition-colors"
                                            >
                                                <div className="flex gap-4">
                                                    <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <Link href={`/shop/${item.productId}`}>
                                                            <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                                                                {item.name}
                                                            </h3>
                                                        </Link>
                                                        <p className="text-sm text-muted-foreground mt-1">
                                                            {item.category}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Stock: {item.stock} available
                                                        </p>
                                                        <div className="flex items-center justify-between mt-3">
                                                            <div className="flex items-center gap-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="h-8 w-8 rounded-full"
                                                                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                                                    disabled={item.quantity <= 1}
                                                                >
                                                                    <Minus className="h-3 w-3" />
                                                                </Button>
                                                                <span className="w-8 text-center font-medium">
                                                                    {item.quantity}
                                                                </span>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="h-8 w-8 rounded-full"
                                                                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                                                    disabled={item.quantity >= item.stock}
                                                                >
                                                                    <Plus className="h-3 w-3" />
                                                                </Button>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="font-bold text-primary">
                                                                    ${(item.price * item.quantity).toFixed(2)}
                                                                </p>
                                                                <p className="text-xs text-muted-foreground">
                                                                    ${item.price} each
                                                                </p>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="text-muted-foreground hover:text-destructive"
                                                                onClick={() => removeItem(item.productId)}
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 border-t border-border bg-muted/30 flex justify-between">
                                        <Button variant="outline" onClick={clearCart}>
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Clear Cart
                                        </Button>
                                        <Button variant="link" asChild>
                                            <Link href="/shop">Add More Items</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <Card className="sticky top-20">
                                <CardContent className="p-6 space-y-4">
                                    <h2 className="text-xl font-bold">Order Summary</h2>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Tax (10%)</span>
                                            <span>${tax.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t border-border pt-3 mt-3">
                                            <div className="flex justify-between font-bold text-lg">
                                                <span>Total</span>
                                                <span className="text-primary">${total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full rounded-full"
                                        size="lg"
                                        onClick={() => router.push("/order")}
                                    >
                                        Proceed to Checkout
                                    </Button>

                                    <div className="space-y-2 pt-4 text-xs text-muted-foreground">
                                        <p>✓ Free shipping on orders over $100</p>
                                        <p>✓ 30-day money-back guarantee</p>
                                        <p>✓ Secure payment with SSL encryption</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}