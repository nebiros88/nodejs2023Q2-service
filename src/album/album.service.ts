import { Body, Injectable, Post } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { REQUEST_ERRORS } from 'src/constants';
import { db } from 'src/database/database';
import { Album } from 'src/types';
import { AlbumDto } from './dto';

@Injectable({})
export class AlbumService {
  getAlbums(): Album[] {
    return db.album;
  }

  getAlbumById(id: string): Album | void {
    const album = db.album.find((album) => album.id === id);
    if (!album) throw new Error(REQUEST_ERRORS.ALBUM.NO_ALBUM_BY_ID);
    return album;
  }

  createAlbum(album: AlbumDto): Album | void {
    const { name, year, artistId = null } = album;
    const newAlbum: Album = {
      id: uuidv4(),
      name: name,
      year: year,
      artistId: artistId,
    };

    db.album.push(newAlbum);

    return newAlbum;
  }

  updateAlbum(album: AlbumDto, id: string): Album | void {
    const isAlbumExist = db.album.find((el) => el.id === id);

    if (!isAlbumExist) {
      throw new Error(REQUEST_ERRORS.ALBUM.NO_ALBUM_BY_ID);
    }

    const { name, year, artistId = null } = album;

    const tempAlbum: Album = {
      id: id,
      name: name,
      year: year,
      artistId: artistId,
    };

    db.album.map((el) => {
      if (el.id === id) {
        el.name = tempAlbum.name;
        el.year = tempAlbum.year;
        el.artistId = tempAlbum.artistId;
      }
    });

    return isAlbumExist;
  }

  deleteAlbum(id: string): void {
    const album = db.album.find((el) => el.id === id);

    if (!album) {
      throw new Error(REQUEST_ERRORS.ALBUM.NO_ALBUM_BY_ID);
    }

    db.album = db.album.filter((el) => el.id !== id);
  }
}
