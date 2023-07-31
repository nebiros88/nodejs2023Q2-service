import { Body, Inject, Injectable, Post } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { REQUEST_ERRORS } from 'src/constants';
import { db } from 'src/database/database';
import { TrackService } from 'src/track/track.service';
import { Album, Artist, FavoritesResponse, Track } from 'src/types';
import { v4 as uuidv4 } from 'uuid';

@Injectable({})
export class FavsService {
  @Inject(ArtistService)
  private readonly artistService: ArtistService;

  @Inject(AlbumService)
  private readonly albumService: AlbumService;

  @Inject(TrackService)
  private readonly trackService: TrackService;

  getFavorites(): FavoritesResponse {
    let response: FavoritesResponse = {
      artists: [] as Artist[],
      albums: [] as Album[],
      tracks: [] as Track[],
    };

    db.favorites.artists.forEach((id) => {
      const artist = this.artistService.getArtistById(id);
      response.artists.push(artist as Artist);
    });

    db.favorites.albums.forEach((id) => {
      const album = this.albumService.getAlbumById(id);
      response.albums.push(album as Album);
    });

    db.favorites.tracks.forEach((id) => {
      const track = this.trackService.getTrackById(id);
      response.tracks.push(track as Track);
    });

    return response;
  }

  addFavoriteTrack(id: string) {
    const track = this.trackService.getTrackById(id);

    if (!track) throw new Error(REQUEST_ERRORS.TRACK.NO_TRACK_BY_ID);

    db.favorites.tracks.push(track.id);

    return track;
  }
}
