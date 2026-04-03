import z from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    category: z.string().min(1, "Category is required"),
    price: z.number().min(0, "Price must be a positive number"),
    stock: z.number().min(0, "Stock must be a positive number").optional(),
    minStockThreshold: z.number().min(0, "Minimum stock threshold must be a positive number").optional(),
    productUrl: z.array(z.string().url("Each product URL must be a valid URL")).optional(),
    status: z.enum(["active", "inactive"]).optional(),
    sku: z.string().optional(),
})
export const updateProductSchema = z.object({
    name: z.string().min(1, "Product name is required").optional(),
    category: z.string().min(1, "Category is required").optional(),
    price: z.number().min(0, "Price must be a positive number").optional(),
    stock: z.number().min(0, "Stock must be a positive number").optional(),
    minStockThreshold: z.number().min(0, "Minimum stock threshold must be a positive number").optional(),
    productUrl: z.array(z.string().url("Each product URL must be a valid URL")).optional(),
    status: z.enum(["active", "inactive"]).optional(),
    sku: z.string().optional(),
})