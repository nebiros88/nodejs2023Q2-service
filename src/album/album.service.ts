import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { REQUEST_ERRORS } from 'src/constants';
import { Album } from 'src/types';
import { AlbumDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async getAlbums(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async getAlbumById(id: string): Promise<Album | void> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) throw new Error(REQUEST_ERRORS.ALBUM.NO_ALBUM_BY_ID);
    return album;
  }

  async createAlbum(album: AlbumDto): Promise<Album | void> {
    const { name, year, artistId = null } = album;
    const newAlbum: Album = {
      id: uuidv4(),
      name: name,
      year: year,
      artistId: artistId,
    };

    const resultAlbum = await this.prisma.album.create({
      data: {
        ...newAlbum,
      },
    });

    return resultAlbum;
  }

  async updateAlbum(album: AlbumDto, id: string): Promise<Album | void> {
    const isAlbumExist = await this.prisma.album.findUnique({ where: { id } });

    if (!isAlbumExist) {
      throw new Error(REQUEST_ERRORS.ALBUM.NO_ALBUM_BY_ID);
    }

    const { name, year, artistId = null } = album;

    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: {
        name,
        year,
        artistId,
      },
    });

    return updatedAlbum;
  }

  async deleteAlbum(id: string): Promise<void> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new Error(REQUEST_ERRORS.ALBUM.NO_ALBUM_BY_ID);
    }

    await this.prisma.album.delete({ where: { id } });
    return;
  }
}
