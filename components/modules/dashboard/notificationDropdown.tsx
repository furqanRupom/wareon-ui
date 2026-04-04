"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IActivityLog } from "@/types/activity-log.interface";
import { Bell, Calendar, CheckCircle, Clock, Package, Truck, XCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

const getNotificationIcon = (action: string) => {
    switch (action) {
        case "ORDER_CREATED":
            return <Package className="h-4 w-4 text-blue-600" />;
        case "ORDER_CONFIRMED":
            return <CheckCircle className="h-4 w-4 text-green-600" />;
        case "ORDER_SHIPPED":
            return <Truck className="h-4 w-4 text-purple-600" />;
        case "ORDER_DELIVERED":
            return <CheckCircle className="h-4 w-4 text-teal-600" />;
        case "ORDER_CANCELLED":
            return <XCircle className="h-4 w-4 text-red-600" />;
        case "ORDER_ITEMS_UPDATED":
            return <Package className="h-4 w-4 text-amber-600" />;
        default:
            return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
};

const getNotificationTitle = (action: string) => {
    switch (action) {
        case "ORDER_CREATED":
            return "Order Created";
        case "ORDER_CONFIRMED":
            return "Order Confirmed";
        case "ORDER_SHIPPED":
            return "Order Shipped";
        case "ORDER_DELIVERED":
            return "Order Delivered";
        case "ORDER_CANCELLED":
            return "Order Cancelled";
        case "ORDER_ITEMS_UPDATED":
            return "Order Updated";
        default:
            return "Activity Log";
    }
};

export default function NotificationDropdown({ activityLogs }: { activityLogs?: any[] }) {
    console.log(activityLogs)
    const unreadCount = activityLogs?.filter(log => !log.read)?.length || 0;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-80 p-0">
                <DropdownMenuLabel className="px-3 py-2 border-b">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold">Notifications</span>
                        {unreadCount > 0 && (
                            <span className="text-xs text-muted-foreground">
                                {unreadCount} unread
                            </span>
                        )}
                    </div>
                </DropdownMenuLabel>

                <ScrollArea className="h-100">
                    {!activityLogs || activityLogs.length === 0 ? (
                        <div className="p-8 text-center text-sm text-muted-foreground">
                            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            No notifications yet
                        </div>
                    ) : (
                        activityLogs.map((log) => (
                            <DropdownMenuItem
                                key={log._id}
                                className="flex items-start gap-3 p-3 cursor-pointer hover:bg-muted/50 transition-colors"
                            >
                                <div className="mt-0.5">
                                    {getNotificationIcon(log.action)}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className="text-sm font-medium leading-none">
                                            {getNotificationTitle(log.action)}
                                        </p>
                                        {!log.read && (
                                            <span className="h-2 w-2 rounded-full bg-blue-500" />
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground line-clamp-2">
                                        {log.summary}
                                    </p>
                                    <p className="text-xs text-muted-foreground/70">
                                        {formatDistanceToNow(new Date(log.createdAt), { addSuffix: true })}
                                    </p>
                                </div>
                            </DropdownMenuItem>
                        ))
                    )}
                </ScrollArea>

                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center justify-center text-sm font-medium text-primary cursor-pointer py-2">
                    <Eye className="h-3 w-3 mr-1" />
                    View all logs
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}