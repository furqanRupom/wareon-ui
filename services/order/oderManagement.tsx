"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { IOrderItem } from "@/types/order.interface";
import { createOrderSchema, orderItemUpdateSchema, updateStatusSchema } from "@/zod/order.validation";
import { revalidateTag } from "next/cache";

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

        if (!response.ok) {
            return {
                success: false,
                message: result?.message || "Failed to create order",
                formData: validationPayload,
            };
        }
        if (result.success) {
            revalidateTag('product-list', { expire: 0 });
            revalidateTag('order-list', { expire: 0 });
            revalidateTag('user-order-list', { expire: 0 });
            revalidateTag('product-dashboard-meta', { expire: 0 });
            revalidateTag('activity-logs', { expire: 0 });
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

export async function getOrders(queryString?: string) {
    try {
        const response = await serverFetch.get(`/order${queryString ? `?${queryString}` : ""}`, {
            next: {
                tags: [
                    "order-list",
                ],
                revalidate: 180
            }
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
/**
 * 
 * @param queryString 
 * 
 * {
  success: true,
  message: 'Orders fetched successfully',
  meta: { total: 9, page: 1, limit: 10, totalPages: 1 },
  data: [
    {
      _id: '69d04eff8f47ea291da73f7f',
      customerName: 'nice order',
      items: [Array],
      totalPrice: 10,
      status: 'pending',
      createdBy: '69ceb06b8db1847b8bb72a4c',
      notes: 'nice and easy',
      createdAt: '2026-04-03T23:36:31.685Z',
      updatedAt: '2026-04-03T23:36:31.685Z',
      __v: 0
    },
    {
      _id: '69d04cbd8f47ea291da73f68',
      customerName: 'wareon user',
      items: [Array],
      totalPrice: 10,
      status: 'pending',
      createdBy: '69ceb06b8db1847b8bb72a4c',
      notes: 'nice product',
      createdAt: '2026-04-03T23:26:53.369Z',
      updatedAt: '2026-04-03T23:26:53.369Z',
      __v: 0
}]
 * @returns 
 */

export async function getOrdersByUser(queryString?: string) {
    try {
        const response = await serverFetch.get(`/order/user${queryString ? `?${queryString}` : ""}`, {
            next: {
                tags: [
                    "order-list",
                    "user-order-list"
                ],
                revalidate: 180
            }
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
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




export async function updateOrderStatus(orderId: string, _prevState: any, formData: FormData) {
    const validationPayload = {
        status: formData.get('status') as string
    }
    const validatedPayload = zodValidator(validationPayload, updateStatusSchema);
    if (!validatedPayload.success) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }
    try {
        const response = await serverFetch.patch(`/${orderId}/status`, {
            body: JSON.stringify(validatedPayload.data),
            headers: { "Content-Type": "application/json" },
        })
        const result = await response.json()
        if (!response.ok) {
            return {
                success: false,
                message: result?.message || "Failed to update order status",
                formData: validationPayload,
            };
        }
        if (result.success) {
            revalidateTag('product-list', { expire: 0 });
            revalidateTag('order-list', { expire: 0 });
            revalidateTag('user-order-list', { expire: 0 });
            revalidateTag('product-dashboard-meta', { expire: 0 });
            revalidateTag('activity-logs', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function updateOrder(orderId: string, _prevState: any, formData: FormData) {
    let items: IOrderItem[] = [];

    try {
        const rawItems = formData.get("items");
        items = rawItems ? JSON.parse(rawItems as string) : [];
        const validationPayload = { items }
        const validatedPayload = zodValidator(validationPayload, orderItemUpdateSchema)
        const response = await serverFetch.patch(`/${orderId}/items`, {
            body: JSON.stringify(validatedPayload.data),
            headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result?.message || "Failed to create order",
                formData: validationPayload,
            };
        }
        if (result.success) {
            revalidateTag('product-list', { expire: 0 });
            revalidateTag('order-list', { expire: 0 });
            revalidateTag('user-order-list', { expire: 0 });
            revalidateTag('product-dashboard-meta', { expire: 0 });
            revalidateTag('activity-logs', { expire: 0 });
        }
        return result;
    } catch {
        return {
            success: false,
            message: "Invalid items format",
        };
    }
}


export async function cancelOrder(orderId: string) {
    try {
        const response = await serverFetch.patch(`/${orderId}/cancel`)
        const result = await response.json();
        if (result.success) {
            revalidateTag('order-list', { expire: 0 });
            revalidateTag('user-order-list', { expire: 0 });
        }
        if (result.success) {
            revalidateTag('product-list', { expire: 0 });
            revalidateTag('order-list', { expire: 0 });
            revalidateTag('user-order-list', { expire: 0 });
            revalidateTag('product-dashboard-meta', { expire: 0 });
            revalidateTag('activity-logs', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}