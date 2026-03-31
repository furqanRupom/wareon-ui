// app/shop/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import ProductCard from "./product-card";

// Mock Data
const mockProducts = [
    {
        _id: "1",
        name: "Chic Transparent Fashion Handbag",
        price: 61,
        stock: 50,
        productUrl: ["https://i.imgur.com/Lqaqz59.jpg"],
        category: {
            _id: "cat1",
            name: "Miscellaneous",
            slug: "miscellaneous",
        },
        status: "ACTIVE",
        sku: "CHIC-TRANSPARENT-001",
    },
    {
        _id: "2",
        name: "Premium Cotton Shirt",
        price: 49,
        stock: 35,
        productUrl: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop"],
        category: {
            _id: "cat2",
            name: "Men's Wear",
            slug: "mens-wear",
        },
        status: "ACTIVE",
        sku: "PREMIUM-COTTON-001",
    },
    {
        _id: "3",
        name: "Classic Crew Neck T-Shirt",
        price: 29,
        stock: 100,
        productUrl: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop"],
        category: {
            _id: "cat2",
            name: "Men's Wear",
            slug: "mens-wear",
        },
        status: "ACTIVE",
        sku: "CLASSIC-CREW-001",
    },
    {
        _id: "4",
        name: "Urban Bomber Jacket",
        price: 89,
        stock: 20,
        productUrl: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop"],
        category: {
            _id: "cat2",
            name: "Men's Wear",
            slug: "mens-wear",
        },
        status: "ACTIVE",
        sku: "URBAN-BOMBER-001",
    },
    {
        _id: "5",
        name: "Elegant Evening Dress",
        price: 120,
        stock: 15,
        productUrl: ["https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400&h=400&fit=crop"],
        category: {
            _id: "cat3",
            name: "Women's Wear",
            slug: "womens-wear",
        },
        status: "ACTIVE",
        sku: "ELEGANT-DRESS-001",
    },
    {
        _id: "6",
        name: "Casual Denim Jeans",
        price: 55,
        stock: 45,
        productUrl: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop"],
        category: {
            _id: "cat2",
            name: "Men's Wear",
            slug: "mens-wear",
        },
        status: "ACTIVE",
        sku: "CASUAL-DENIM-001",
    },
    {
        _id: "7",
        name: "Leather Crossbody Bag",
        price: 75,
        stock: 30,
        productUrl: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop"],
        category: {
            _id: "cat4",
            name: "Accessories",
            slug: "accessories",
        },
        status: "ACTIVE",
        sku: "LEATHER-BAG-001",
    },
    {
        _id: "8",
        name: "Running Sneakers",
        price: 85,
        stock: 40,
        productUrl: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"],
        category: {
            _id: "cat5",
            name: "Footwear",
            slug: "footwear",
        },
        status: "ACTIVE",
        sku: "RUNNING-SNEAKERS-001",
    },
];

const mockCategories = [
    { _id: "cat1", name: "Miscellaneous", slug: "miscellaneous" },
    { _id: "cat2", name: "Men's Wear", slug: "mens-wear" },
    { _id: "cat3", name: "Women's Wear", slug: "womens-wear" },
    { _id: "cat4", name: "Accessories", slug: "accessories" },
    { _id: "cat5", name: "Footwear", slug: "footwear" },
];

export default function ShopPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [products] = useState(mockProducts);
    const [filteredProducts, setFilteredProducts] = useState(mockProducts);
    const [categories] = useState(mockCategories);

    // Filter states
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [maxPrice] = useState(200);

    // Mobile filter sheet open state
    const [filterOpen, setFilterOpen] = useState(false);

    // Apply filters
    useEffect(() => {
        let filtered = [...products];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(product =>
                selectedCategories.includes(product.category.slug)
            );
        }

        // Price filter
        filtered = filtered.filter(product =>
            product.price >= priceRange[0] && product.price <= priceRange[1]
        );

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategories, priceRange, products]);

    const handleCategoryChange = (categorySlug: string) => {
        setSelectedCategories(prev =>
            prev.includes(categorySlug)
                ? prev.filter(c => c !== categorySlug)
                : [...prev, categorySlug]
        );
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategories([]);
        setPriceRange([0, maxPrice]);
    };

    // Filter Sidebar Component
    const FilterSidebar = () => (
        <div className="space-y-6">
            {/* Search */}
            <div>
                <h3 className="font-semibold text-foreground mb-3">Search</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            {/* Categories */}
            <div>
                <h3 className="font-semibold text-foreground mb-3">Categories</h3>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <div key={category._id} className="flex items-center space-x-2">
                            <Checkbox
                                id={category.slug}
                                checked={selectedCategories.includes(category.slug)}
                                onCheckedChange={() => handleCategoryChange(category.slug)}
                            />
                            <Label
                                htmlFor={category.slug}
                                className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                                {category.name}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
                <div className="space-y-4">
                    <Slider
                        min={0}
                        max={maxPrice}
                        step={1}
                        value={priceRange}
                        onValueChange={(value: any) => setPriceRange(value as [number, number])}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="w-full"
                >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                </Button>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <Breadcrumb className="mb-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Shop</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                        Shop
                    </h1>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        {/* Mobile Filter Button */}
                        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="md:hidden">
                                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                                    Filters
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-75 sm:w-100">
                                <SheetHeader>
                                    <SheetTitle>Filters</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6">
                                    <FilterSidebar />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden md:block w-64 shrink-0">
                        <FilterSidebar />
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground text-lg">No products found</p>
                                <Button
                                    variant="link"
                                    onClick={clearFilters}
                                    className="mt-2"
                                >
                                    Clear filters
                                </Button>
                            </div>
                        ) : (
                            <>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Showing {filteredProducts.length} products
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}