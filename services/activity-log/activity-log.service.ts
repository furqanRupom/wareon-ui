"use server"

import { serverFetch } from "@/lib/server-fetch"

/**
 * 
 * @param queryString 
 * {limit,entity}
 */
export async function getActivityLogs(queryString?: string) {
    try {
        const response = await serverFetch.get(`/activity-logs${queryString ? `?${queryString}` : ""}`,{
            next: {
                tags: [
                    'activity-logs'
                ],
                revalidate: 180
            }
        })
    } catch (error) {

    }
}