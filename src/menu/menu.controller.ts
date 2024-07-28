import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { addItemDto } from './dto/add-menu';
import { itemCategory, menu } from './schema/menu.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/gurads/roles.gurad';
import { userRoles } from 'src/auth/schemas/user.schema';
import { promises } from 'dns';
import { editItemDto } from './dto/edit-menu';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService:MenuService){}
    

    //add item (only admin)
    @Post('add')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(userRoles.ADMIN)//now you say to the meta data iam admin
    async addItemToMenu(@Body() addItemDto:addItemDto):Promise<menu>{
        const addedItem=await this.menuService.addItem(addItemDto)
        return addedItem
    }



    //show all items orders by category 
    @Get('show')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(userRoles.ADMIN,userRoles.USER)
    async showMenu():Promise<Record<itemCategory, menu[]>>{
        return await this.menuService.getMenu()
    }


    //edit item (only admin)
    @Put('edit/:id')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(userRoles.ADMIN)
    async editItem(@Param('id') id:string,@Body()editItemDto:editItemDto):Promise<menu>{
        return await this.menuService.editItem(id, editItemDto);
    }


    //edit item (only admin)
    @Delete('delete/:id')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles(userRoles.ADMIN)
    async deleteItem(@Param('id') id:string):Promise<menu>{
        return await this.menuService.deleteItem(id)
    }
}
