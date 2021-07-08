import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/UserCreate.dto';
import { User } from './user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    /*@Get()
    getAllUser()
    {
        return this.usersService.getAllUsers();
    }*/

    @Get('/:id')
    getEmployeeById(@Param('id') id: string): Promise<User> {
        console.log(id);
        return this.usersService.getUserById(id)
    }

    @Post()
    createUser(@Body() userCreateDto: UserCreateDto) : Promise<User>
    {
        return this.usersService.create(userCreateDto);
    }
}