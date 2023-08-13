import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Track } from 'src/types';
import { REQUEST_ERRORS } from 'src/constants';
import { TrackDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class TrackService {
  constructor(private prisma: PrismaService) {};

  async getTracks(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async getTrackById(id: string): Promise<Track | void> {
    const track = await this.prisma.track.findUnique({ where: { id }});
    if (!track) throw new Error(REQUEST_ERRORS.TRACK.NO_TRACK_BY_ID);
    return track;
  }

  async createTrack(newTrack: TrackDto): Promise<Track | void> {
    const trackId = uuidv4();

    const createTrackResult = await this.prisma.track.create({
      data: {
        ...newTrack,
        id: trackId,
      }
    })

    return createTrackResult;
  }

  async updateTrack(track: TrackDto, id: string): Promise<Track | void> {
    const isTrackExist = await this.prisma.track.findUnique({ where: { id }});

    if (!isTrackExist) {
      throw new Error(REQUEST_ERRORS.TRACK.NO_TRACK_BY_ID);
    }

    const trackUpdateResult = await this.prisma.track.update({
      where: { id },
      data: track,
    });

    return trackUpdateResult;
  }

  async deleteTrack(id: string): Promise<void> {
    const track = await this.prisma.track.findUnique({ where: { id }});

    if (!track) {
      throw new Error(REQUEST_ERRORS.TRACK.NO_TRACK_BY_ID);
    }

    await this.prisma.track.delete({ where: { id }});
    return;
  }
}
