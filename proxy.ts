import { getDefaultDashboardRoute, getRouteOwner, isAuthRoute, UserRole } from '@/lib/auth-util';
import { getUserInfo } from '@/services/auth/getUserInfo';
import { deleteCookie, getCookie } from '@/services/auth/tokenHandlers';
import jwt, { JwtPayload } from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';




// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const accessToken = await getCookie("accessToken") || null;

    let userRole: UserRole | null = null;

    if (accessToken) {
        try {
            const verifiedToken: JwtPayload | string = jwt.verify(
                accessToken,
                process.env.JWT_SECRET as string
            );

            if (typeof verifiedToken !== "string") {
                userRole = verifiedToken.role;
            }

        } catch (error: any) {
            await deleteCookie("accessToken");
            await deleteCookie("refreshToken");

            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
    }

    const routerOwner = getRouteOwner(pathname);


    const isAuth = isAuthRoute(pathname)

    if (accessToken && isAuth) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
    }





    if (routerOwner === null) {
        return NextResponse.next();
    }


    if (!accessToken) {
        const loginUrl = new URL("/sign-in", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }


    if (accessToken) {
        const userInfo = await getUserInfo();

        if (userInfo && !userInfo.needPasswordChange && pathname === '/reset-password') {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url));
        }
    }

    if (routerOwner === "common") {
        return NextResponse.next();
    }

    if (routerOwner === "admin" || routerOwner === "manager" || routerOwner === "user") {
        if (userRole !== routerOwner) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
        }
    }

    return NextResponse.next();
}



export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
}