import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Brands - Wareon",
    description: "Discover top brands and their latest products at Wareon. Shop with confidence and find the best deals on your favorite brands.",
};

import Brands from "@/components/brands/brands";

export default function Page() {
    return <Brands />;
}