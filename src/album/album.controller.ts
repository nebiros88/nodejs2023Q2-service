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
  async getAlbums() {
    return await this.albumService.getAlbums();
  }

  @Get(':id')
  async getAlbumById(@Param() { id }: AlbumIdDto) {
    try {
      return await this.albumService.getAlbumById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async createAlbum(@Body() album: AlbumDto) {
    return await this.albumService.createAlbum(album);
  }

  @Put(':id')
  async updateAlbum(@Body() album: AlbumDto, @Param() { id }: AlbumIdDto) {
    try {
      return await this.albumService.updateAlbum(album, id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteAlbum(@Param() { id }: AlbumIdDto) {
    try {
      return await this.albumService.deleteAlbum(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
