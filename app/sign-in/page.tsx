// app/sign-in/page.tsx
// import LogoIcon from "@/components/logo/LogoIcon";
import SignInForm from "@/components/sign-in/sign-in-form";
import { Card } from "@/components/ui/card";
import { FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Sign In - Wareon",
    description: "Access your WAREON account to manage your orders, view your wishlist, and update your profile information.",
}

const SignInPage = () => {
    return (
        <section className="max-w-7xl mx-auto min-h-svh flex flex-col items-center justify-center">
            <div className="py-5">
                <div className="font-bold text-3xl inline-flex items-center">
                    {/* <LogoIcon /> */}
                    <h3 className="pt-3 text-primary">
                        WAREON.
                    </h3>
                </div>
            </div>
            <Card className="max-w-lg w-full p-7">
                <FieldSet>
                    <FieldLegend className="mx-auto font-bold">
                        <h3 className="text-2xl">Welcome back!</h3>
                    </FieldLegend>
                    <FieldDescription className="text-center">
                        Sign in to your WAREON account to continue.
                    </FieldDescription>
                    <SignInForm />
                </FieldSet>
            </Card>
        </section>
    );
};

export default SignInPage;