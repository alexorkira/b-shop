import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CheckoutModule } from "./modules/checkout/checkout.module";
import { ProductModule } from "./modules/product/product.module";
import { RuleModule } from "./modules/rule/rule.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "my-shop.db",
      synchronize: true,
      logging: false,
      migrationsRun: false,
      entities: ["dist/modules/**/*.entity.{ts,js}"],
      migrationsTableName: "migration",
      migrations: ["dist/migrations/*.js"],
    }),
    RuleModule,
    ProductModule,
    CheckoutModule,
  ],
})
export class AppModule {}
