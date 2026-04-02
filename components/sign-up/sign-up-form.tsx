// components/sign-up/sign-up-form.tsx
"use client";

import { useActionState, useState } from "react";
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
import { signUpUser } from "@/services/auth/signUpUser";

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [state, formAction, isPending] = useActionState(signUpUser, null);

    const getFieldError = (fieldName: string) => {
        if (!state?.errors as any) return null;

        const fieldError = state.errors.find(
            (error: any) => error.field === fieldName
        );

        return fieldError ? fieldError.message : null;
    };

    return (
        <section>
            <form action={formAction} className="space-y-6">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            autoComplete="name"
                        />
                        {getFieldError("name") && (
                            <FieldDescription className="text-destructive">
                                {getFieldError("name")}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="email">Email Address</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            autoComplete="email"
                        />
                        {getFieldError("email") && (
                            <FieldDescription className="text-destructive">
                                {getFieldError("email")}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                className="pr-10"
                                autoComplete="new-password"
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
                        <FieldDescription className="text-xs">
                            Password must be at least 6 characters long
                        </FieldDescription>
                        {getFieldError("password") && (
                            <FieldDescription className="text-destructive">
                                {getFieldError("password")}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="pr-10"
                                autoComplete="new-password"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {getFieldError("confirmPassword") && (
                            <FieldDescription className="text-destructive">
                                {getFieldError("confirmPassword")}
                            </FieldDescription>
                        )}
                    </Field>

                    <Field>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="agreeTerms"
                                name="agreeTerms"
                                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                            />
                            <label htmlFor="agreeTerms" className="text-sm cursor-pointer">
                                I agree to the{" "}
                                <Link href="/terms" className="text-primary hover:underline">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-primary hover:underline">
                                    Privacy Policy
                                </Link>
                            </label>
                        </div>
                        {getFieldError("agreeTerms") && (
                            <FieldDescription className="text-destructive">
                                {getFieldError("agreeTerms")}
                            </FieldDescription>
                        )}
                    </Field>
                </FieldGroup>

                <Button type="submit" className="w-full cursor-pointer h-11 text-base">
                    {isPending ? "Creating Account..." : "Sign Up"}
                </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground py-3 mt-4">
                Already have an account?{" "}
                <Link
                    href="/sign-in"
                    className="font-medium text-primary hover:underline"
                >
                    Sign In
                </Link>
            </p>
        </section>
    );
}