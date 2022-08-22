import { Product } from "./Product";

export interface CheckoutProduct extends Product {
    nbProducts: number;
    total: number;
    discount?: number;
    nbItemsForDiscount?: number;
    nbDiscounts?: number;
    discountDescription?: string;
}