import { Module } from '@nestjs/common';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  controllers: [TripController],
  providers: [TripService],
  imports: [PrismaModule],
})
export class TripModule {}
