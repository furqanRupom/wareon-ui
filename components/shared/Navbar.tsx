import { getUserInfo } from "@/services/auth/getUserInfo";
import { getCookie } from "@/services/auth/tokenHandlers";
import Link from "next/link";
import MobileMenu from "./mobileMenu";
import { getDefaultDashboardRoute } from "@/lib/auth-util";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import NavbarAuthButtons from "./navbarAuthButtons";
import NavbarCartButton from "./navbarCartButtons";

const PublicNavbar = async () => {
    const navItems = [
        { href: "/shop", label: "Shop" },
        { href: "/brands", label: "Brands" },
    ];

    const accessToken = await getCookie("accessToken");
    const userInfo = accessToken ? await getUserInfo() : null;
    const dashboardRoute = userInfo
        ? getDefaultDashboardRoute(userInfo.role)
        : "/";

    return (
        <header className="w-full border-b bg-background sticky top-0 z-50">
            <div className="max-w-394 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 gap-4">
                    {/* Mobile Menu */}
                    <MobileMenu
                        navItems={navItems}
                        hasAccessToken={!!accessToken}
                        userInfo={userInfo}
                        dashboardRoute={dashboardRoute}
                    />

                    {/* Logo */}
                    <Link href="/" className="text-2xl font-black tracking-tight text-primary shrink-0">
                        WAREON.
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center space-x-6 lg:pl-20 text-sm font-medium">
                        {navItems.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                prefetch={true}
                                className="text-foreground hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop search + actions */}
                    <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md ml-auto">
                        {/* Search */}
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search for products..."
                                className="pl-9 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary/40 w-full"
                            />
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-2">
                        <NavbarCartButton />
                        <NavbarAuthButtons
                            initialHasToken={!!accessToken}
                            initialUserInfo={userInfo}
                            initialDashboardRoute={dashboardRoute}
                        />
                 </div>
                </div>
            </div>
        </header>
    );
};

export default PublicNavbar;