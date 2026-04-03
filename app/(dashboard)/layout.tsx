// app/dashboard/layout.tsx

import DashboardNavbar from "@/components/modules/dashboard/dashboardNavbar";
import DashboardSidebar from "@/components/modules/dashboard/dashboardSidebar";

export const dynamic = "force-dynamic";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            <DashboardSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <DashboardNavbar />
                <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
                    <div className="">{children}</div>
                </main>
            </div>
        </div>
    );
}