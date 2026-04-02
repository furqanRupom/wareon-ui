"use client";

import { UserInfo } from "@/types/user.interface";
import { LayoutDashboard, Menu, Search, ShoppingCartIcon, User } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import UserDropdown from "../dashboard/userDropdown";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";

interface MobileMenuProps {
    navItems: Array<{ href: string; label: string }>;
    hasAccessToken: boolean;
    userInfo?: UserInfo | null;
    dashboardRoute?: string;
}

const MobileMenu = ({
    navItems,
    hasAccessToken,
    userInfo,
    dashboardRoute,
}: MobileMenuProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
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
        <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" aria-label="Open menu">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 sm:w-96 p-0">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <div className="flex flex-col h-full">
                        {/* Mobile logo */}
                        <div className="px-6 py-5 border-b">
                            <Link
                                href="/"
                                className="text-2xl font-black tracking-tight text-primary"
                                onClick={() => setMobileOpen(false)}
                            >
                                WAREON.
                            </Link>
                        </div>

                        {/* Mobile search */}
                        <div className="px-4 py-4 border-b">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search for products..."
                                    className="pl-9 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary/40"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Mobile nav links */}
                        <nav className="flex-1 overflow-y-auto px-4 py-2">
                            {navItems.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="flex items-center py-3 text-sm font-medium border-b text-foreground hover:text-primary transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile footer actions */}
                        <div className="px-4 py-4 border-t flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1 gap-2 hover:text-primary hover:border-primary relative"
                                asChild
                            >
                                <Link href="/cart" onClick={() => setMobileOpen(false)}>
                                    <ShoppingCartIcon className="w-5 h-5" />
                                    Cart
                                    {cartCount > 0 && (
                                        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground">
                                            {cartCount}
                                        </Badge>
                                    )}
                                </Link>
                            </Button>

                            {hasAccessToken && userInfo ? (
                                <>
                                    <Button
                                        variant="outline"
                                        className="flex-1 gap-2 hover:text-primary hover:border-primary"
                                        asChild
                                    >
                                        <Link href={dashboardRoute || "/"} onClick={() => setMobileOpen(false)}>
                                            <LayoutDashboard className="w-5 h-5" />
                                            Dashboard
                                        </Link>
                                    </Button>
                                    <div className="flex justify-center">
                                        <UserDropdown userInfo={userInfo} />
                                    </div>
                                </>
                            ) : (
                                <Button
                                    variant="outline"
                                    className="flex-1 gap-2 hover:text-primary hover:border-primary"
                                    asChild
                                >
                                    <Link href="/sign-in" onClick={() => setMobileOpen(false)}>
                                        <User className="w-5 h-5" />
                                        Sign In
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileMenu;