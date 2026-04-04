"use server"

import { serverFetch } from "@/lib/server-fetch"

/**
 * 
 * @param queryString 
 * {limit,entity}
 */
export async function getActivityLogs(queryString?: string) {
    try {
        const response = await serverFetch.get(`/activity-logs${queryString ? `?${queryString}` : ""}`, {
            next: {
                tags: [
                    'activity-logs'
                ],
                revalidate: 180
            }
        })
        const result = await response.json()
        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}