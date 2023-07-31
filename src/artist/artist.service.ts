import { Injectable } from '@nestjs/common';
import { REQUEST_ERRORS } from 'src/constants';
import { db } from 'src/database/database';
import { Artist } from 'src/types';
import { v4 as uuidv4 } from 'uuid';
import { ArtistDto } from './dto';

@Injectable({})
export class ArtistService {
  getArtists(): Artist[] {
    return db.artist;
  }

  getArtistById(id: string): Artist | void {
    const artist = db.artist.find((artist) => artist.id === id);
    if (!artist) throw new Error(REQUEST_ERRORS.ARTIST.NO_ARTIST_BY_ID);
    return artist;
  }

  createArtist(artist: ArtistDto): Artist | void {
    const { name, grammy } = artist;
    const newArtist: Artist = {
      id: uuidv4(),
      name: name,
      grammy: grammy,
    };

    db.artist.push(newArtist);

    return newArtist;
  }

  updateArtist(artist: ArtistDto, id: string): Artist | void {
    const isArtistExist = db.artist.find((el) => el.id === id);

    if (!isArtistExist) {
      throw new Error(REQUEST_ERRORS.ARTIST.NO_ARTIST_BY_ID);
    }

    const { name, grammy } = artist;

    const tempArtist: Artist = {
      id: id,
      name: name,
      grammy: grammy,
    };

    db.artist.map((el) => {
      if (el.id === id) {
        el.name = tempArtist.name;
        el.grammy = tempArtist.grammy;
      }
    });

    return tempArtist;
  }

  deleteArtist(id: string): void {
    const artist = db.artist.find((el) => el.id === id);

    if (!artist) {
      throw new Error(REQUEST_ERRORS.ARTIST.NO_ARTIST_BY_ID);
    }

    db.artist = db.artist.filter((el) => el.id !== id);

    db.track.map((track, index) => {
      if (track.artistId === id) {
        db.track[index].artistId = null;
      }
    });

    db.album.map((album, index) => {
      if (album.artistId === id) {
        db.album[index].artistId = null;
      }
    });

    return;
  }
}
