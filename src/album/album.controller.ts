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
import { AlbumService } from './album.service';
import { AlbumDto, AlbumIdDto } from './dto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  getAlbumById(@Param() { id }: AlbumIdDto) {
    try {
      return this.albumService.getAlbumById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  createAlbum(@Body() album: AlbumDto) {
    return this.albumService.createAlbum(album);
  }

  @Put(':id')
  updateAlbum(@Body() album: AlbumDto, @Param() { id }: AlbumIdDto) {
    try {
      return this.albumService.updateAlbum(album, id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param() { id }: AlbumIdDto) {
    try {
      return this.albumService.deleteAlbum(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
