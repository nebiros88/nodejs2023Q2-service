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
import { FavsService } from './favs.service';
import { TrackIdDto } from 'src/track/dto';
import { AlbumIdDto } from 'src/album/dto';
import { ArtistIdDto } from 'src/artist/dto';

@Controller('favs')
export class FavsController {
  constructor(
    private favsService: FavsService,
  ) {}

  @Get()
  async getFavorites() {
    return await this.favsService.getFavorites();
  }

  @Post('/track/:id')
  async addFavoriteTrack(@Param() { id }: TrackIdDto) {
    try {
      return await this.favsService.addFavoriteTrack(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Post('/album/:id')
  async addFavoriteAlbum(@Param() { id }: AlbumIdDto) {
    try {
      return await this.favsService.addFavoriteAlbum(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('/album/:id')
  @HttpCode(204)
  async deleteAlbumFromFavs(@Param() { id }: AlbumIdDto) {
    try {
      return await this.favsService.deleteAlbumFromFavs(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/track/:id')
  @HttpCode(204)
  async deleteTrackFromFavs(@Param() { id }: TrackIdDto) {
    try {
      return await this.favsService.deleteTrackFromFavs(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('/artist/:id')
  async addFavoriteArtist(@Param() { id }: ArtistIdDto) {
    try {
      return await this.favsService.addFavoriteArtist(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  async deleteArtistFromFavs(@Param() { id }: ArtistIdDto) {
    try {
      return await this.favsService.deleteArtistFromFavs(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
