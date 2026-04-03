import { Skeleton } from "@/components/ui/skeleton";

export function ShopSkeleton() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb Skeleton */}
                <div className="mb-6">
                    <Skeleton className="h-5 w-32" />
                </div>

                {/* Header Skeleton */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <Skeleton className="h-10 w-32" />
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Skeleton className="h-10 flex-1 md:w-72" />
                        <Skeleton className="h-10 w-24 md:hidden" />
                    </div>
                </div>

                {/* Main Content Skeleton */}
                <div className="flex gap-8">
                    {/* Sidebar Skeleton - Hidden on mobile */}
                    <aside className="hidden md:block w-64 shrink-0">
                        <div className="space-y-6">
                            <div>
                                <Skeleton className="h-6 w-24 mb-3" />
                                <div className="space-y-2">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <div key={i} className="flex items-center space-x-2">
                                            <Skeleton className="h-4 w-4 rounded" />
                                            <Skeleton className="h-4 w-20" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Skeleton className="h-6 w-24 mb-3" />
                                <div className="space-y-4">
                                    <Skeleton className="h-2 w-full" />
                                    <div className="flex justify-between">
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid Skeleton */}
                    <div className="flex-1">
                        <Skeleton className="h-5 w-48 mb-4" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <ProductCardSkeleton key={i} />
                            ))}
                        </div>
                        {/* Pagination Skeleton */}
                        <div className="flex justify-center mt-8">
                            <Skeleton className="h-10 w-64" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="group relative overflow-hidden rounded-lg border bg-card">
            <div className="aspect-square overflow-hidden bg-muted">
                <Skeleton className="h-full w-full" />
            </div>
            <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-3/4" />
                <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </div>
        </div>
    );
}