import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, Query, Patch, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductService } from './product.service';
import { ProductDefinition } from './product';
import { Querry } from './product.interface';
import { AddProduct } from './addproduct';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Get(':id')
  // findOne(@Param('id') id: string): Products {
  //   return this.productService.findOne(+id);
  // }
  @Get()
  getProducts(@Query() query: Querry) {
    return this.productService.getProducts(query);
  }

  // @Post('addproduct')
  // addProduct(@Body() productData: ProductDefinition) {
  //   console.log('Received Product', productData);
  //   return this.productService.addProduct(productData);
  // }

  @Post('addproduct')
@UseInterceptors(
  FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }),
)
addProduct(
  @Body() productData: ProductDefinition,
  @UploadedFile() file: Express.Multer.File,
) {
  if (file) {
    const host = 'http://localhost:3001';
    productData.image = `${host}/uploads/${file.filename}`;
  }
  return this.productService.addProduct(productData);
}



  @Patch('update/:id')
  updateProduct(@Param() id: number, @Body() productData: AddProduct) {
    return this.productService.updateProduct(id, productData);
  }

}
