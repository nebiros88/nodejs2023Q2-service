import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { REQUEST_ERRORS } from 'src/constants';
import { Artist } from 'src/types';
import { ArtistDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async getArtists(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async getArtistById(id: string): Promise<Artist | void> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) throw new Error(REQUEST_ERRORS.ARTIST.NO_ARTIST_BY_ID);
    return artist;
  }

  async createArtist(artist: ArtistDto): Promise<Artist | void> {
    const { name, grammy } = artist;
    const newArtist: Artist = {
      id: uuidv4(),
      name: name,
      grammy: grammy,
    };

    const resultArtist = await this.prisma.artist.create({
      data: {
        ...newArtist,
      },
    });

    return resultArtist;
  }

  async updateArtist(artist: ArtistDto, id: string): Promise<Artist | void> {
    const isArtistExist = await this.prisma.artist.findUnique({
      where: { id },
    });

    if (!isArtistExist) {
      throw new Error(REQUEST_ERRORS.ARTIST.NO_ARTIST_BY_ID);
    }

    const { name, grammy } = artist;

    const updatedArtist = this.prisma.artist.update({
      where: { id },
      data: {
        name,
        grammy,
      },
    });
    return updatedArtist;
  }

  async deleteArtist(id: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new Error(REQUEST_ERRORS.ARTIST.NO_ARTIST_BY_ID);
    }

    await this.prisma.artist.delete({ where: { id } });
    return;
  }
}
