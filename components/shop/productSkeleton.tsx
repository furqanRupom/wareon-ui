export default function ProductCardSkeleton() {
    return (
        <div className="bg-card rounded-2xl overflow-hidden border border-border/50 animate-pulse">
            {/* Image */}
            <div className="aspect-square bg-muted" />

            {/* Content */}
            <div className="p-4 space-y-3">
                {/* Category */}
                <div className="h-3 w-20 bg-muted rounded-full" />
                {/* Name */}
                <div className="h-5 w-3/4 bg-muted rounded-full" />

                <div className="flex items-center justify-between pt-1">
                    {/* Price */}
                    <div className="h-7 w-16 bg-muted rounded-full" />
                    {/* Button */}
                    <div className="h-8 w-28 bg-muted rounded-full" />
                </div>
            </div>
        </div>
    );
}