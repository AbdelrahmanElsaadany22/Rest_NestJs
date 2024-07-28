import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { itemCategory, menu } from './schema/menu.schema';
import mongoose, { Types } from 'mongoose';
import { addItemDto } from './dto/add-menu';
import { editItemDto } from './dto/edit-menu';

@Injectable()
export class MenuService {
    constructor(@InjectModel(menu.name) private menuModel:mongoose.Model<menu>){}
    //add item (only admin)
    async addItem(addItemDto:addItemDto):Promise<menu>{
         const addedItem =await this.menuModel.create(addItemDto)
         return addedItem
    }
    
    //get the menu items(user-admin)

    async getMenu(): Promise<Record<itemCategory, menu[]>> {
        // Retrieve all menu items
        const allItems = await this.menuModel.find().exec();

        // Group items by category
        const groupedItems = allItems.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {} as Record<itemCategory, menu[]>);

        // Ensure categories are ordered (e.g., 'drinks', 'desserts', 'chicken')
        const orderedCategories: itemCategory[] = [
            itemCategory.DRINKS,
            itemCategory.DESSERTS,
            itemCategory.CHICKEN,
            itemCategory.STARTERS,
            itemCategory.BEEF,
        ];

        const sortedGroupedItems = orderedCategories.reduce((acc, category) => {
            if (groupedItems[category]) {
                acc[category] = groupedItems[category];
            }
            return acc;
        }, {} as Record<itemCategory, menu[]>);

        return sortedGroupedItems;
    }


    //edit item(only admin)
    async editItem(id: string, editItemDto: editItemDto): Promise<menu> {
        if (!Types.ObjectId.isValid(id)) { 
            throw new BadRequestException('Invalid item ID');
          }
            const editedItem = await this.menuModel.findByIdAndUpdate(id, editItemDto, { new: true, runValidators: true });
            if(!editedItem)
                throw new NotFoundException('Item Not Founded')
            return editedItem;
        }
    
    //delet item(only admin)
    async deleteItem(id:string):Promise<menu>{
        if (!Types.ObjectId.isValid(id)) { 
            throw new BadRequestException('Invalid item ID');
          }
          const deletedItem=await this.menuModel.findByIdAndDelete(id)
          if(!deletedItem)
                throw new NotFoundException('Item Not Founded')
          return deletedItem
    }
}
