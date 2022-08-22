import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private readonly repo: Repository<Product>) {}

  async findAll(): Promise<Array<Product>> {
    return this.repo.find();
  }

  async findBySKU(sku: string): Promise<Product> {
    return this.repo.findOneByOrFail({ sku }).catch(() => {
      throw new HttpException("product not found", HttpStatus.NOT_FOUND);
    });
  }

  async add(product: Product): Promise<Product> {
    try {
      await this.findBySKU(product.sku);
    } catch (e) {
      if (e.status === HttpStatus.NOT_FOUND) {
        const newProduct = this.repo.create(product);
        return newProduct.save();
      }
      throw e;
    }
    throw new HttpException("sku already exists", HttpStatus.CONFLICT);
  }

  async update(id: string, dto: Partial<Product>): Promise<Product> {
    const productToUpdate = await this.findBySKU(id).catch((e) => {
      if (e.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          "bad request. no product with the sku sent",
          HttpStatus.BAD_REQUEST
        );
      }
      throw e;
    });
    Object.assign(productToUpdate, { ...dto });
    return productToUpdate.save();
  }

  async removeById(sku: string): Promise<Product> {
    const productToDelete = await this.findBySKU(sku).catch((e) => {
      if (e.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          "bad request. no product with the sku sent",
          HttpStatus.BAD_REQUEST
        );
      }
      throw e;
    });
    return this.repo.remove(productToDelete);
  }
}
