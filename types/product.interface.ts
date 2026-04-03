export interface IProduct {
    _id?: string;
    name: string;
    category: string
    price?: number;
    stock?: number;
    productUrl: string[];
    status: 'ACTIVE' | 'INACTIVE'
    minStockThreshold?: number
    sku?: string
    createdAt: string;
    updatedAt: string;
}


export interface IProducts {
    _id?: string;
    name: string;
    category: ICategory
    price?: number;
    stock?: number;
    productUrl: string[];
    status: 'ACTIVE' | 'INACTIVE'
    minStockThreshold?: number
    sku?: string
    createdAt: string;
    updatedAt: string;
}
export interface ICategory {
    _id: string;
    name: string;
    slug: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
