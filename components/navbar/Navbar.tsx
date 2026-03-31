// components/navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";



export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);
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
        <header className="w-full border-b bg-background sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">

                    {/* Mobile: Hamburger */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Open menu">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-72 p-0">
                                <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
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
                                       

                                        {["Shop", "Brands"].map((label) => (
                                            <Link
                                                key={label}
                                                href={`/${label.toLowerCase().replace(" ", "-")}`}
                                                className="flex items-center py-3 text-sm font-medium border-b text-foreground hover:text-primary transition-colors"
                                                onClick={() => setMobileOpen(false)}
                                            >
                                                {label}
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
                                                <ShoppingCart className="h-4 w-4" />
                                                Cart
                                                {cartCount > 0 && (
                                                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground">
                                                        {cartCount}
                                                    </Badge>
                                                )}
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="flex-1 gap-2 hover:text-primary hover:border-primary"
                                            asChild
                                        >
                                            <Link href="/sign-in" onClick={() => setMobileOpen(false)}>
                                                <User className="h-4 w-4" />
                                                Account
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-2xl font-black tracking-tight text-primary shrink-0"
                    >
                        WAREON.
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center">
                        <NavigationMenu>
                            <NavigationMenuList>
                              

                                {/* Flat links */}
                                {["Shop", "Brands"].map((label) => (
                                    <NavigationMenuItem key={label}>
                                        <NavigationMenuLink
                                            asChild
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                "text-foreground hover:text-primary focus:text-primary "
                                            )}
                                        >
                                            <Link href={`/${label.toLowerCase().replace(" ", "-")}`}>
                                                {label}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>

                    {/* Search bar — desktop */}
                    <div className="hidden lg:flex flex-1 max-w-md">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search for products..."
                                className="pl-9 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary/40 w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Right icons */}
                    <div className="flex items-center gap-1">
                        {/* Mobile search icon */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden hover:text-primary"
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5" />
                        </Button>

                        {/* Cart Button with Badge */}
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Cart"
                            className="hover:text-primary relative"
                            asChild
                        >
                            <Link href="/cart">
                                <ShoppingCart className="h-5 w-5" />
                                {cartCount > 0 && (
                                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs">
                                        {cartCount > 99 ? "99+" : cartCount}
                                    </Badge>
                                )}
                            </Link>
                        </Button>
                        
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Account"
                            className="hover:text-primary"
                            asChild
                        >
                            <Link href="/sign-in">
                                <User className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>

                </div>
            </div>
        </header>
    );
}