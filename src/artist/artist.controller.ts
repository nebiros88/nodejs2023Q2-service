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
import { ArtistService } from './artist.service';
import { ArtistDto, ArtistIdDto } from './dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getArtists() {
    return await this.artistService.getArtists();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getArtistById(@Param() { id }: ArtistIdDto) {
    try {
      return await this.artistService.getArtistById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createArtist(@Body() artist: ArtistDto) {
    return await this.artistService.createArtist(artist);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateArtist(@Body() artist: ArtistDto, @Param() { id }: ArtistIdDto) {
    try {
      return await this.artistService.updateArtist(artist, id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
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
