import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Dashboard - Manager - WAREON",
    description: "Dashboard for managers to oversee warehouse operations and performance.",
}
export const dashboardManagePage = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>
            <p>Welcome to the Manager Dashboard. Here you can oversee warehouse operations and performance.</p>
            {/* Add more dashboard components and features here */}
        </div>
    );
}

export default dashboardManagePage;