// components/dashboard/topbar.tsx
import { Bell, Link, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TopbarProps {
    user?: {
        name: string;
        email: string;
        avatar?: string;
        role?: string;
    };
}

export default function Topbar({ user }: TopbarProps) {
    const defaultUser = {
        name: "John Doe",
        email: "admin@wareon.com",
        avatar: undefined,
        role: "Administrator",
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

                    {/* User Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    {currentUser.avatar && (
                                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                                    )}
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        {currentUser.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {currentUser.name}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {currentUser.email}
                                    </p>
                                    {currentUser.role && (
                                        <p className="text-xs text-primary mt-1">
                                            {currentUser.role}
                                        </p>
                                    )}
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/profile" className="cursor-pointer">
                                    Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/dashboard/settings" className="cursor-pointer">
                                    Settings
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href="/sign-in" className="cursor-pointer text-destructive">
                                    Log out
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}