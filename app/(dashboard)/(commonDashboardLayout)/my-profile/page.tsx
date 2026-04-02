export const metadata = {
    title: "My Profile",
    description: "View and edit your profile information",
};

const MyProfilePage = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <p>This is where you can view and edit your profile information.</p>
        </div>
    );
}
export default MyProfilePage;