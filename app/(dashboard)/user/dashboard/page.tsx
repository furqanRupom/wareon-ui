export const metadata = {
    title: "User Dashboard - Wareon",
    description: "Manage your WAREON account, view your orders, and update your profile information in the user dashboard.",
}

const userDashboardPage = () => {
    return (
        <section className="max-w-7xl mx-auto min-h-svh flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">User Dashboard</h1>
            <p className="text-center mt-4 text-lg">Welcome to your dashboard! Here you can manage your account, view your orders, and update your profile information.</p>
        </section>
    );
}
export default userDashboardPage;