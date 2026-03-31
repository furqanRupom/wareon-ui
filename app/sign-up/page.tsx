// app/sign-up/page.tsx
// import LogoIcon from "@/components/logo/LogoIcon";
import SignUpForm from "@/components/sign-up/sign-up-form";
import { Card } from "@/components/ui/card";
import { FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Sign Up - Wareon",
    description: "Create a WAREON account to enjoy personalized shopping, track your orders, and access exclusive deals.",
}

const SignUpPage = () => {
    return (
        <section className="max-w-7xl mx-auto min-h-svh flex flex-col items-center justify-center">
            <div className="py-5">
                <div className="font-bold text-3xl inline-flex items-center">
                    <h3 className="pt-3 text-primary">
                        WAREON.
                    </h3>
                </div>
            </div>
            <Card className="max-w-lg w-full p-7">
                <FieldSet>
                    <FieldLegend className="mx-auto font-bold">
                        <h3 className="text-2xl">Create an account</h3>
                    </FieldLegend>
                    <FieldDescription className="text-center">
                        Join WAREON and start shopping today.
                    </FieldDescription>
                    <SignUpForm />
                </FieldSet>
            </Card>
        </section>
    );
};

export default SignUpPage;