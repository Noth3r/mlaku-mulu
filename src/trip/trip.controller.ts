import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
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

@Controller('trip')
@ApiTags('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  @UseGuards(LoginGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateTripDto })
  create(@Body() createTripDto: CreateTripDto) {
    return this.tripService.create(createTripDto);
  }

  @Get()
  @UseGuards(LoginGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [CreateTripDto] })
  findAll() {
    return this.tripService.findAll();
  }

  @Get('user/:userId')
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [CreateTripDto] })
  findByUser(@Param('userId') userId: string) {
    return this.tripService.findByUser(userId);
  }

  @Get(':id')
  @UseGuards(LoginGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateTripDto })
  findOne(@Param('id') id: string) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(LoginGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateTripDto })
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  @UseGuards(LoginGuard, AdminGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreateTripDto })
  remove(@Param('id') id: string) {
    return this.tripService.remove(id);
  }
}
