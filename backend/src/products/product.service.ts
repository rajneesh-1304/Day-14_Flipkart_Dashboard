import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Products } from './product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly dataSource: DataSource) {}

  async addProduct(prodData) {
    const prodRepo = this.dataSource.getRepository(Products);
    const prod = prodRepo.create({
      title: prodData.title,
      description: prodData.description,
      price: prodData.price,
      rating: prodData.rating,
      image: prodData.image,
      category: prodData.category,
      subcategory:prodData.subcategory
    });

    await prodRepo.save(prod);
    return { message: 'Product added successfully' };
  }

  async getAll() {
    const prodRepo = this.dataSource.getRepository(Products);
    return await prodRepo.find();
  }
  // findAll(): Products[] {
  //   return this.products;
  // }

  // findOne(id: number): Products {
  //   const product = this.products.find((p) => p.id === id);
  //   if (!product) {
  //     throw new NotFoundException('Product not found');
  //   }
  //   return product;
  // }

  async getProducts(query: any) {
  const limit = Number(query?.limit) || 10;
  const page = Number(query?.page) || 1;
  const skip = (page - 1) * limit;

  const prodRepo = this.dataSource.getRepository(Products);

  const qb = prodRepo.createQueryBuilder('product');
  if (query.title && query.title.trim() !== '') {
  qb.andWhere('product.title ILIKE :title', { title: `%${query.title}%` });
}

  if (query.category) {
    qb.andWhere('product.category = :category', { category: query.category });
  }

  if (query.subcategory) {
    qb.andWhere('product.subcategory = :subcategory', { subcategory: query.subcategory });
  }

  qb.skip(skip).take(limit);

  const [data, total] = await qb.getManyAndCount();

  return data;
}


  async updateProduct(idd, productData) {
    const id = Number(idd.id);
    console.log(id, 'fdasd', productData);
    if (!id) {
      throw new BadRequestException('Id is not present');
    }
    if (productData === null) {
      throw new BadRequestException('User Does Not Entered Data');
    }
    const prodRepo = this.dataSource.getRepository(Products);
    const existProduct = await prodRepo.findOne({ where: { id } });

    if (!existProduct) throw new ConflictException('Product does not exist.');
    await prodRepo.update(idd, productData);
    return { message: 'Product updated successfully!' };
  }
}
