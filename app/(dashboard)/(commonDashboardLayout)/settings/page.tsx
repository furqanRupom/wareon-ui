import ChangePasswordForm from "@/components/changePassword";
import DeleteAccount from "@/components/settings/delete-account";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings - Wareon",
  description: "Manage your account settings and security preferences.",
};

export default async function SettingsPage() {
  const user = await getUserInfo();

  return (
    <div className="max-w-3xl mx-auto space-y-8 px-4 py-6">
      {/* Profile Card */}
      <section className="flex items-center gap-4 rounded-lg border bg-card p-6">
        <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center">
          <span className="text-xl">👤</span>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {user?.name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {user?.email} • {user?.role}
          </p>
        </div>
      </section>

      {/* Account Settings */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Account Settings
        </h3>

        <div className="rounded-lg border bg-card">
          <div className="p-5 border-b">
            <h4 className="text-sm font-medium text-foreground">
              Change Password
            </h4>
            <p className="text-xs text-muted-foreground">
              Update your account password for better security.
            </p>
          </div>

          <div className="p-5">
            <ChangePasswordForm />
          </div>
        </div>
      </section>

      {/* Security Info */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Security
        </h3>

        <div className="rounded-lg border bg-card p-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              Two-Factor Authentication
            </p>
            <p className="text-xs text-muted-foreground">
              Add extra security to your account
            </p>
          </div>

          <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
            Enabled
          </span>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Danger Zone
        </h3>

        <DeleteAccount />
      </section>
    </div>
  );
}
