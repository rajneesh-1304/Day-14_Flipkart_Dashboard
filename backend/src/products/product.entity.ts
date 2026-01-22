import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  rating: number;

  @Column()
  image: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column()
  subcategory:string;
}
