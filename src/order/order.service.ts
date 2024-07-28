import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { order } from './schemas/order.schema';
import { menu } from 'src/menu/schema/menu.schema';
import { CreateOrderDto } from './dto/order.dto';
import { promises } from 'dns';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(order.name) private orderModel: Model<order>,
    @InjectModel(menu.name) private menuModel: Model<menu>,
  ) {}

  //create order(user only)
  async createOrder(createOrderDto: CreateOrderDto, userId: string): Promise<order> {
    const { items } = createOrderDto;

    // Fetch menu items to verify and calculate prices
    const menuItems = await this.menuModel.find({
      '_id': { $in: items.map(item => item.item) }
    }).exec();

    if (menuItems.length !== items.length) {
      throw new NotFoundException('One or more menu items not found');
    }
    let totCost=0
    // Calculate total price and populate items with price
    let totalPrice = 0;
    const populatedItems = items.map(orderItem => {
      const menuItem = menuItems.find(item => (item._id as any).equals(orderItem.item));
      if (!menuItem) {
        throw new NotFoundException(`Menu item with id ${orderItem.item} not found`);
      }
      totalPrice += (menuItem.price as number) * orderItem.quantity;
      totCost+=totalPrice
      return {
        item: orderItem.item,
        quantity: orderItem.quantity,
      };
    });

    const newOrder = new this.orderModel({
      customer: userId,
      items: populatedItems,
      price: totalPrice,
      orderDate: new Date(),
      totalCost:totCost
    });

    return newOrder.save();
  }



//edit order(user only)
async editOrder(orderId:string,createOrderDto: CreateOrderDto,userId:string):Promise<order>{
const Order=await this.orderModel.findById(orderId)
if(!Order){
    throw new NotFoundException('Order Not Founded');
}
const order=await this.orderModel.findByIdAndDelete(orderId)

return this.createOrder(createOrderDto,userId)
}


//cancel order(user only)
async cancelOrder(orderId:string):Promise<order>{
    const Order=await this.orderModel.findById(orderId)
    if(!Order){
        throw new NotFoundException('Order Not Founded');
    }
    const order=await this.orderModel.findByIdAndDelete(orderId)
    
    return order
    }
}