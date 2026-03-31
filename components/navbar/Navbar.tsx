"use client";

import { useState } from "react";
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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const shopCategories = [
    { "title": "All", href: "/shop" },
    { title: "Men", href: "/shop/men" },
    { title: "Women", href: "/shop/women" },
    { title: "Kids", href: "/shop/kids" },
    { title: "Accessories", href: "/shop/accessories" },
];

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);

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
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="shop" className="border-b">
                                                <AccordionTrigger className="text-sm font-medium py-3 hover:text-primary">
                                                    Shop
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <ul className="pl-2 space-y-1 pb-2">
                                                        {shopCategories.map((cat) => (
                                                            <li key={cat.href}>
                                                                <Link
                                                                    href={cat.href}
                                                                    className="block py-2 px-2 text-sm text-muted-foreground rounded-md hover:bg-secondary hover:text-primary transition-colors"
                                                                    onClick={() => setMobileOpen(false)}
                                                                >
                                                                    {cat.title}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>

                                        {["New Arrivals", "Brands"].map((label) => (
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
                                            className="flex-1 gap-2 hover:text-primary hover:border-primary"
                                            asChild
                                        >
                                            <Link href="/cart" onClick={() => setMobileOpen(false)}>
                                                <ShoppingCart className="h-4 w-4" />
                                                Cart
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
                                {/* Shop dropdown */}
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-sm font-medium text-foreground hover:text-primary focus:text-primary data-active:text-primary data-[state=open]:text-primary">
                                        Shop
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid grid-cols-2 gap-1 p-4 w-56">
                                            {shopCategories.map((cat) => (
                                                <li key={cat.href}>
                                                    <NavigationMenuLink asChild>
                                                        <Link
                                                            href={cat.href}
                                                            className={cn(
                                                                "block select-none rounded-md px-3 py-2 text-sm leading-none no-underline outline-none transition-colors",
                                                                "text-secondary-foreground hover:bg-secondary hover:text-primary",
                                                                "focus:bg-secondary focus:text-primary"
                                                            )}
                                                        >
                                                            {cat.title}
                                                        </Link>
                                                    </NavigationMenuLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>

                                {/* Flat links */}
                                {[" New Arrivals", "Brands"].map((label) => (
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

                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Cart"
                            className="hover:text-primary"
                            asChild
                        >
                            <Link href="/cart">
                                <ShoppingCart className="h-5 w-5" />
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