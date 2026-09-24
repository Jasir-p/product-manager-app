import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductDto } from './dto/product.dto.js';

@Injectable()
export class ProductsService {

    constructor(private readonly prismaService:PrismaService){}

    async findAll(userId:string){
        const products = await this.prismaService.product.findMany({
            where:{
                userId
            }
        })

        return products

    }

    async createProduct(productData:CreateProductDto,userId:string){

        const user = await this.prismaService.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!user){
            throw new NotFoundException('User not found')
        }
            return this.prismaService.product.create({
                data:{...productData,
                userId
                }
            })
    }


    async getProductById(productId:string, userId:string){
        return this.prismaService.product.findFirst({
            where:{
                id:productId,
                userId:userId
            }
        })
    }

    async deleteProductById(productId:string, userId:string){
        return this.prismaService.product.delete({
            where:{
                id:productId,
                userId:userId
            }
        })
    }
}

