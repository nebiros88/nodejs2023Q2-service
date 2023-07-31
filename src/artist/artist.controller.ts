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
import { ArtistService } from './artist.service';
import { ArtistDto, ArtistIdDto } from './dto';
import { REQUEST_ERRORS } from 'src/constants';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }

  @Get(':id')
  getArtistById(@Param() { id }: ArtistIdDto) {
    try {
      return this.artistService.getArtistById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  createArtist(@Body() artist: ArtistDto) {
    return this.artistService.createArtist(artist);
  }

  @Put(':id')
  updateArtist(@Body() artist: ArtistDto, @Param() { id }: ArtistIdDto) {
    try {
      return this.artistService.updateArtist(artist, id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param() { id }: ArtistIdDto) {
    try {
      return this.artistService.deleteArtist(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
