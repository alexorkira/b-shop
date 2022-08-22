import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductModule } from "../product/product.module";
import { RuleController } from "./rule.controller";
import { Rule } from "./rule.entity";
import { RuleService } from "./rule.service";

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([Rule])],
  providers: [RuleService],
  controllers: [RuleController],
  exports: [RuleService],
})
export class RuleModule {}
