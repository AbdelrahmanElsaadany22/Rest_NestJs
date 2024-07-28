import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { menuSchema } from './schema/menu.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthMiddleware } from 'src/auth/attach-user';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'menu', schema: menuSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
  ],
  controllers: [MenuController],  
  providers: [MenuService, JwtService, AuthMiddleware],  
  exports:[MongooseModule]
})
export class MenuModule{}