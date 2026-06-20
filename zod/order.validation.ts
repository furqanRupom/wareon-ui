import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid MongoDB ObjectId"),
  quantity: z
    .number()
    .positive("Quantity must be greater than 0"),
});

const phoneRegex = /^[0-9+\-\s()]{7,20}$/;

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
  address: z
    .string()
    .min(1, "Delivery address is required")
    .max(300, "Address must be at most 300 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Invalid phone number format"),

  alternatePhone: z
    .preprocess(
      (val) => (val === "" ? undefined : val),
      z
        .string()
        .regex(phoneRegex, "Invalid alternate phone format")
        .optional()
    ),
  city: z
    .string()
    .max(100, "City must be at most 100 characters")
    .optional()
    .or(z.literal("")),
  landmark: z
    .string()
    .max(150, "Landmark must be at most 150 characters")
    .optional()
    .or(z.literal("")),
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
