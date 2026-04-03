"use client";

import { useState, useEffect, useActionState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
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
import Pagination from "./cardPagination";
import { getProducts } from "@/services/product/productManagent";
import ProductCardSkeleton from "./productSkeleton";

interface Category {
    _id: string;
    name: string;
    slug: string;
}

interface Product {
    _id: string;
    name: string;
    price: number;
    stock: number;
    productUrl: string[];
    category: Category;
    status: string;
    sku: string;
}

interface ProductsResult {
    data: Product[];
    total: number;
    meta?: { page: number; limit: number; total: number; totalPages: number };
    success: boolean;
    message?: string;
}

interface ShopProps {
    initialData: ProductsResult;
    categories: Category[];
    // Seeded from URL params by the server page
    initialPage?: number;
    initialSearch?: string;
    initialCategories?: string[];
    initialMinPrice?: number;
    initialMaxPrice?: number;
}

const MAX_PRICE = 10000;
const DEBOUNCE_MS = 500;
const SKELETON_COUNT = 6;
const DEFAULT_LIMIT = 12;

async function fetchProductsAction(
    _prev: ProductsResult,
    queryString: string
): Promise<ProductsResult> {
    return await getProducts(queryString);
}

export default function ShopPage({
    initialData,
    categories,
    initialPage = 1,
    initialSearch = "",
    initialCategories = [],
    initialMinPrice = 0,
    initialMaxPrice = MAX_PRICE,
}: ShopProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const isFirstRender = useRef(true);

    const [state, dispatch] = useActionState(fetchProductsAction, initialData);

    // Seed state from URL params so UI matches the server-rendered data on first paint
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [priceRange, setPriceRange] = useState<[number, number]>([initialMinPrice, initialMaxPrice]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [filterOpen, setFilterOpen] = useState(false);

    const buildAndDispatch = (page: number) => {
        const params = new URLSearchParams();
        if (searchTerm) params.set("search", searchTerm);
        if (selectedCategories.length > 0) params.set("category", selectedCategories.join(","));
        if (priceRange[0] > 0) params.set("minPrice", String(priceRange[0]));
        if (priceRange[1] < MAX_PRICE) params.set("maxPrice", String(priceRange[1]));
        params.set("page", String(page));
        params.set("limit", String(DEFAULT_LIMIT));

        router.replace(`/shop?${params.toString()}`, { scroll: false });

        startTransition(() => {
            dispatch(params.toString());
        });
    };

    // Reset to page 1 and debounce whenever filters change.
    // Skip on first mount — the server already fetched the correct data.
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setCurrentPage(1);
        const timer = setTimeout(() => buildAndDispatch(1), DEBOUNCE_MS);
        return () => clearTimeout(timer);
    }, [searchTerm, selectedCategories, priceRange]);

    // Immediate dispatch when page changes (no debounce needed)
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        buildAndDispatch(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((c) => c !== categoryId)
                : [...prev, categoryId]
        );
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedCategories([]);
        setPriceRange([0, MAX_PRICE]);
    };

    const hasActiveFilters =
        !!searchTerm || selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < MAX_PRICE;

    const activeFilterCount =
        selectedCategories.length +
        (priceRange[0] > 0 || priceRange[1] < MAX_PRICE ? 1 : 0);

    const products: Product[] = state?.data ?? [];
    const total: number = state?.meta?.total ?? 0;
    const limit: number = state?.meta?.limit ?? DEFAULT_LIMIT;
    const totalPages = Math.ceil(total / limit);

    const FilterSidebar = () => (
        <div className="space-y-6">
            {categories.length > 0 && (
                <div>
                    <h3 className="font-semibold text-foreground mb-3">Categories</h3>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <div key={category._id} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`cat-${category._id}`}
                                    checked={selectedCategories.includes(category._id)}
                                    onCheckedChange={() => handleCategoryChange(category._id)}
                                />
                                <Label
                                    htmlFor={`cat-${category._id}`}
                                    className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                                >
                                    {category.name}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <h3 className="font-semibold text-foreground mb-3">Price Range</h3>
                <div className="space-y-4">
                    <Slider
                        min={0}
                        max={MAX_PRICE}
                        step={10}
                        value={priceRange}
                        onValueChange={(value: any) => setPriceRange(value as [number, number])}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${priceRange[0].toLocaleString()}</span>
                        <span>
                            {priceRange[1] >= MAX_PRICE
                                ? `$${MAX_PRICE.toLocaleString()}+`
                                : `$${priceRange[1].toLocaleString()}`}
                        </span>
                    </div>
                </div>
            </div>

            {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} className="w-full">
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                </Button>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
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

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">Shop</h1>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="md:hidden shrink-0">
                                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                                    Filters
                                    {activeFilterCount > 0 && (
                                        <span className="ml-1 bg-primary text-primary-foreground rounded-full w-4 h-4 text-xs flex items-center justify-center">
                                            {activeFilterCount}
                                        </span>
                                    )}
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
                    <aside className="hidden md:block w-64 shrink-0">
                        <FilterSidebar />
                    </aside>

                    <div className="flex-1">
                        {isPending ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                                    <ProductCardSkeleton key={i} />
                                ))}
                            </div>
                        ) : products.length === 0 ? (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground text-lg">No products found</p>
                                {hasActiveFilters && (
                                    <Button variant="link" onClick={clearFilters} className="mt-2">
                                        Clear filters
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Showing {(currentPage - 1) * limit + 1}–{Math.min(currentPage * limit, total)} of {total} product{total !== 1 ? "s" : ""}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>

                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}