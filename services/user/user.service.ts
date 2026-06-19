"use server"

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export async function deleteMyAccount() {
    try {
        const response = await serverFetch.delete("/auth/delete-account")
        const result = await response.json();
        if (result.success) {
            revalidateTag('user-info', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
