export interface IOrderItem {
    productId: string
    quantity: number
}
export interface IOrder {
    customerName: string
    items: IOrderItem[]
    notes?: string
}

export interface IOrderItem {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

export interface IOrders {
    _id: string;
    customerName: string;
    items: IOrderItem[];
    totalPrice: number;
    notes?: string;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    createdBy?: {
        _id: string;
        name: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
}

export interface ICreateOrderPayload {
    customerName: string;
    items: { productId: string; quantity: number }[];
    notes?: string;
    address: string;
    phone: string;
    alternatePhone?: string;
    city?: string;
    landmark?: string;
}
