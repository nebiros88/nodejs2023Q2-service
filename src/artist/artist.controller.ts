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

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getArtists() {
    return await this.artistService.getArtists();
  }

  @Get(':id')
  async getArtistById(@Param() { id }: ArtistIdDto) {
    try {
      return await this.artistService.getArtistById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async createArtist(@Body() artist: ArtistDto) {
    return await this.artistService.createArtist(artist);
  }

  @Put(':id')
  async updateArtist(@Body() artist: ArtistDto, @Param() { id }: ArtistIdDto) {
    try {
      return await this.artistService.updateArtist(artist, id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteArtist(@Param() { id }: ArtistIdDto) {
    try {
      return await this.artistService.deleteArtist(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
