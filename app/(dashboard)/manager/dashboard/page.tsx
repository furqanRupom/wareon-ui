import ManagerDashboardPage from "@/components/modules/manager/DashboardManagerCart";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Dashboard - Manager - WAREON",
    description: "Dashboard for managers to oversee warehouse operations and performance.",
}
export const dashboardManagePage = () => {
    return (
        <div className="p-4">
         <ManagerDashboardPage />
        </div>
    );
}

export default dashboardManagePage;