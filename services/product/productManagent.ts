"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createProductSchema, updateProductSchema } from "@/zod/product.validation";
import { revalidateTag } from "next/cache";

// crud products, only for admin and manager roles, but get products for all users

/**
 * 
 * @param queryString 
 * @returns 
 * ?search={search by name}
 * ?category={categoryId}
 * ?minPrice={minPrice}&maxPrice={maxPrice}
 * ?limit={limit}&page={page}
 */
export async function getProducts(queryString?: string) {
    try {
        const response = await serverFetch.get(`/product${queryString ? `?${queryString}` : ""}`, {
            next: {
                tags: [
                    "product-list",
                ],
                revalidate: 180
            }
        });
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


export async function createProduct(_prevState: any, formData: FormData) {
    const validationPayload = {
        name: formData.get("name") as string,
        category: formData.get("category") as string,
        price: formData.get("price") ? Number(formData.get("price")) : undefined,
        stock: formData.get("stock") ? Number(formData.get("stock")) : undefined,
        minStockThreshold: formData.get("minStockThreshold") ? Number(formData.get("minStockThreshold")) : undefined,
        productUrl: formData.getAll("productUrl").filter(url => url) as string[],
        sku: formData.get("sku") as string | undefined,
    };

    const validatedPayload = zodValidator(validationPayload, createProductSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: validatedPayload.success,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        }
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        }
    }
  

    try {


        const response = await serverFetch.post("/product", {
            body: JSON.stringify(validatedPayload.data),
            headers:{ "Content-Type": "application/json" },
        });

        const result = await response.json();
        if (result.success) {
            revalidateTag('product-list', { expire: 0 });
            revalidateTag('product-dashboard-meta', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.error("Create product error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to create product',
            formData: validationPayload
        };
    }
}
export async function updateProduct(productId: string, _prevState: any, formData: FormData) {
    const validationPayload = {
        name: formData.get("name") as string,
        category: formData.get("category") as string,
        price: formData.get("price") ? Number(formData.get("price")) : undefined,
        stock: formData.get("stock") ? Number(formData.get("stock")) : undefined,
        minStockThreshold: formData.get("minStockThreshold") ? Number(formData.get("minStockThreshold")) : undefined,
        productUrl: formData.getAll("productUrl").filter(url => url) as string[],
        sku: formData.get("sku") as string | undefined,
    };

    const validatedPayload = zodValidator(validationPayload, updateProductSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: validatedPayload.success,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        }
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        }
    }
  

    try {
        const response = await serverFetch.put(`/product/${productId}`, {
            body: JSON.stringify(validatedPayload.data),
            headers:{ "Content-Type": "application/json" },
        });

        const result = await response.json();
        console.log(result)
        if (result.success) {
            revalidateTag('product-list', { expire: 0 });
            revalidateTag('product-dashboard-meta', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.error("Update product error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update product',
            formData: validationPayload
        };
    }
}

export async function deleteProduct(productId:string){
    try {
        const response = await serverFetch.delete(`/product/${productId}`)
        const result = await response.json();
        if (result.success) {
            revalidateTag('product-list', { expire: 0 });
            revalidateTag('product-dashboard-meta', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function getProduct(productId: string) {
    try {
        const response = await serverFetch.get(`/product/${productId}`)
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