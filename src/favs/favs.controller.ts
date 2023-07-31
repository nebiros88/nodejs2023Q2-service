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
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
