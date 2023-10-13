import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TripService {
  constructor(private prisma: PrismaService) {}

  create(createTripDto: CreateTripDto) {
    const { userId, startDate, endDate, ...rest } = createTripDto;

    if (startDate > endDate) {
      throw new BadRequestException('Start date must be before end date');
    }

    return this.prisma.trip.create({
      data: {
        ...rest,
        startDate,
        endDate,
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  findByUser(userId: string) {
    return this.prisma.trip.findMany({
      where: {
        userId,
      },
    });
  }

  findAll(query: UpdateTripDto) {
    const { startDate, endDate, destination } = query;

    const where = {} as any;

    if (startDate) where.startDate = { gte: new Date(startDate) };
    if (endDate) where.endDate = { lte: new Date(endDate) };
    if (destination) where.destination = { contains: destination };

    return this.prisma.trip.findMany({
      where,
    });
  }

  findOne(id: string) {
    return this.prisma.trip.findUnique({ where: { id } });
  }

  update(id: string, updateTripDto: UpdateTripDto) {
    return this.prisma.trip.update({
      where: { id },
      data: updateTripDto,
    });
  }

  remove(id: string) {
    return this.prisma.trip.delete({ where: { id } });
  }
}
