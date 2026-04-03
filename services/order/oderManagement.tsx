"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IOrderItem } from "@/types/order.interface";
import { createOrderSchema } from "@/zod/order.validation";

/*
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "customerName": "wareon user",
    "items": [
      {
        "productId": "69cad95155e63859d9486daa",
        "productName": "Chic Transparent Fashion Handbag",
        "quantity": 1,
        "unitPrice": 61,
        "subtotal": 61
      },
      {
        "productId": "69cad95155e63859d9486dac",
        "productName": "Sleek Olive Green Hardshell Carry-On Luggage",
        "quantity": 1,
        "unitPrice": 48,
        "subtotal": 48
      }
    ],
    "totalPrice": 109,
    "status": "pending",
    "createdBy": "69ceb06b8db1847b8bb72a4c",
    "notes": "nice products",
    "_id": "69d0497d5923820e46b42fea",
    "createdAt": "2026-04-03T23:13:01.248Z",
    "updatedAt": "2026-04-03T23:13:01.248Z",
    "__v": 0
  }
}

*/

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

        return result;

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

export async function getOrderById(orderId: string) {
    try {
        const response = await serverFetch.get(`/order/${orderId}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}