import { Injectable, NotFoundException } from '@nestjs/common';
import { UserCreateDto } from './dto/UserCreate.dto';
import { UserUpdateDto } from './dto/UserUpdate.dto';
import { UserRepository } from './repository/user.repository';
import { User } from './user.schema';

@Injectable()
export class UsersService {

  constructor(private userRepository: UserRepository) {}

  async create(userCreateDto: UserCreateDto): Promise<User>
  {
    return await this.userRepository.create(userCreateDto);
  }

  async getAll(): Promise<User[]> 
  {
    return await this.userRepository.findAll();
  }

  getUserById(id: string): Promise<User> 
  {
    let user = this.userRepository.findOne(id)
    if (!user) {
        throw new NotFoundException('Pas trouve')
    }
    return user
  }

  async findOne(email: string): Promise<User> {
    return await this.userRepository.findOne(email);
  }

  async update(id: string, userUpdateDto: UserUpdateDto): Promise<User> {
    return await this.userRepository.findByIdAndUpdate(id, updateUserDto).exec();
  }
}