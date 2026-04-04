import { z } from "zod";
export const orderItemSchema = z.object({
    productId: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),

    quantity: z
        .number()
        .positive("Quantity must be greater than 0"),
});

export const createOrderSchema = z.object({
    customerName: z
        .string()
        .min(1, "Customer name is required")
        .max(120, "Customer name must be at most 120 characters"),

    items: z
        .array(orderItemSchema)
        .min(1, "At least one item is required"),

    notes: z
        .string()
        .max(500, "Notes must be at most 500 characters")
        .optional(),
});

export enum OrderStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    SHIPPED = 'shipped',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}


export const updateStatusSchema = z.object({
    status: z.enum(OrderStatus)
})

export const orderItemUpdateSchema = z.object({
    productId: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId").optional(),

    quantity: z
        .number()
        .positive("Quantity must be greater than 0").optional(),
});
