import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantsModule } from './restaurant/restaurants.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImageService } from './image/image.service';
import { imageSchema } from './image/schemas/image.schema';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import {ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Ensure .env is loaded
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
    }),
    MongooseModule.forRoot(process.env.DB_STRING),
    CloudinaryModule,
    MongooseModule.forFeature([{ name: 'image', schema: imageSchema }]),
    AuthModule,
    MenuModule,
    RestaurantsModule,
    OrderModule,
    ReviewModule
  ],
  controllers: [AppController],
  providers: [AppService, ImageService],
})
export class AppModule {}
