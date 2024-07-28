import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { createReviewDto } from './dto/create-review.dto';
import { review } from './schemas/review.schema';
import { userRoles } from 'src/auth/schemas/user.schema';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/gurads/roles.gurad';
import { AuthGuard } from '@nestjs/passport';

@Controller('review')
export class ReviewController {
    constructor(private readonly reviewService:ReviewService){}
    //create review
    @Post('add')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(userRoles.USER,userRoles.ADMIN)
    async createReview(@Body()createReviewDto:createReviewDto):Promise<review>{
        return this.reviewService.createReview(createReviewDto)
    }


    //edit review
    @Put('edit/:id')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(userRoles.USER,userRoles.ADMIN)
    async editReview(@Body() createReviewDto:createReviewDto,@Param('id') id:string)
    {
        return this.reviewService.editReview(createReviewDto,id)
    }

    //delete review

    @Put('delete/:id')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(userRoles.USER,userRoles.ADMIN)
    async deleteReview(@Param('id') id:string)
    {
        return this.reviewService.deleteReview(id)
    }

}
