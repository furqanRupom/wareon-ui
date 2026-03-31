// app/dashboard/layout.tsx
import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <Topbar />
            <main className="lg:pl-64 pt-16">
                <div className="container mx-auto p-4 md:p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}