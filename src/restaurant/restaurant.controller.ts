import { Body, Controller,Delete,Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards,UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { restaurantServices } from './restaurant.service';
import { restaurant } from './schemas/restaurant.schema';
import { addRestaurantDto } from './dto/add-restaurant.dto';
import { updateRestaurantDto } from './dto/update-restaurant.dto';
import {Query as ExpressQuery} from 'express-serve-static-core'
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ImageService } from 'src/image/image.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/current-user.decerator';
import { user, userRoles } from 'src/auth/schemas/user.schema';
import { RolesGuard } from 'src/auth/gurads/roles.gurad';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('Restaurant')
export class RestaurantController {
    constructor(private restaurantService:restaurantServices
        ,private readonly cloudService:CloudinaryService,
        private readonly imageService:ImageService
    ){}

    
    @Get('/All') 
    @UseGuards(AuthGuard('jwt'))
    async getAllRestraunts(@Query()query:ExpressQuery,/*@CurrentUser() user :user*/
):Promise<restaurant[]>{
       // req.user='dafs'
        return this.restaurantService.findAll(query)
    }




























   @Post('/Add')
   @UseGuards(AuthGuard('jwt'),RolesGuard)
   @Roles(userRoles.ADMIN)//now you say to the meta data iam admin
   @UseInterceptors(FileInterceptor('images'))
  async createRestaurant(@Body() restaurantDto: addRestaurantDto,
  @UploadedFile() images : Express.Multer.File)
   {
    return this.restaurantService.createRestaurant(restaurantDto, images);
   }



   











    @UseGuards(AuthGuard())
    @Get(':id')
    async getRestaurant(
        @Param('id') id:string,
    ):Promise<restaurant>{
        return this.restaurantService.getRestaurnt(id)
    }

    @UseGuards(AuthGuard())
    @Roles(userRoles.ADMIN)
    @UseGuards(RolesGuard)
    @Put('/:id')
    async updateRestaurant(
        @Param('id') id:string,
        @Body() Restaurant:updateRestaurantDto
    ):Promise<restaurant>{
        await this.restaurantService.getRestaurnt(id)
        return this.restaurantService.updateRestaurant(id,Restaurant)
    }
    @UseGuards(AuthGuard())
    @Roles(userRoles.ADMIN)
    @UseGuards(RolesGuard)
    @Delete('/:id')
    async deleteRestaurant(@Param('id') id:string):Promise<{deleted:Boolean}>{
        await this.restaurantService.getRestaurnt(id)
        const deletedRestaurant=await this.restaurantService.deleteRestaurant(id)
        if(deletedRestaurant){
            return {
                deleted : true
            }
        }
        return {
            deleted:false
        }
    }
}
