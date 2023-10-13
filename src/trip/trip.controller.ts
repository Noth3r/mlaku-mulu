import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { LoginGuard } from 'src/auth/guard/login/login.guard';
import { AdminGuard } from 'src/auth/guard/admin/admin.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TripEntity } from './entities/trip.entity';

@Controller('trip')
@ApiTags('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @UseGuards(LoginGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TripEntity })
  async create(@Body() createTripDto: CreateTripDto) {
    return new TripEntity(await this.tripService.create(createTripDto));
  }

  @Get()
  @UseGuards(LoginGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [TripEntity] })
  @ApiQuery({ name: 'startDate', required: false })
  @ApiQuery({ name: 'endDate', required: false })
  @ApiQuery({ name: 'destination', required: false })
  async findAll(@Query() query: UpdateTripDto) {
    const trip = await this.tripService.findAll(query);
    return trip.map((trip) => new TripEntity(trip));
  }

  @Get('user/:userId')
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [TripEntity] })
  async findByUser(@Param('userId') userId: string) {
    const trip = await this.tripService.findByUser(userId);
    return trip.map((trip) => new TripEntity(trip));
  }

  @Get(':id')
  @UseGuards(LoginGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TripEntity })
  async findOne(@Param('id') id: string) {
    return new TripEntity(await this.tripService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(LoginGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TripEntity })
  async update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return new TripEntity(await this.tripService.update(id, updateTripDto));
  }

  @Delete(':id')
  @UseGuards(LoginGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TripEntity })
  async remove(@Param('id') id: string) {
    return new TripEntity(await this.tripService.remove(id));
  }
}
