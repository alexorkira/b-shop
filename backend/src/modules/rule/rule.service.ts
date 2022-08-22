import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductService } from "../product/product.service";
import RuleInputDto from "./dto/rule.input.dto";
import { Rule } from "./rule.entity";

@Injectable()
export class RuleService {
  constructor(
    @InjectRepository(Rule) private readonly repo: Repository<Rule>,
    @Inject(ProductService) private readonly productService: ProductService
  ) {}

  async findAll(): Promise<Array<Rule>> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Rule> {
    return this.repo.findOneByOrFail({ id }).catch(() => {
      throw new HttpException("rule not found", HttpStatus.NOT_FOUND);
    });
  }

  async findByProduct(sku: string): Promise<Rule> {
    return this.repo
      .createQueryBuilder()
      .where({ product: sku })
      .getOneOrFail()
      .catch(() => {
        throw new HttpException("rule not found for the product", HttpStatus.NOT_FOUND);
      });
  }

  async add(dto: RuleInputDto): Promise<Rule> {
    const { sku, ...input } = dto;
    await this.findByProduct(sku)
      .then(() => {
        throw new HttpException(
          "bad request. rule for this product already exist",
          HttpStatus.BAD_REQUEST
        );
      })
      .catch((e) => {
        if (e.status !== HttpStatus.NOT_FOUND) {
          throw e;
        }
      });
    const newRule = this.repo.create(input);
    newRule.product = await this.productService.findBySKU(sku);
    return newRule.save();
  }

  async update(id: string, dto: RuleInputDto): Promise<Rule> {
    const ruleToUpdate = await this.findById(id).catch((e) => {
      if (e.status === HttpStatus.NOT_FOUND) {
        throw new HttpException("bad request. no rule with the id sent", HttpStatus.BAD_REQUEST);
      }
      throw e;
    });
    const { sku, ...input } = dto;
    const product = await this.productService.findBySKU(sku);
    Object.assign(ruleToUpdate, { ...input, product });
    return ruleToUpdate.save();
  }

  async removeById(id: string): Promise<Rule> {
    const ruleToDelete = await this.findById(id).catch((e) => {
      if (e.status === HttpStatus.NOT_FOUND) {
        throw new HttpException("bad request. no rule with the id sent", HttpStatus.BAD_REQUEST);
      }
      throw e;
    });
    return this.repo.remove(ruleToDelete);
  }
}
