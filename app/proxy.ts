import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = {
    admin: [
        "/dashboard/admin",
        "/dashboard/admin/handle-managers",
        "/dashboard/admin/add-manager",
        "/dashboard/admin/manage",
        "/dashboard/admin/orders",
        "/dashboard/admin/products",
        "/dashboard/admin/customers",
        "/dashboard/admin/activity-logs",
    ],
    manager: [
        "/dashboard/manager",
        "/dashboard/manager/orders",
        "/dashboard/manager/products",
        "/dashboard/manager/activity-logs",
    ],
    customer: [
        "/dashboard/customer",
        "/dashboard/customer/my-orders",
        "/dashboard/customer/profile",
        "/orders/new",
        "/orders/cancel",
    ],
};

// Public routes (no authentication required)
const publicRoutes = [
    "/",
    "/sign-in",
    "/sign-up",
    "/shop",
    "/brands",
];

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Skip proxy for public routes, static files, API routes, etc.
    if (
        publicRoutes.some((route) => path === route || path.startsWith(route)) ||
        path.startsWith("/api") ||
        path.startsWith("/_next") ||
        path.startsWith("/favicon.ico") ||
        path.startsWith("/images")
    ) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    // No tokens → redirect to login
    if (!accessToken && !refreshToken) {
        const loginUrl = new URL("/sign-in", request.url);
        loginUrl.searchParams.set("callbackUrl", encodeURIComponent(path));
        return NextResponse.redirect(loginUrl);
    }

    // Get user role (from cookie - recommended)
    let userRole = request.cookies.get("userRole")?.value;

    // Fallback: If you decode JWT in future, you can add it here
    // Example:
    // if (!userRole && accessToken) {
    //   try {
    //     const payload = JSON.parse(atob(accessToken.split(".")[1]));
    //     userRole = payload.role || payload.user?.role;
    //   } catch (_) {}
    // }

    if (!userRole) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const isAdminRoute = protectedRoutes.admin.some((route) =>
        path.startsWith(route)
    );
    const isManagerRoute = protectedRoutes.manager.some((route) =>
        path.startsWith(route)
    );
    const isCustomerRoute = protectedRoutes.customer.some((route) =>
        path.startsWith(route)
    );

    // === Role-based Access Control ===

    // Admin can access everything
    if (userRole === "admin") {
        return NextResponse.next();
    }

    // Manager: Can access manager + customer routes? (you can restrict further)
    if (userRole === "manager") {
        if (isAdminRoute) {
            return NextResponse.redirect(new URL("/dashboard/manager", request.url));
        }
        return NextResponse.next();
    }

    // Customer: Only customer routes allowed
    if (userRole === "user") {
        if (isAdminRoute || isManagerRoute) {
            return NextResponse.redirect(new URL("/dashboard/customer", request.url));
        }
        return NextResponse.next();
    }

    // Unknown role → force login
    return NextResponse.redirect(new URL("/sign-in", request.url));
}

// Optional: Configure matcher (highly recommended for performance)
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico, etc.
         */
        "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
    ],
};