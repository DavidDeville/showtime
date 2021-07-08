import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ExtractJwt } from 'passport-jwt';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  private token;
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    this.token = this.authService.login(req.user);
    return this.token;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('test')
  test(@Request() req)
  {
    console.log(req);
    console.log(this.token);
  }
}