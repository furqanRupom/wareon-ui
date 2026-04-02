// components/dashboard/topbar.tsx
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserDropdown from "./userDropdown";
import { UserInfo } from "@/types/user.interface";
import { UserRole } from "@/lib/auth-util";

interface TopbarProps {
    user?: {
        id: string;
        name: string;
        email: string;
        role: UserRole;
        createdAt: string;
        updatedAt: string;
    };
}

export default function Topbar({ user }: TopbarProps) {
    const defaultUser:UserInfo = {
        id: "1",
        name: "John Doe",
        email: "admin@wareon.com",
        role: "admin",
        createdAt: "2023-01-01T00:00:00Z",
        updatedAt: "2023-01-01T00:00:00Z",
    };

    const currentUser = user || defaultUser;

    return (
        <header className="fixed right-0 top-0 z-30 h-16 bg-background border-b border-border lg:left-64">
            <div className="flex h-full items-center justify-between px-4 md:px-6">
                {/* Search */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full pl-9 pr-4 bg-muted/50 border-border"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative rounded-full"
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
                    </Button>

                    {/* User Dropdown - Using the existing component */}
                    <UserDropdown userInfo={currentUser} />
                </div>
            </div>
        </header>
    );
}