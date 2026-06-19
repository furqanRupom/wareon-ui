import { UserRole } from "@/lib/auth-util";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?:string;
    state?:string;
    postalCode?:string;
    addressLine?:string;
    country?:string;
    phone?:string;
    city?:string;
    createdAt: string;
    updatedAt: string;
}
