import { HttpException, HttpStatus } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { ProductService } from "../product/product.service";
import { RuleService } from "../rule/rule.service";
import { CheckoutService } from "./checkout.service";

class MockProductService {
  static findBySKU(sku: string) {
    if (sku === "A") {
      return { sku, unitPrice: 50 };
    }
    if (sku === "B") {
      return { sku, unitPrice: 30 };
    }
  }
}

class MockRuleService {
  static findByProduct(sku: string) {
    if (sku === "A") {
      return { discount: 150, nbItems: 3 };
    }
    throw new HttpException(`No discount for ${sku}`, HttpStatus.NOT_FOUND);
  }
}

describe("Checkout Service", () => {
  let service: CheckoutService;

  beforeAll(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutService,
        {
          provide: ProductService,
          useValue: MockProductService,
        },
        {
          provide: RuleService,
          useValue: MockRuleService,
        },
      ],
    }).compile();

    service = testModule.get<CheckoutService>(CheckoutService);
  });

  it("Service should be created", () => {
    expect(service).toBeDefined();
  });

  describe("checkout", () => {
    it("Discount for A 3 x 150 instead of 50 x unit", async () => {
      const expectedTotal = 150;
      const result = await service.checkout(["A", "A", "B", "A"]);
      expect(result.total).toEqual(expectedTotal + 30);
      // Partial total for only A products
      expect(result.list[0].total).toEqual(expectedTotal);
    });

    it("Buy products without discount applied", async () => {
      const result = await service.checkout(["A", "A"]);
      expect(result.total).toEqual(2 * 50);
    });
  });
});
