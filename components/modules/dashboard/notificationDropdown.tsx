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
import { Bell, Calendar, CheckCircle, Clock, UserPlus } from "lucide-react";

interface Notification {
    id: string;
    type: "appointment" | "schedule" | "system" | "user";
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
}

// Hardcoded notifications for now
const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: "1",
        type: "appointment",
        title: "New Appointment Booked",
        message: "John Doe has booked an appointment for tomorrow at 10:00 AM",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
    },
    {
        id: "2",
        type: "appointment",
        title: "Appointment Reminder",
        message: "You have an appointment with Dr. Sarah Johnson in 1 hour",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
    },
    {
        id: "3",
        type: "schedule",
        title: "Schedule Updated",
        message: "Your schedule for next week has been updated",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        read: true,
    },
    {
        id: "4",
        type: "user",
        title: "New Patient Registration",
        message: "Emily Wilson has registered and is now in your patient list",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
    },
    {
        id: "5",
        type: "system",
        title: "System Maintenance",
        message: "Scheduled maintenance on Sunday 2:00 AM - 4:00 AM",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        read: true,
    },
];


const getNotificationIcon = (type: IActivityLog["action"]) => {
    switch (type) {
        case "ORDER_CREATED":
            return <Calendar className="h-4 w-4 text-blue-600" />;
        case "ORDER_CONFIRMED":
            return <Clock className="h-4 w-4 text-amber-600" />;
        case "ORDER_SHIPPED":
            return <UserPlus className="h-4 w-4 text-green-600" />;
        case "ORDER_DELIVERED":
            return <CheckCircle className="h-4 w-4 text-purple-600" />;
        case "ORDER_CANCELLED":
            return <CheckCircle className="h-4 w-4 text-rose-600" />;
        default:
            return <Bell className="h-4 w-4" />;
    }
};

export default function NotificationDropdown({activityLogs}:{activityLogs?:any[]}) {
    console.log(activityLogs?.length) // 2


    return (
        <DropdownMenu>
          
            <DropdownMenuContent align="end" className="w-80">
               
                <ScrollArea className="h-100">
                    {!activityLogs || activityLogs.length === 0 ? (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            No logs yet
                        </div>
                    ) : (
                        activityLogs?.map((notification) => (
                            <DropdownMenuItem
                                key={notification._id}
                                className={`flex items-start gap-3 p-3 cursor-pointer" : ""
                                    }`}
                            >
                                <div className="mt-0.5">
                                    {getNotificationIcon(notification.action)}
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className="text-sm font-medium leading-none">
                                            {notification.summary}
                                        </p>
                                     
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                       {notification.createdAt}
                                    </p>
                                </div>
                            </DropdownMenuItem>
                        ))
                    )}
                </ScrollArea>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center justify-center text-sm font-medium text-primary cursor-pointer">
                    View all logs
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
