"use server"

import { cookies } from "next/headers";
import z from "zod";

const loginValidationZodSchema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(8, "Password is required and must be at least 8 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
})

export const signInUser = async (_currentState: any, formData: FormData): Promise<any> => {
    const loginData = {
        email: formData.get("email"),
        password: formData.get("password"),
    }
    const validateFields = loginValidationZodSchema.safeParse(loginData)
    if (!validateFields.success) {
        return {
            success: false,
            errors: validateFields.error.issues.map((issue: any) => ({
                field: issue.path[0],
                message: issue.message,
            }))
        }
    }

    try {
        const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            return {
                success: false,
                errors: [{ message: "Invalid email or password" }]
            }
        }

        const { data } = await response.json();
        const cookieStore = await cookies();
        cookieStore.set("accessToken", data.accessToken, { httpOnly: true, secure: true, sameSite: "strict" });
        cookieStore.set("refreshToken", data.refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });
        return data;
    } catch (error) {
        console.error("Error logging in:", error);
    }
};