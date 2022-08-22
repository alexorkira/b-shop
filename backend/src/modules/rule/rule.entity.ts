import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Product } from "../product/product.entity";

@Entity()
export class Rule extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nbItems: number;

  @Column()
  discount: number;

  @Column("nvarchar", { default: "" })
  description: string;

  // Could be useful for making auto expiring discount
  @CreateDateColumn({ type: "datetime" })
  createdAt: Date;

  @OneToOne(() => Product, { eager: true })
  @JoinColumn()
  product: Product;
}
