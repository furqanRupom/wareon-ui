import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";

import DashboardNavbarContent from "./dasboardNavbarContent";
import { getDefaultDashboardRoute } from "@/lib/auth-util";
import { getNavItemsByRole } from "@/lib/navitems.config";
import { getActivityLogs } from "@/services/activity-log/activity-log.service";
const DashboardNavbar = async () => {
    const userInfo = (await getUserInfo()) as UserInfo;
    const navItems =  getNavItemsByRole(userInfo.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo.role);
    const activityLogs = await getActivityLogs('')

    return (
        <DashboardNavbarContent
            userInfo={userInfo}
            navItems={navItems}
            dashboardHome={dashboardHome}
            activityLogs={activityLogs?.data || []}
        />
    );
};

export default DashboardNavbar;
