export interface IOrderItem {
    productId: string
    quantity: number
}
export interface IOrder {
    customerName: string
    items: IOrderItem[]
    notes?: string
}