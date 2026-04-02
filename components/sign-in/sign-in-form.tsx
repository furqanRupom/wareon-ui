"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { signInUser } from "@/services/auth/signInUser";
import { toast } from "sonner";
import InputFieldError from "../shared/inputFieldError";

export default function SignInForm({redirect}: {redirect?: string}) {
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, isPending] = useActionState(signInUser, null);
    useEffect(() => {
        if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state]);



    // Auto login handlers
    const handleAutoLogin = (email: string, password: string) => {
        // Create form data and submit
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formAction(formData);
    };

    return (
        <section>
            <form action={formAction} className="space-y-6">
                {redirect && <input type="hidden" name="redirect" value={redirect} />}
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">Email Address</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            autoComplete="email"
                        />
                        <InputFieldError field="email" state={state} />
                    </Field>

                    <Field>
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Link
                                href="/forgot-password"
                                className="text-sm font-medium hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>

                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pr-10"
                                autoComplete="current-password"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <InputFieldError field="password" state={state} />
                    </Field>
                </FieldGroup>

                <Button type="submit" className="w-full cursor-pointer h-11 text-base">
                    {isPending ? "Signing In..." : "Sign In"}
                </Button>
            </form>

            {/* Auto Login Buttons */}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                        Quick Access
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAutoLogin("user@wareon.com", "User12345@")}
                    className="w-full rounded-full cursor-pointer"
                    disabled={isPending}
                >
                    Sign in as User (user@wareon.com)
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAutoLogin("manager@wareon.com", "Manager12345@")}
                    className="w-full rounded-full cursor-pointer"
                    disabled={isPending}
                >
                    Sign in as Manager (manager@wareon.com)
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleAutoLogin("admin@wareon.com", "Admin12345@")}
                    className="w-full rounded-full cursor-pointer"
                    disabled={isPending}
                >
                    Sign in as Admin (admin@wareon.com)
                </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground py-3 mt-4">
                Don't have an account?{" "}
                <Link
                    href="/sign-up"
                    className="font-medium text-primary hover:underline"
                >
                    Sign Up
                </Link>
            </p>
        </section>
    );
}