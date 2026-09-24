import { IsInt,IsNotEmpty, IsNumber,min,Min } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name:string

    @IsNotEmpty()
    category:string

    @IsInt()
    @Min(0)
    quantity:number

    @IsNumber()
    @Min(0)
    price:number

}