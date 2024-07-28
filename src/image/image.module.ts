import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { imageSchema } from './schemas/image.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:'image',schema:imageSchema}
    ])
  ],
  providers: [ImageService]
})
export class ImageModule {}
