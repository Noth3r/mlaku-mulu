import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, TripModule],
})
export class AppModule {}
