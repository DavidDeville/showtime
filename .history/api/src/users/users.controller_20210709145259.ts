import { Body, Controller, Get, Param, Post, Put, Delete, NotAcceptableException} from '@nestjs/common';
import { UserCreateDto } from './dto/UserCreate.dto';
import { UserUpdateDto } from './dto/UserUpdate.dto';
import { User } from './user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {


    user : User
    constructor(private readonly usersService: UsersService) {}

    @Get()
    getAllUser()
    {
        console.log(this.user)
        return this.usersService.getAll();
    }

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

    @Put(':id')
    async update(@Param('id') id: string, @Body() userUpdateDto: UserUpdateDto) {
      return await this.usersService.update(id, userUpdateDto);
    }

        @Delete(':id')
        async delete(@Param('id') id: string) {
        if (this.user.role === 'admin') {
        return await this.usersService.delete(id);
        } else {
            throw new NotAcceptableException('Non Authorisé')
        }
    }
}