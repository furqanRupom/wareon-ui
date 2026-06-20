import { getUserInfo } from "@/services/auth/getUserInfo";
import { getCookie } from "@/services/auth/tokenHandlers";
import Link from "next/link";
import MobileMenu from "./mobileMenu";
import { getDefaultDashboardRoute } from "@/lib/auth-util";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import NavbarAuthButtons from "./navbarAuthButtons";
import NavbarCartButton from "./navbarCartButtons";
import { ThemeToggle } from "../ui/theme-toggle";
import { headers } from "next/headers";

const PublicNavbar = async () => {
  const navItems = [
    { href: "/shop", label: "Shop" },
    { href: "/brands", label: "Brands" },
    { href: "/our-story", label: "Our Story" },
    { href: "/faq", label: "Faq" },
    { href: "/privacy-policy", label: "Privacy & Policy" },

  ];

  const accessToken = await getCookie("accessToken");
  const userInfo = accessToken ? await getUserInfo() : null;
  const dashboardRoute = userInfo
    ? getDefaultDashboardRoute(userInfo.role)
    : "/";

  // ✅ Get current pathname from headers (server-side)
  const headersList =await headers();
  const pathname = headersList.get("x-pathname") || "";

  return (
    <header className="w-full sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-white/10 shadow-sm">
      <div className="max-w-394 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          <MobileMenu
            navItems={navItems}
            hasAccessToken={!!accessToken}
            userInfo={userInfo}
            dashboardRoute={dashboardRoute}
          />

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-primary shrink-0"
          >
            WAREON.
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center space-x-6 lg:pl-20 text-sm font-medium">
            {navItems.map((link) => {
              const isActive = pathname.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative transition-all duration-200 ${isActive
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                    }`}
                >
                  {link.label}

                  {/* underline */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-primary transition-all duration-300 ${isActive
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0"
                      }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Search */}
          <div className="hidden lg:flex items-center gap-2 flex-1 max-w-md ml-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for products..."
                className="pl-9 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/10 focus-visible:ring-1 focus-visible:ring-primary/40 w-full"
              />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <ThemeToggle />
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
