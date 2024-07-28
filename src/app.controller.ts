import { Controller, Get,Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { ImageService } from './image/image.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly cloudService:CloudinaryService,
    private readonly imageService:ImageService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }



}
