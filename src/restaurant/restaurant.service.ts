import { BadRequestException, Get, Injectable, NotFoundException, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { restaurant } from "./schemas/restaurant.schema";
import mongoose, { Types } from "mongoose";
import { addRestaurantDto } from "./dto/add-restaurant.dto";
import { updateRestaurantDto } from "./dto/update-restaurant.dto";
import { Query } from "express-serve-static-core";
import { ImageService } from "src/image/image.service";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { image } from "src/image/schemas/image.schema";

@Injectable()
export class restaurantServices{
    constructor(
        @InjectModel(restaurant.name) private restaurantModel:mongoose.Model<restaurant>
        ,private readonly cloudService:CloudinaryService,
        private readonly imageService:ImageService
      ) {}
    
    //get all restaurant
    
    async findAll(query :Query):Promise<restaurant[]>{
        
        const resPerPage=3//how many items will be shown in one page
        const currentPage=Number(query.page)||1 //will get it from user
        const skip=resPerPage*(currentPage-1) // 2 *2 =4
        const keyword=query.category ?{
            category:{
                $regex:query.category,
                $options:'i'//insesetive
            }
        }:{}
        const Restaurants=await this.restaurantModel.find({...keyword}).
        limit(resPerPage).skip(skip)
        return Restaurants
    }






    //create new restaurant
    async createRestaurant(restaurantDto: addRestaurantDto, images: Express.Multer.File): Promise<restaurant> {
        const result = await this.cloudService.uploadFile(images);
        const { public_id, secure_url } = result;
        const createImage: image = await this.imageService.makeImage(public_id, secure_url);
        const data=Object.assign(restaurantDto,{images:createImage._id})
        
        const createdRestaurant = await this.restaurantModel.create(data);
        return createdRestaurant.save();
      }






    //get restaurant by id
    async getRestaurnt(id:string):Promise <restaurant>{
        //if the id is in false form to mongoose (smaller that 24 digit)
        if (!Types.ObjectId.isValid(id)) { 
            throw new BadRequestException('Invalid restaurant ID');
          }
        const singleRestaurant=await this.restaurantModel.findById(id)
        //if the id not founted as it a restaurant
        if(!singleRestaurant)
        {
            throw new NotFoundException('Restaurant Not Founded')
        }
        return singleRestaurant
    }

    //update restaurant by id
    async updateRestaurant(id:string,newRestaurant:updateRestaurantDto):Promise<restaurant>{
        const updatedRestaurant=await this.restaurantModel.findByIdAndUpdate(id,newRestaurant,{new:true,runValidators:true})
        return updatedRestaurant
    }
    
    //delete restaurand by id
    async deleteRestaurant(id:string):Promise<restaurant>{
        const deletedRestaurant=await this.restaurantModel.findByIdAndDelete(id)
        await this.imageService.deleteImage(deletedRestaurant.images.toString())
        return deletedRestaurant
    }




}