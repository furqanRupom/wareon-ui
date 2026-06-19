import MyProfile from "@/components/my-profile/myProfile";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Metadata } from "next";

export const metadata:Metadata = {
    title: "My Profile - Wareon",
    description: "View and edit your profile information",
};

const MyProfilePage = async () => {
     const userInfo =  await getUserInfo()
    return <MyProfile userInfo={userInfo} />
}
export default MyProfilePage;
