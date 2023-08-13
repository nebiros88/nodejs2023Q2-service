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
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackDto, TrackIdDto } from './dto';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  getTracks() {
    return this.trackService.getTracks();
  }

  @Get(':id')
  getTrackById(@Param() { id }: TrackIdDto) {
    try {
      return this.trackService.getTrackById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  createTrack(@Body() body: TrackDto) {
    return this.trackService.createTrack(body);
  }

  @Put(':id')
  updateTrack(@Body() body: TrackDto, @Param() { id }: TrackIdDto) {
    try {
      return this.trackService.updateTrack(body, id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param() { id }: TrackIdDto) {
    try {
      return this.trackService.deleteTrack(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
