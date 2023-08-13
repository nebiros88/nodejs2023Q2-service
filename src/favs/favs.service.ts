import { Injectable } from '@nestjs/common';

import { REQUEST_ERRORS } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { Album, Artist, FavoritesResponse, Track } from 'src/types';

@Injectable({})
export class FavsService {
  constructor(private prisma: PrismaService) {}

  async getFavorites(): Promise<FavoritesResponse> {
    const artists = await this.prisma.favoritesToArtists.findMany({
      select: {
        artistId: true,
      },
    });

    const albums = await this.prisma.favoritesToAlbums.findMany({
      select: {
        albumId: true,
      },
    });

    const tracks = await this.prisma.favoritesToTracks.findMany({
      select: {
        trackId: true,
      },
    });

    return {
      artists: await this.prisma.artist.findMany({
        where: {
          id: {
            in: artists.map((el) => el.artistId),
          },
        },
      }),
      albums: await this.prisma.album.findMany({
        where: {
          id: {
            in: albums.map((el) => el.albumId),
          },
        },
      }),
      tracks: await this.prisma.track.findMany({
        where: {
          id: {
            in: tracks.map((el) => el.trackId),
          },
        },
      }),
    };
  }

  async addFavoriteTrack(id: string): Promise<Track | void> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) throw new Error(REQUEST_ERRORS.TRACK.NO_TRACK_BY_ID);

    await this.prisma.favoritesToTracks.create({
      data: { trackId: id },
    });

    return track;
  }

  async addFavoriteAlbum(id: string): Promise<Album | void> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) throw new Error(REQUEST_ERRORS.ALBUM.NO_ALBUM_BY_ID);

    await this.prisma.favoritesToAlbums.create({
      data: { albumId: id },
    });

    return album;
  }

  async addFavoriteArtist(id: string): Promise<Artist | void> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) throw new Error(REQUEST_ERRORS.ARTIST.NO_ARTIST_BY_ID);

    await this.prisma.favoritesToArtists.create({
      data: { artistId: id },
    });

    return artist;
  }

  async deleteAlbumFromFavs(id: string): Promise<void> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) throw new Error(REQUEST_ERRORS.ALBUM.NO_ALBUM_BY_ID);

    const isAlbumInFavs = await this.prisma.favoritesToAlbums.findUnique({
      where: { albumId: id },
    });
    if (!isAlbumInFavs) throw new Error(REQUEST_ERRORS.FAVS.NO_ALBUM_IN_FAVS);

    await this.prisma.favoritesToAlbums.delete({
      where: {
        albumId: id,
      },
    });

    return;
  }

  async deleteTrackFromFavs(id: string): Promise<void> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) throw new Error(REQUEST_ERRORS.TRACK.NO_TRACK_BY_ID);

    const isTrackInFavs = await this.prisma.favoritesToTracks.findUnique({
      where: { trackId: id },
    });
    if (!isTrackInFavs) throw new Error(REQUEST_ERRORS.FAVS.NO_TRACK_IN_FAVS);

    await this.prisma.favoritesToTracks.delete({
      where: {
        trackId: id,
      },
    });

    return;
  }

  async deleteArtistFromFavs(id: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) throw new Error(REQUEST_ERRORS.ARTIST.NO_ARTIST_BY_ID);

    const isArtistInFavs = await this.prisma.favoritesToArtists.findUnique({
      where: { artistId: id },
    });

    if (!isArtistInFavs) throw new Error(REQUEST_ERRORS.FAVS.NO_ARTIST_IN_FAVS);

    await this.prisma.favoritesToArtists.delete({
      where: {
        artistId: id,
      },
    });

    return;
  }
}
