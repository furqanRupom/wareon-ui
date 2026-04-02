import { NavItem, NavSection } from "@/types/dashboard.interface";
import { UserRole } from "./auth-util";





// Common nav items for all roles
const commonNavItems: NavItem[] = [
    {
        title: "My Profile",
        href: "/my-profile",
        icon: "User",
        roles: ["admin", "manager", "user"],
    },
    {
        title: "Change Password",
        href: "/change-password",
        icon: "Settings",
        roles: ["admin", "manager", "user"],
    },
];

// Admin specific nav items
const adminNavItems: NavSection[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                href: "/admin/dashboard",
                icon: "LayoutDashboard",
                roles: ["admin"],
            },
        ],
    },
    {
        title: "Management",
        items: [
            {
                title: "User Management",
                href: "/admin/dashboard/user-management",
                icon: "Users",
                roles: ["admin"],
            },
            {
                title: "Manager Management",
                href: "/admin/dashboard/manager-management",
                icon: "Shield",
                roles: ["admin"],
            },
            {
                title: "Product Management",
                href: "/admin/dashboard/product-management",
                icon: "Package",
                roles: ["admin"],
            },
            
            {
                title: "Order Management",
                href: "/admin/dashboard/order-management",
                icon: "ShoppingCart",
                roles: ["admin"],
            },
        ],
    },
    {
        title: "System",
        items: [
            {
                title: "Activity Logs",
                href: "/admin/dashboard/activity-logs",
                icon: "Activity",
                roles: ["admin"],
            },
        ],
    },
];

// Manager specific nav items
const managerNavItems: NavSection[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                href: "/manager/dashboard",
                icon: "LayoutDashboard",
                roles: ["manager"],
            },
        ],
    },
    {
        title: "Management",
        items: [
            {
                title: "Product Management",
                href: "/manager/dashboard/product-management",
                icon: "Package",
                roles: ["manager"],
            },
            {
                title: "Category Management",
                href: "/manager/dashboard/category-management",
                icon: "Tags",
                roles: ["manager"],
            },
            {
                title: "Order Management",
                href: "/manager/dashboard/order-management",
                icon: "ShoppingCart",
                roles: ["manager"],
            },
        ],
    },
    {
        title: "System",
        items: [
            {
                title: "Activity Logs",
                href: "/manager/dashboard/activity-logs",
                icon: "Activity",
                roles: ["manager"],
            },
        ],
    },
];

// User specific nav items
const userNavItems: NavSection[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                href: "/user/dashboard",
                icon: "LayoutDashboard",
                roles: ["user"],
            },
        ],
    },
    {
        title: "Orders",
        items: [
            {
                title: "My Orders",
                href: "/user/dashboard/my-orders",
                icon: "ShoppingBag",
                roles: ["user"],
            },
            {
                title: "Order History",
                href: "/user/dashboard/order-history",
                icon: "History",
                roles: ["user"],
            },
        ],
    },
];

// Get default dashboard route for each role
export const getDefaultDashboardRoute = (role: UserRole): string => {
    switch (role) {
        case "admin":
            return "/admin/dashboard";
        case "manager":
            return "/manager/dashboard";
        case "user":
            return "/user/dashboard";
        default:
            return "/";
    }
};

// Get navigation items by role (synchronous version - no async needed)
export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    // Start with common items as a section
    const commonSection: NavSection = {
        title: "Account",
        items: commonNavItems.filter(item => item.roles.includes(role)),
    };

    switch (role) {
        case "admin":
            return [commonSection, ...adminNavItems];
        case "manager":
            return [commonSection, ...managerNavItems];
        case "user":
            return [commonSection, ...userNavItems];
        default:
            return [commonSection];
    }
};

export const getFlatNavItemsByRole = (role: UserRole): NavItem[] => {
    const sections = getNavItemsByRole(role);
    return sections.flatMap(section => section.items);
};

export const isRouteAccessible = (path: string, role: UserRole): boolean => {
    const allItems = getFlatNavItemsByRole(role);
    return allItems.some(item => path.startsWith(item.href));
};