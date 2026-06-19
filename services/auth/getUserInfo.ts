/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getCookie } from "./tokenHandlers";
import { UserInfo } from "@/types/user.interface";

export const getUserInfo = async (): Promise<UserInfo | any> => {
    try {

        const response = await serverFetch.get("/auth/me", {
            next: { tags: ["user-info"], revalidate: 180 },

        })

        const result = await response.json();

        if (result.success) {
            const accessToken = await getCookie("accessToken");

            if (!accessToken) {
                throw new Error("No access token found");
            }

            const verifiedToken = jwt.decode(accessToken) as JwtPayload;
            if(!verifiedToken){
                throw new Error("Token verification failed")
            }
        }

    


        return result.data;
    } catch (error: any) {
        console.log(error);
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "user",
        };
    }

}
