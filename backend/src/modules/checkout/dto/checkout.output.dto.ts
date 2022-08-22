import CheckoutProductDto from "../../product/dto/checkout-product.dto";

export default interface CheckoutOutputDto {
  total: number;
  list: Array<CheckoutProductDto>;
}
