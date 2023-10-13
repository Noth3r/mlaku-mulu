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
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @UseGuards(LoginGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [TripEntity] })
  findAll(@Query() query: UpdateTripDto) {
    return this.tripService.findAll(query);
  }

  @Get('user/:userId')
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [TripEntity] })
  findByUser(@Param('userId') userId: string) {
    return this.tripService.findByUser(userId);
  }

  @Get(':id')
  @UseGuards(LoginGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TripEntity })
  findOne(@Param('id') id: string) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(LoginGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TripEntity })
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @UseGuards(LoginGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TripEntity })
  remove(@Param('id') id: string) {
    return this.tripService.remove(id);
  }
}
