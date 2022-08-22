import { HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import CheckoutProductDto from "../product/dto/checkout-product.dto";
import { Product } from "../product/product.entity";
import { ProductService } from "../product/product.service";
import { RuleService } from "../rule/rule.service";
import CheckoutOutputDto from "./dto/checkout.output.dto";

@Injectable()
export class CheckoutService {
  private readonly logger = new Logger(CheckoutService.name);

  constructor(
    @Inject(ProductService) private readonly productService: ProductService,
    @Inject(RuleService) private readonly ruleService: RuleService
  ) {}

  private async fetchProduct(sku: string) {
    return this.productService.findBySKU(sku);
  }

  private async fetchDiscount(
    product: Product,
    nbProducts: number
  ): Promise<Partial<CheckoutProductDto>> {
    try {
      // Check if the product has a discount
      const { discount, nbItems, description } = await this.ruleService.findByProduct(product.sku);
      const nbDiscounts = Math.floor(nbProducts / nbItems);
      const nFullPrices = nbProducts % nbItems;
      return {
        nbDiscounts,
        discount,
        discountDescription: description,
        nbItemsForDiscount: nbItems,
        total: nbDiscounts * discount + nFullPrices * product.unitPrice,
      };
    } catch (e) {
      // If not, it will be counted as full price
      if (e.status === HttpStatus.NOT_FOUND) {
        return {
          total: nbProducts * product.unitPrice,
        };
      }
    }
  }

  async checkout(basket: Array<string>): Promise<CheckoutOutputDto> {
    let total = 0;
    console.time("checkout");
    const groupedProducts = basket.reduce((groups, sku) => {
      groups[sku] = (groups[sku] ?? 0) + 1;
      return groups;
    }, {});

    const checkoutProducts = await Promise.all(
      Object.keys(groupedProducts).map(async (sku: string) => {
        const nbProducts = groupedProducts[sku];
        const checkoutProduct: CheckoutProductDto = Object.assign({
          sku,
          nbProducts,
          ...(await this.fetchProduct(sku)
            .then(async (product) => ({
              ...product,
              ...(await this.fetchDiscount(product, nbProducts)),
            }))
            .catch(() => this.logger.error(`Unknown product with SKU '${sku}'`))),
        });
        total += checkoutProduct.total ?? 0;
        return checkoutProduct;
      })
    );
    console.timeEnd("checkout");
    return { total, list: checkoutProducts };
  }
}
