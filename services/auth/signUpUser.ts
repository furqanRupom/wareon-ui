"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerValidationZodSchema } from "@/zod/auth.validation";
import { signInUser } from "./signInUser";


export const signUpUser = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const registerData = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword")
        }

        if (zodValidator(registerData, registerValidationZodSchema).success === false) {
            return zodValidator(registerData, registerValidationZodSchema);
        }

        const validatedPayload: any = zodValidator(registerData, registerValidationZodSchema).data;
        const { confirmPassword, ...requestData } = validatedPayload


        const response = await serverFetch.post('/auth/register',{
            body:JSON.stringify(requestData)
        })

        const data = await response.json();
        if (data.success) {
            await signInUser(_currentState, formData);
        }

        return data;
    } catch (error:any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.error("Error registering user:", error);
    }
};