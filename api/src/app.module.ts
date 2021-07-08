import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_CONNECTION } from './app.properties';
import { ConcertController } from './concert/concert.controller';
import { ConcertModule } from './concert/concert.module';

@Module({
  imports: [
    UsersModule, 
    AuthModule,
    MongooseModule.forRoot(MONGO_CONNECTION),
    ConcertModule
  ],
  controllers: [AppController, ConcertController],
  providers: [AppService],
})
export class AppModule {}
