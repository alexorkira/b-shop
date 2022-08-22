import { Product } from "../product.entity";

export default class CheckoutProductDto extends Product {
  total: number;
  nbProducts: number;
  discount?: number;
  nbItemsForDiscount?: number;
  nbDiscounts?: number;
  discountDescription?: string;
}
