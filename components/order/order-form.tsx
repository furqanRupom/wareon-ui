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
import { toast } from "sonner";
import { createOrder } from "@/services/order/oderManagement";

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

  useEffect(() => {
    loadCartFromStorage();
    const handleCartUpdate = () => loadCartFromStorage();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
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
      toast.error(`Only ${item?.stock} items available in stock.`);
      return;
    }

    const updatedCart = cartItems.map(item =>
      item.productId === productId
        ? { ...item, quantity: newQuantity }
        : item
    );

    setCartItems(updatedCart);
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

  const tax = Math.round(subtotal * 0.10 * 100) / 100;
  const total = subtotal + shipping + tax;

  const getFieldError = (fieldName: string) => {
    if (!state?.errors) return null;
    if (Array.isArray(state.errors)) {
      const fieldError = state.errors.find(
        (error: any) => error.field === fieldName
      );
      return fieldError ? fieldError.message : null;
    }
    if (state.errors[fieldName]) {
      return state.errors[fieldName];
    }
    return null;
  };

  const handleSubmit = async (formData: FormData) => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const orderItems = cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }));

    formData.append("items", JSON.stringify(orderItems));

    formAction(formData);
  };

  useEffect(() => {
    if (state?.success) {
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cartUpdated"));

      toast.success(state.message || "Order placed successfully!");

      if (state?.data) {
        router.push(`/order/${state?.data._id}`);
      } else {
        router.push("/orders");
      }
    } else if (state?.message && !state?.success) {
      toast.error(state.message);
    }
  }, [state, router]);

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
            <CardTitle>Customer information</CardTitle>
            <CardDescription>
              Please provide your details to complete the order
            </CardDescription>
          </CardHeader>
          <form action={handleSubmit}>
            <CardContent className="space-y-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="customerName">Full name</FieldLabel>
                  <Input
                    id="customerName"
                    name="customerName"
                    type="text"
                    placeholder="Enter your full name"
                    defaultValue={state?.formData?.customerName || ""}
                    required
                  />
                  {getFieldError("customerName") && (
                    <FieldDescription className="text-destructive">
                      {getFieldError("customerName")}
                    </FieldDescription>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone">Phone number</FieldLabel>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="e.g. 01712345678"
                    defaultValue={state?.formData?.phone || ""}
                    required
                  />
                  <FieldDescription>
                    Our delivery agent will call this number on arrival
                  </FieldDescription>
                  {getFieldError("phone") && (
                    <FieldDescription className="text-destructive">
                      {getFieldError("phone")}
                    </FieldDescription>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="alternatePhone">
                    Alternate phone (optional)
                  </FieldLabel>
                  <Input
                    id="alternatePhone"
                    name="alternatePhone"
                    type="tel"
                    placeholder="Backup contact number"
                    defaultValue={state?.formData?.alternatePhone || ""}
                  />
                  {getFieldError("alternatePhone") && (
                    <FieldDescription className="text-destructive">
                      {getFieldError("alternatePhone")}
                    </FieldDescription>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="address">Delivery address</FieldLabel>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="House/flat, road, area"
                    rows={2}
                    defaultValue={state?.formData?.address || ""}
                    required
                  />
                  {getFieldError("address") && (
                    <FieldDescription className="text-destructive">
                      {getFieldError("address")}
                    </FieldDescription>
                  )}
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="city">City (optional)</FieldLabel>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="e.g. Dhaka"
                      defaultValue={state?.formData?.city || ""}
                    />
                    {getFieldError("city") && (
                      <FieldDescription className="text-destructive">
                        {getFieldError("city")}
                      </FieldDescription>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="landmark">Landmark (optional)</FieldLabel>
                    <Input
                      id="landmark"
                      name="landmark"
                      type="text"
                      placeholder="Nearby shop, building, etc."
                      defaultValue={state?.formData?.landmark || ""}
                    />
                    {getFieldError("landmark") && (
                      <FieldDescription className="text-destructive">
                        {getFieldError("landmark")}
                      </FieldDescription>
                    )}
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="notes">Order notes (optional)</FieldLabel>
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Special instructions, delivery preferences, etc."
                    rows={3}
                    defaultValue={state?.formData?.notes || ""}
                  />
                  {getFieldError("notes") && (
                    <FieldDescription className="text-destructive">
                      {getFieldError("notes")}
                    </FieldDescription>
                  )}
                </Field>
              </FieldGroup>

              <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Cash on delivery</p>
                <p>
                  No online payment is required. You'll pay in cash directly to our
                  delivery agent when your order arrives.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex gap-3 pt-5">
              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-full cursor-pointer"
                onClick={() => router.push("/cart")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to cart
              </Button>
              <Button
                type="submit"
                size={"lg"}
                className="flex-1 rounded-full cursor-pointer"
                disabled={isPending}
              >
                {isPending ? "Placing order..." : "Place order"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      {/* Order Summary */}
      <div>
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
            <CardDescription>
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in cart
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
                      ${item.price.toFixed(2)}
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

            <div className="pt-4 text-xs text-muted-foreground space-y-1">
              <p>✓ Cash on delivery — pay in person when it arrives</p>
              <p>✓ Free shipping on orders over $100</p>
              <p>✓ 30-day money-back guarantee</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
