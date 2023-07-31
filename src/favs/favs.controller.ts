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
}
