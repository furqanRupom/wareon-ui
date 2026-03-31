// services/order/createOrder.ts
"use server";

import { redirect } from "next/navigation";

interface OrderItem {
    productId: string;
    quantity: number;
}

export async function createOrder(prevState: any, formData: FormData) {
    const customerName = formData.get("customerName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const notes = formData.get("notes") as string;
    const itemsJson = formData.get("items") as string;
    const items: OrderItem[] = JSON.parse(itemsJson);

    // Validation
    const errors = [];

    if (!customerName) {
        errors.push({ field: "customerName", message: "Full name is required" });
    } else if (customerName.length < 2) {
        errors.push({ field: "customerName", message: "Name must be at least 2 characters" });
    }

    if (!email) {
        errors.push({ field: "email", message: "Email is required" });
    } else if (!email.includes("@") || !email.includes(".")) {
        errors.push({ field: "email", message: "Invalid email format" });
    }

    if (!phone) {
        errors.push({ field: "phone", message: "Phone number is required" });
    }

    if (!address) {
        errors.push({ field: "address", message: "Shipping address is required" });
    }

    if (items.length === 0) {
        errors.push({ field: "items", message: "Cart is empty" });
    }

    if (errors.length > 0) {
        return { errors };
    }

    // Calculate totals
    const mockProducts = {
        "1": { price: 61 },
        "2": { price: 49 },
        "3": { price: 29 },
        "4": { price: 89 },
    };

    const subtotal = items.reduce((sum, item) => {
        const product = mockProducts[item.productId as keyof typeof mockProducts];
        return sum + (product?.price || 0) * item.quantity;
    }, 0);

    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    // Create order (simulate API)
    const orderId = `order_${Date.now()}`;

    // In a real app, save to database
    const order = {
        id: orderId,
        customerName,
        email,
        phone,
        address,
        notes,
        items,
        subtotal,
        shipping,
        tax,
        total,
        status: "confirmed",
        orderDate: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    };

    console.log("Order created:", order);

    return {
        success: true,
        orderId,
    };
}