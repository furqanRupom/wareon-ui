export type UserRole = "admin" | "manager" | "user";


export type RouteConfig = {
    exact: string[],
    patterns: RegExp[],
}

export const authRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/settings", "/change-password", "/reset-password"],
    patterns: [], 
}

export const managerProtectedRoutes: RouteConfig = {
    patterns: [/^\/manager/], 
    exact: [], 
}

export const adminProtectedRoutes: RouteConfig = {
    patterns: [/^\/admin/],
    exact: [],
}

export const userProtectedRoutes: RouteConfig = {
    patterns: [/^\/dashboard/],
    exact: [], 
}

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((route: string) => route === pathname);
}

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.patterns.some((pattern: RegExp) => pattern.test(pathname))
}

export const getRouteOwner = (pathname: string): "admin" | "manager" | "user" | "common" | null => {
    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return "admin";
    }
    if (isRouteMatches(pathname, managerProtectedRoutes)) {
        return "manager";
    }
    if (isRouteMatches(pathname, userProtectedRoutes)) {
        return "user";
    }
    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "common";
    }
    return null;
}

export const getDefaultDashboardRoute = (role: UserRole): string => {
    if (role === "admin") {
        return "/admin/dashboard";
    }
    if (role === "manager") {
        return "/manager/dashboard";
    }
    if (role === "user") {
        return "/user/dashboard";
    }
    return "/";
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole): boolean => {
    const routeOwner = getRouteOwner(redirectPath);

    if (routeOwner === null || routeOwner === "common") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}