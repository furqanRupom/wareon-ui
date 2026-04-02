import { Metadata } from "next";

export const metadata:Metadata = {
    title: "Change Password - Wareon",
    description: "Change your WAREON account password to keep your account secure.",
}

const ChangePasswordPage = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Change Password</h1>
            <p>This is where you can change your WAREON account password.</p>
        </div>
    );
}
export default ChangePasswordPage;