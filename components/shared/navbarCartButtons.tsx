"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCartIcon } from "lucide-react";

interface NavbarCartButtonProps {
    variant?: "default" | "ghost" | "outline";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
}

const NavbarCartButton = ({
    variant = "ghost",
    size = "icon",
    className = ""
}: NavbarCartButtonProps) => {
    const [cartCount, setCartCount] = useState(0);

    // Load cart count on mount and listen for updates
    useEffect(() => {
        loadCartCount();

        // Listen for cart updates
        window.addEventListener("cartUpdated", loadCartCount);

        return () => {
            window.removeEventListener("cartUpdated", loadCartCount);
        };
    }, []);

    const loadCartCount = () => {
        const cart = localStorage.getItem("cart");
        if (cart) {
            const cartItems = JSON.parse(cart);
            const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
            setCartCount(totalItems);
        } else {
            setCartCount(0);
        }
    };

    return (
        <Button
            variant={variant}
            size={size}
            aria-label="Cart"
            className={`hover:text-primary relative ${className}`}
            asChild
        >
            <Link href="/cart">
                <ShoppingCartIcon className="w-5 h-5" />
                {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs">
                        {cartCount > 99 ? "99+" : cartCount}
                    </Badge>
                )}
            </Link>
        </Button>
    );
};

export default NavbarCartButton;