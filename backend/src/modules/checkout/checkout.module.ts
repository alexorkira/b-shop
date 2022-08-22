import { Module } from "@nestjs/common";
import { ProductModule } from "../product/product.module";
import { RuleModule } from "../rule/rule.module";
import { CheckoutController } from "./checkout.controller";
import { CheckoutService } from "./checkout.service";

@Module({
  imports: [ProductModule, RuleModule],
  providers: [CheckoutService],
  controllers: [CheckoutController],
  exports: [CheckoutService],
})
export class CheckoutModule {}
