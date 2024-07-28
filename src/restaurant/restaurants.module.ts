import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantController } from './restaurant.controller';
import { restaurantSchema } from './schemas/restaurant.schema';
import { restaurantServices } from './restaurant.service';
import { ImageService } from 'src/image/image.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { imageSchema } from 'src/image/schemas/image.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AuthModule } from 'src/auth/auth.module'; // Import AuthModule
import { AuthMiddleware } from 'src/auth/attach-user';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'restaurant', schema: restaurantSchema }]),
    MongooseModule.forFeature([{ name: 'image', schema: imageSchema }]),
    CloudinaryModule,
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [RestaurantController],
  providers: [restaurantServices, ImageService, CloudinaryService],
})
export class RestaurantsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*'); // Apply middleware to all routes or specify routes
  }
}

