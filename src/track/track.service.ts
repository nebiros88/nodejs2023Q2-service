import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Track } from 'src/types';
import { db } from '../database/database';
import { REQUEST_ERRORS } from 'src/constants';
import { TrackDto } from './dto';

@Injectable({})
export class TrackService {
  getTracks(): Track[] {
    return db.track;
  }

  getTrackById(id: string): Track | void {
    const track = db.track.find((el) => el.id === id);
    if (!track) throw new Error(REQUEST_ERRORS.TRACK.NO_TRACK_BY_ID);
    return track;
  }

  createTrack(newTrack: TrackDto): Track | void {
    const { name, artistId = null, albumId = null, duration } = newTrack;

    const track = {
      id: uuidv4(),
      name: name,
      artistId: artistId,
      albumId: albumId,
      duration: duration,
    };

    db.track.push(track);

    return { ...track };
  }

  updateTrack(track: TrackDto, id: string): Track | void {
    const isTrackExist = db.track.find((track) => track.id === id);

    if (!isTrackExist) {
      throw new Error(REQUEST_ERRORS.TRACK.NO_TRACK_BY_ID);
    }

    const { name, artistId = null, albumId = null, duration } = track;

    let newTrack: Track = {
      id: '',
      name: name,
      artistId: artistId,
      albumId: albumId,
      duration: duration,
    };

    db.track.map((el) => {
      if (el.id === id) {
        el.name = newTrack.name;
        el.artistId = newTrack.artistId;
        el.albumId = newTrack.albumId;
        el.duration = newTrack.duration;
        newTrack.id = el.id;
      }
    });

    return newTrack;
  }

  deleteTrack(id: string): void {
    const track = db.track.find((track) => track.id === id);

    if (!track) {
      throw new Error(REQUEST_ERRORS.TRACK.NO_TRACK_BY_ID);
    }

    db.track = db.track.filter((track) => track.id !== id);
    return;
  }
}
