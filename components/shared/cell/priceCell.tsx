interface PriceCellProps {
    price: number;
    currency?: string;
}

export function PriceCell({ price, currency = "$" }: PriceCellProps) {
    return (
        <div className="flex flex-col">
            <span className="font-medium text-sm">
                {currency}{price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
        </div>
    );
}