import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTripDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  destination: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;
}
