"use server"
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createCategorySchema, updateCategorySchema } from "@/zod/category.validation";
import { revalidateTag } from "next/cache";

// crud products, only for admin and manager roles, but get products for all users


export async function getCategories() {
    try {
        const response = await serverFetch.get("/category", {
            next: {
                tags: [
                    "category-list",
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


export async function createCategory(_prevState: any, formData: FormData) {
    const validationPayload = {
        name: formData.get("name") as string,
   
    };

    const validatedPayload = zodValidator(validationPayload, createCategorySchema);

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

        const response = await serverFetch.post("/category", {
            body: JSON.stringify(validatedPayload.data),
            headers:{ "Content-Type": "application/json" },
        });

        const result = await response.json();
        if (result.success) {
            revalidateTag('category-list', { expire: 0 });
            revalidateTag('category-dashboard-meta', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.error("Create category error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to create category',
            formData: validationPayload
        };
    }
}
export async function updateCategory(categoryId: string, _prevState: any, formData: FormData) {
    const validationPayload = {
        name: formData.get("name") as string,
    };

    const validatedPayload = zodValidator(validationPayload, updateCategorySchema);

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
        const response = await serverFetch.put(`/category/${categoryId}`, {
            body: JSON.stringify(validatedPayload.data),
            headers:{ "Content-Type": "application/json" },
        });

        const result = await response.json();
        if (result.success) {
            revalidateTag('product-list', { expire: 0 })
            revalidateTag('category-list', { expire: 0 });
            revalidateTag('category-dashboard-meta', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.error("Update category error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to update category',
            formData: validationPayload
        };
    }
}

export async function deleteCategory(categoryId:string){
    try {
        const response = await serverFetch.delete(`/category/${categoryId}`)
        const result = await response.json();
        if (result.success) {
            revalidateTag('product-list',{expire:0})
            revalidateTag('category-list', { expire: 0 });
            revalidateTag('category-dashboard-meta', { expire: 0 });
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

export async function getCategoryById(categoryId: string) {
    try {
        const response = await serverFetch.get(`/category/${categoryId}`)
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

export async function getCategoryBySlug(slug: string) {
    try {
        const response = await serverFetch.get(`/category/slug/${slug}`)
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