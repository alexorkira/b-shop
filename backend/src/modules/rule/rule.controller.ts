import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import * as RuleDto from "./dto/rule.dto";
import { Rule } from "./rule.entity";
import { RuleService } from "./rule.service";

const daoToDto = (rule: Rule): RuleDto.Output => {
  const { id, nbItems, discount, description, createdAt } = rule;
  return {
    id,
    discount,
    nbItems,
    description,
    createdAt: createdAt.toISOString(),
    sku: rule.product.sku,
  };
};

@Controller("rules")
export class RuleController {
  constructor(private readonly service: RuleService) {}

  @Get()
  async getAll(): Promise<Array<RuleDto.Output>> {
    return (await this.service.findAll()).map((rule: Rule) => daoToDto(rule));
  }

  @Post("add")
  async create(@Body() dto: RuleDto.Input): Promise<RuleDto.Output> {
    return daoToDto(await this.service.add(dto));
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() dto: RuleDto.Input): Promise<RuleDto.Output> {
    return daoToDto(await this.service.update(id, dto));
  }

  @Delete(":id")
  async deleteById(@Param("id") id: string): Promise<RuleDto.Output> {
    return daoToDto(await this.service.removeById(id));
  }
}
