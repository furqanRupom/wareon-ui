"use server"
import { serverFetch } from "@/lib/server-fetch"

/**
 * GET /dashboard/stats
 * Returns ordersToday, pendingOrders, completedOrders, revenueToday,
 * lowStockCount, totalProducts, outOfStockCount
 */
export async function getDashboardStats() {
    try {
        const response = await serverFetch.get(`/dashboard/stats`, {
            next: {
                tags: ['dashboard-stats'],
                revalidate: 60
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

/**
 * GET /dashboard/product-summary
 * Top 20 products sorted by lowest stock first.
 */
export async function getProductSummary() {
    try {
        const response = await serverFetch.get(`/dashboard/product-summary`, {
            next: {
                tags: ['dashboard-product-summary'],
                revalidate: 60
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

/**
 * GET /dashboard/charts/revenue-trend
 * @param queryString {days}
 */
export async function getRevenueTrend(queryString?: string) {
    try {
        const response = await serverFetch.get(`/dashboard/charts/revenue-trend${queryString ? `?${queryString}` : ""}`, {
            next: {
                tags: ['dashboard-revenue-trend'],
                revalidate: 60
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

/**
 * GET /dashboard/charts/order-status
 * Count of orders grouped by status.
 */
export async function getOrderStatusBreakdown() {
    try {
        const response = await serverFetch.get(`/dashboard/charts/order-status`, {
            next: {
                tags: ['dashboard-order-status'],
                revalidate: 60
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

/**
 * GET /dashboard/charts/top-products
 * @param queryString {limit,days}
 */
export async function getTopSellingProducts(queryString?: string) {
    try {
        const response = await serverFetch.get(`/dashboard/charts/top-products${queryString ? `?${queryString}` : ""}`, {
            next: {
                tags: ['dashboard-top-products'],
                revalidate: 60
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

/**
 * GET /dashboard/charts/stock-by-category
 * Total stock and product count grouped by category.
 */
export async function getStockByCategory() {
    try {
        const response = await serverFetch.get(`/dashboard/charts/stock-by-category`, {
            next: {
                tags: ['dashboard-stock-by-category'],
                revalidate: 60
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

/**
 * GET /dashboard/charts/restock-priority
 * Count of restock queue items grouped by priority (High / Medium / Low).
 */
export async function getRestockQueueByPriority() {
    try {
        const response = await serverFetch.get(`/dashboard/charts/restock-priority`, {
            next: {
                tags: ['dashboard-restock-priority'],
                revalidate: 60
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

/**
 * GET /dashboard/charts/weekly-comparison
 * Revenue & order count for this week vs last week, with % change.
 */
export async function getWeeklyComparison() {
    try {
        const response = await serverFetch.get(`/dashboard/charts/weekly-comparison`, {
            next: {
                tags: ['dashboard-weekly-comparison'],
                revalidate: 60
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


/**
 * GET /dashboard/recent-orders
 * @param queryString {limit}
 */
export async function getRecentOrders(queryString?: string) {
    try {
        const response = await serverFetch.get(`/dashboard/recent-orders${queryString ? `?${queryString}` : ""}`, {
            next: {
                tags: ['dashboard-recent-orders'],
                revalidate: 30
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
