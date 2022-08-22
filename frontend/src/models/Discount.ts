export interface Discount {
    id: string,
    description?: string,
    nbItems: number;
    sku: string,
    discount: number
    createdAt: string;
}