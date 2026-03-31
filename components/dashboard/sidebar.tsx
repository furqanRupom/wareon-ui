// components/dashboard/sidebar.tsx
import Link from "next/link";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Tag,
    Settings,
    LogOut,
    BarChart3,
    Store,
} from "lucide-react";

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    roles?: string[];
}

const navItems: NavItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
        label: "Products",
        href: "/dashboard/products",
        icon: <Package className="h-5 w-5" />,
    },
    {
        label: "Orders",
        href: "/dashboard/orders",
        icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
        label: "Customers",
        href: "/dashboard/customers",
        icon: <Users className="h-5 w-5" />,
    },
    {
        label: "Categories",
        href: "/dashboard/categories",
        icon: <Tag className="h-5 w-5" />,
    },
    {
        label: "Analytics",
        href: "/dashboard/analytics",
        icon: <BarChart3 className="h-5 w-5" />,
    },
    {
        label: "Store Settings",
        href: "/dashboard/settings",
        icon: <Store className="h-5 w-5" />,
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: <Settings className="h-5 w-5" />,
    },
];

export default function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border">
            <div className="flex h-full flex-col">
                {/* Logo */}
                <div className="flex h-16 items-center border-b border-border px-6">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary">WAREON.</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
                                >
                                    {item.icon}
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="border-t border-border p-4">
                    <Link
                        href="/"
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="text-sm font-medium">Back to Store</span>
                    </Link>
                </div>
            </div>
        </aside>
    );
}