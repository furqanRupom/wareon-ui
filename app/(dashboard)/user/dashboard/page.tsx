import UserDashboardPage from "@/components/modules/user/DashboardCart";

export const metadata = {
    title: "User Dashboard - Wareon",
    description: "Manage your WAREON account, view your orders, and update your profile information in the user dashboard.",
}

const userDashboardPage = () => {
    return (
        <section >
        
            <UserDashboardPage />
        </section>
    );
}
export default userDashboardPage;