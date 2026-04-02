import z from "zod";

export const loginValidationZodSchema = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(8, "Password is required and must be at least 8 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
})

export const registerValidationZodSchema = z.object({
    name: z.string().min(5, "Name is required and must be at least 5 characters long").max(50, "Name must be at most 50 characters long"),
    email: z.email("Email is required and must be a valid email address"),
    password: z.string().min(8, "Password is required and must be at least 8 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
    confirmPassword: z.string().min(8, "Confirm Password is required and must be at least 8 characters long")
}).refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
});

export const updateProfileValidationSchema = z.object({
    name: z.string().min(5, "Name is required and must be at least 5 characters long").max(50, "Name must be at most 50 characters long").optional(),
    email: z.email("Email is required and must be a valid email address").optional(),
});

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(8, "Current Password is required and must be at least 8 characters long"),
    newPassword: z.string().min(8, "New Password is required and must be at least 8 characters long").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"),
    confirmPassword: z.string().min(8, "Confirm Password is required and must be at least 8 characters long")
}).refine((data: any) => data.newPassword === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
});