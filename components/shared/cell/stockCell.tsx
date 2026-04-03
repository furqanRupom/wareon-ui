interface StockCellProps {
    stock: number;
    minThreshold?: number;
}

export function StockCell({ stock, minThreshold }: StockCellProps) {
    const isLowStock = minThreshold && stock <= minThreshold;
    const isOutOfStock = stock === 0;

    let statusColor = "text-green-600";
    let statusText = "In Stock";

    if (isOutOfStock) {
        statusColor = "text-red-600";
        statusText = "Out of Stock";
    } else if (isLowStock) {
        statusColor = "text-yellow-600";
        statusText = "Low Stock";
    }

    return (
        <div className="flex flex-col">
            <span className={`text-sm font-medium ${statusColor}`}>
                {stock} units
            </span>
            {isLowStock && !isOutOfStock && (
                <span className="text-xs text-muted-foreground">
                    Threshold: {minThreshold}
                </span>
            )}
        </div>
    );
}