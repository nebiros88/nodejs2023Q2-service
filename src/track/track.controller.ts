import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { TrackService } from './track.service';
import { TrackDto, TrackIdDto } from './dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTracks() {
    return await this.trackService.getTracks();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTrackById(@Param() { id }: TrackIdDto) {
    try {
      return await this.trackService.getTrackById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTrack(@Body() body: TrackDto) {
    return await this.trackService.createTrack(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateTrack(@Body() body: TrackDto, @Param() { id }: TrackIdDto) {
    try {
      return await this.trackService.updateTrack(body, id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteTrack(@Param() { id }: TrackIdDto) {
    try {
      return await this.trackService.deleteTrack(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
