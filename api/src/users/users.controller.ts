import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  NotAcceptableException,
} from '@nestjs/common';
import { UserCreateDto } from './dto/UserCreate.dto';
import { UserUpdateDto } from './dto/UserUpdate.dto';
import { User } from './user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUser() {
    console.log(this);
    return this.usersService.getAll();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() userCreateDto: UserCreateDto): Promise<User> {
    return this.usersService.create(userCreateDto);
  }

  @Put('/:id')
  updateUser(@Param('id') id: string, @Body() userUpdateDto: UserUpdateDto): Promise<User> {
      userUpdateDto.id = id
      return this.usersService.updateEmployee(userUpdateDto)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}
