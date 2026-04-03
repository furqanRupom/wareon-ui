import { getUserInfo } from "@/services/auth/getUserInfo";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import { getDefaultDashboardRoute } from "@/lib/auth-util";
import { getNavItemsByRole } from "@/lib/navitems.config";
import DashboardSidebarContent from "./dashboardSidebarContent";

const DashboardSidebar = async () => {
    const userInfo = (await getUserInfo()) as UserInfo;

    const navItems: NavSection[] =  getNavItemsByRole(userInfo.role);
    const dashboardHome = getDefaultDashboardRoute(userInfo.role);

    return (
        <DashboardSidebarContent
            userInfo={userInfo}
            navItems={navItems}
            dashboardHome={dashboardHome}
        />
    );
};

export default DashboardSidebar;
