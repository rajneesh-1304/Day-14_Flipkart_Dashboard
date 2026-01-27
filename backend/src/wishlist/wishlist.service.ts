import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { Products } from 'src/products/product.entity';
import { error } from 'console';

@Injectable()
export class WishlistService {
  constructor(private readonly dataSource: DataSource) {}
  @InjectRepository(Wishlist)
  private readonly wishlistRepo: Repository<Wishlist>;

  @InjectRepository(Products)
  private readonly productRepo: Repository<Products>;

  async addInWishlist(data) {
    const isPresent = this.wishlistRepo.find({where: {productId : data.productId}});
    if(isPresent){
      throw new ConflictException('Item already present');
    }
    const product = await this.wishlistRepo.create({
      userId: data.userId,
      productId: data.productId,
    });

    await this.wishlistRepo.save(product);
    return { message: 'Added in Wishlist' };
  }

  async getWishlist() {
    const data = await this.wishlistRepo.find();
    return data;
  }

  async getWishlistById(id: number) {
    const data = await this.wishlistRepo.find({ where: { userId: id } });
    const productData: any = [];
    for (const d of data) {
      const product = await this.productRepo.findOne({
        where: { id: d.productId },
      });
      if (!product) continue;
      productData.push(product);
    }
    return productData;
  }

  async deleteItem(data) {
    const item = await this.wishlistRepo.findOne({
      where: { productId: data.productId },
    });
    if (!item) {
      throw new NotFoundException('Product not found');
    }
    await this.wishlistRepo.remove(item);
    return { message: 'Product removed From Wishlist' };
  }
}
