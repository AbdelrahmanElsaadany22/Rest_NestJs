import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { image } from './schemas/image.schema';
import { Model, Types } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ImageService {
    constructor(@InjectModel(image.name) private imageModel: Model<image>,private readonly cloudService:CloudinaryService,) {}
    async makeImage(name:string,path:string)
    {
        const image =await this.imageModel.create({name,path})
        return image.save(); 
    }
    async deleteImage(id:string){
        const deletedImage=await this.imageModel.findByIdAndDelete(id)
        await this.cloudService.deleteImageFromCloudinary(deletedImage.name)
    }
}
