import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { stringify } from 'querystring';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
      private usersService: UsersService,
      private jwtService : JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any)
  {
      const payload = { email: user._doc.email, sub: user._doc.password };
      return {
          access_token: this.jwtService.sign(payload)
      }
  }
}