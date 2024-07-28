import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { reviewSchema } from './schemas/review.schema';
import { MenuModule } from 'src/menu/menu.module';
import { OrderModule } from 'src/order/order.module';
import { OrderService } from 'src/order/order.service';
import { orderSchema } from 'src/order/schemas/order.schema';

@Module({
  imports: [
    OrderModule,
    MenuModule,
    MongooseModule.forFeature([{ name: 'review', schema: reviewSchema }]),
    MongooseModule.forFeature([{ name: 'order', schema: orderSchema }]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService,OrderService],
  exports: [ReviewService],
})
export class ReviewModule {}
