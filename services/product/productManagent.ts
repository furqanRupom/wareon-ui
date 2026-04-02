import { serverFetch } from "@/lib/server-fetch";

// crud products, only for admin and manager roles, but get products for all users

/**
 * 
 * @param queryString 
 * @returns 
 * ?search={search by name}
 * ?category={categoryId}
 * ?minPrice={minPrice}&maxPrice={maxPrice}
 * ?limit={limit}&page={page}
 */
export async function getProducts(queryString?: string) {
    try {
        const response = await serverFetch.get(`/product${queryString ? `?${queryString}` : ""}`, {
            next: {
                tags: [
                    "product-list",
                ],
                revalidate: 180
            }
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}