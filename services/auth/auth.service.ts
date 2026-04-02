"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { changePasswordSchema, updateProfileValidationSchema } from "@/zod/auth.validation";


export const updateMyProfile = async ( formData: FormData): Promise<any> => {
    try {
        const updateData = {
            name: formData.get("name"),
        }

        if (zodValidator(updateData, updateProfileValidationSchema).success === false) {
            return zodValidator(updateData, updateProfileValidationSchema);
        }

        const validatedPayload: any = zodValidator(updateData, updateProfileValidationSchema).data;


        const response = await serverFetch.put('/auth/profile', {
            body: JSON.stringify(validatedPayload),
            headers: {
                "Content-Type": "application/json",
            }
        })

        const data = await response.json();
 
        console.log(data)
        return data;
    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error("Error profile updating user:", error);
        return { success: false, message: `${error.message || "An unexpected error occurred"}` };
    }
};

export async function changePassword(_prevState: any, formData: FormData) {
    // Build validation payload
    const validationPayload = {
        currentPassword: formData.get("currentPassword") as string,
        newPassword: formData.get("newPassword") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    };

    // Validate
    const validatedPayload = zodValidator(
        validationPayload,
        changePasswordSchema
    );

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    try {
        // API Call
        const response = await serverFetch.put("/auth/change-password", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currentPassword: validationPayload.currentPassword,
                newPassword: validationPayload.newPassword,
            }),
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || "Password change failed");
        }

        return {
            success: true,
            message: result.message || "Password changed successfully!",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error?.message || "Something went wrong",
            formData: validationPayload,
        };
    }
}
