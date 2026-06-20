import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
}

function getInitials(name?: string) {
    if (!name) return "?";
    const parts = name.trim().split(" ");
    return parts.length === 1
        ? parts[0].slice(0, 2).toUpperCase()
        : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function WelcomeCard({ name }: { name?: string }) {
    const today = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });

    return (
        <Card className="rounded-2xl shadow-sm p-5 flex flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium text-base shrink-0">
                    {getInitials(name)}
                </div>
                <div>
                    <p className="font-medium text-lg">
                        {getGreeting()}, {name ?? "there"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                        Here&apos;s what&apos;s happening with your orders today
                    </p>
                </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-muted px-3.5 py-2 rounded-lg shrink-0">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{today}</span>
            </div>
        </Card>
    );
}
