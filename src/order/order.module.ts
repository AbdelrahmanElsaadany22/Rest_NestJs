import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { orderSchema } from './schemas/order.schema';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { MenuModule } from 'src/menu/menu.module';
import { MenuService } from 'src/menu/menu.service';
import { MenuController } from 'src/menu/menu.controller';

@Module({
  imports:[
  MenuModule,
  MongooseModule.forFeature([{ name: 'order', schema: orderSchema }]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  AuthModule,],
  controllers: [OrderController],
  providers: [OrderService],
  exports:[OrderModule]
})
export class OrderModule {}
