import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { Currency } from "./currency.enum";

@Entity()
export class Product extends BaseEntity {
  @PrimaryColumn()
  sku: string;

  @Column()
  name: string;

  @Column("nvarchar", { default: "" })
  description: string;

  @Column()
  unitPrice: number;

  @Column("int", { default: Currency.EUR })
  currency: Currency;

  @Column("nvarchar", { default: null })
  media: string;
}
