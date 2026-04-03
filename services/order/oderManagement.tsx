"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IOrderItem } from "@/types/order.interface";
import { createOrderSchema } from "@/zod/order.validation";

export async function createOrder(prevState: any, formData: FormData) {
    // 🔥 Parse items safely
    let items: IOrderItem[] = [];

    try {
        const rawItems = formData.get("items");
        items = rawItems ? JSON.parse(rawItems as string) : [];
    } catch {
        return {
            success: false,
            message: "Invalid items format",
        };
    }

    const validationPayload = {
        customerName: formData.get("customerName") as string,
        items,
        notes: formData.get("notes") as string | null,
    };
    console.log(validationPayload)

    const validatedPayload = zodValidator(validationPayload, createOrderSchema);
    if (!validatedPayload.success) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    try {
        const response = await serverFetch.post("/order", {
            body: JSON.stringify(validatedPayload.data),
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        console.log(result)

        if (!response.ok) {
            return {
                success: false,
                message: result?.message || "Failed to create order",
                formData: validationPayload,
            };
        }

        return {
            success: true,
            message: result?.message || "Order created successfully",
        };

    } catch (error: any) {
        console.error("Create order error:", error);

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to create order",
            formData: validationPayload,
        };
    }
}