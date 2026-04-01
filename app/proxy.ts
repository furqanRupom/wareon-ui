import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


interface IJwtPayload {
    id: string,
    name: string,
    email: string,
    role: "admin" | "manager" | "user",
    iat: number,
    exp: number,
}
const protectedRoutes = {
    "admin": ['/admin/dasboard/*'],
    "manager": ['/manager/dasboard/*'],
    "user": ['/user/dasboard/*'],
};


const publicRoutes = [
    "/",
    "/shop",
    "/brands",
];
const authRoutes = [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
]

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;



    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!accessToken || !refreshToken && !authRoutes.includes(pathname)) {
        return NextResponse.redirect(new URL(`/sign-in?redirect=${pathname}`, request.url));
    }

    let user: IJwtPayload | null = null;
    if (accessToken) {
        try {
            user = jwtDecode(accessToken);
            console.log({ "proxy": user })
        } catch (error) {
            console.error("Error decoding access token:", error);
            return NextResponse.redirect(new URL(`/sign-in?redirect=${pathname}`, request.url));
        }
    }
    if (!user) {
        return NextResponse.redirect(new URL(`/sign-in?redirect=${pathname}`, request.url));
    }

    if (user) {
        const allowedRoutes = protectedRoutes[user.role] || [];
        if (allowedRoutes && allowedRoutes.some(r => pathname.startsWith(r))) {
            return NextResponse.next();
        }
        else {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
    }
    if(user && authRoutes.includes(pathname)){
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/dashboard/:path*",
        "/sign-in",
        "/sign-up",
        "/forgot-password",
    ],
};