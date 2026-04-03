"use client";

import { UserInfo } from "@/types/user.interface";
import { LayoutDashboard, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuthToken } from "@/hooks/useAuthTokens";
import UserDropdown from "../modules/dashboard/userDropdown";

interface NavbarAuthButtonsProps {
    initialHasToken: boolean;
    initialUserInfo: UserInfo | null;
    initialDashboardRoute: string;
}

export default function NavbarAuthButtons({
    initialHasToken,
    initialUserInfo,
    initialDashboardRoute,
}: NavbarAuthButtonsProps) {
    // Detect client-side auth state changes on navigation
    const clientHasToken = useAuthToken();

    // Use client token state if available, otherwise fall back to server state
    const hasToken = clientHasToken || initialHasToken;
    const userInfo = hasToken ? initialUserInfo : null;
    const dashboardRoute = initialDashboardRoute;

    if (hasToken && userInfo) {
        return (
            <>
                <Link href={dashboardRoute}>
                    <Button variant="outline" className="gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Button>
                </Link>
                <UserDropdown userInfo={userInfo} />
            </>
        );
    }

    return (
        <Button
            variant="outline"
            className="flex-1 gap-2 hover:text-primary hover:border-primary"
            asChild
        >
            <Link href="/sign-in">
                <User className="w-5 h-5" />
                Sign In
            </Link>
        </Button>
    );
}