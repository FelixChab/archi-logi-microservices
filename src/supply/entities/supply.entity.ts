import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SupplyEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  products: string;

  @Column()
  totalPrice: number;
}
