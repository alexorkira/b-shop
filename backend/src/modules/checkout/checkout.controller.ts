import { Body, Controller, Post } from "@nestjs/common";
import { CheckoutService } from "./checkout.service";
import BasketDto from "./dto/basket.dto";
import CheckoutOutputDto from "./dto/checkout.output.dto";

@Controller("checkout")
export class CheckoutController {
  constructor(private readonly service: CheckoutService) {}

  @Post()
  async pushBasket(@Body() dto: BasketDto): Promise<CheckoutOutputDto> {
    return await this.service.checkout(dto.list);
  }
}
