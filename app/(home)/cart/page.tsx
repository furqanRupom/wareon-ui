import ShoppingCart from "@/components/cart/shopping-cart";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Shopping Cart - Wareon",
    description: "Review your selected items and proceed to checkout.",
};

export default function CartPage() {
    return <ShoppingCart />
}