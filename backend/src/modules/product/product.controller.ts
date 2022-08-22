import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  async getAll(): Promise<Array<Product>> {
    return await this.service.findAll();
  }

  @Post("add")
  async create(@Body() product: Product): Promise<Product> {
    return this.service.add(product);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: Partial<Product>): Promise<Product> {
    return this.service.update(id, dto);
  }

  @Delete(":sku")
  async deleteById(@Param("sku") sku: string): Promise<Product> {
    return this.service.removeById(sku);
  }
}
