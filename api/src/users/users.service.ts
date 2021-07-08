import { Injectable, NotFoundException } from '@nestjs/common';
import { UserCreateDto } from './dto/UserCreate.dto';
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

  async findOne(username: string): Promise<User> {
    return await this.userRepository.findOne(username);
  }
}