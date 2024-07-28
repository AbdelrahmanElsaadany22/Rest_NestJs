import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { review } from './schemas/review.schema';
import { createReviewDto } from './dto/create-review.dto';
import { menu } from 'src/menu/schema/menu.schema';
import { user } from 'src/auth/schemas/user.schema';
import { order } from 'src/order/schemas/order.schema';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel(review.name) private readonly reviewModel: Model<review>
        ,@InjectModel(menu.name) private readonly menuModel:Model<menu>,
        @InjectModel(order.name) private readonly orderModel:Model<order>,
    ) {}
    //add Review(user)
    async createReview(createReviewDto:createReviewDto):Promise<review>{
        const {reviewer,menuItem}=createReviewDto //as id 
        const userOrder=await this.orderModel.find({customer:reviewer.toString()})
        if(!userOrder)
        {
            throw new NotFoundException('User not Founded or may be have no order to make review on it')
        }
        let itemFound = false;
        for (const order of userOrder) {
            itemFound = order.items.some(item => item.item.toString() === menuItem);
            if (itemFound) break;
        }
        // If item is not found in any of the user's orders, throw an error
        if (!itemFound) {
           throw new NotFoundException('Menu item not found in user\'s orders,Please make order on item to can rate it');
         }
       const review=await this.reviewModel.create(createReviewDto)
       return review
    }

    //edit review(user)
    async editReview(createReviewDto:createReviewDto,reviewId:string):Promise<review>{
        const review=await this.reviewModel.findById(reviewId)
        if(!review)
            throw new NotFoundException('Review Not Founded')
        const deletedReview=await this.reviewModel.findByIdAndDelete(reviewId)
        return this.createReview(createReviewDto)
    }

    //delete review(user)
    async deleteReview(reviewId:string):Promise<review>{
        const review=await this.reviewModel.findById(reviewId)
        if(!review)
            throw new NotFoundException('Review Not Founded')
        const deletedReview=await this.reviewModel.findByIdAndDelete(reviewId)
        return deletedReview
    }
}