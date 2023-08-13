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
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { TrackIdDto } from 'src/track/dto';
import { AlbumIdDto } from 'src/album/dto';
import { ArtistIdDto } from 'src/artist/dto';

@Controller('favs')
export class FavsController {
  constructor(
    private favsService: FavsService,
    private artistService: ArtistService,
    private albumtService: AlbumService,
    private trackService: TrackService,
  ) {}

  @Get()
  getFavorites() {
    return this.favsService.getFavorites();
  }

  @Post('/track/:id')
  addFavoriteTrack(@Param() { id }: TrackIdDto) {
    try {
      return this.favsService.addFavoriteTrack(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Post('/album/:id')
  addFavoriteAlbum(@Param() { id }: AlbumIdDto) {
    try {
      return this.favsService.addFavoriteAlbum(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('/album/:id')
  @HttpCode(204)
  deleteAlbumFromFavs(@Param() { id }: AlbumIdDto) {
    try {
      return this.favsService.deleteAlbumFromFavs(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/track/:id')
  @HttpCode(204)
  deleteTrackFromFavs(@Param() { id }: TrackIdDto) {
    try {
      return this.favsService.deleteTrackFromFavs(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('/artist/:id')
  addFavoriteArtist(@Param() { id }: ArtistIdDto) {
    try {
      return this.favsService.addFavoriteArtist(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  deleteArtistFromFavs(@Param() { id }: ArtistIdDto) {
    try {
      return this.favsService.deleteArtistFromFavs(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
