import { Controller,Body,Get,Post,Delete,UseGuards, Request,Param } from '@nestjs/common';
import { CreateProductDto } from './dto/product.dto.js';
import { ProductsService } from './products.service.js';
import { JwtAuthGuard } from '../auth/auth/jwt-auth.guard.js';

@Controller('/api/products')
export class ProductsController {

    constructor (private readonly productService:ProductsService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    allProducts(@Request() req:any){
        return this.productService.findAll(req.user.userId)
    }

    @Post('')
    @UseGuards(JwtAuthGuard)
    createProduct(@Body() productData:CreateProductDto,
        @Request()req:any,
    ){
        return this.productService.createProduct(productData,req.user.userId)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getProductById(@Param('id') id:string, @Request() req:any){
        return this.productService.getProductById(id,req.user.userId)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deleteProductById(@Param('id') id:string, @Request() req:any){
        return this.productService.deleteProductById(id,req.user.userId)
    }
}
