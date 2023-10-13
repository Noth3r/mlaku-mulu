import { ApiProperty } from '@nestjs/swagger';
import { Trip } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class TripEntity implements Trip {
  constructor(partial: Partial<TripEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: string;
  @ApiProperty()
  startDate: Date;
  @ApiProperty()
  destination: string;
  @ApiProperty()
  endDate: Date;
  @ApiProperty()
  price: number;
  @Exclude()
  userId: string;
}
