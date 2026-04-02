import { UserRole } from "@/lib/auth-util";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}