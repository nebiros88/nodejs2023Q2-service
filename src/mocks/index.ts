import { v4 as uuidv4 } from 'uuid';

import { Album, Artist, Favorites, Track, User } from 'src/types';

export const mockedUsers: User[] = [
  {
    id: uuidv4(),
    login: 'user1-login',
    password: 'user1-password',
    version: 1, // integer number, increments on update
    createdAt: Date.now(), // timestamp of creation
    updatedAt: Date.now(),
  },
  {
    id: uuidv4(),
    login: 'user2-login',
    password: 'user2-password',
    version: 1, // integer number, increments on update
    createdAt: Date.now(), // timestamp of creation
    updatedAt: Date.now(),
  },
  {
    id: uuidv4(),
    login: 'user3-login',
    password: 'user3-password',
    version: 1, // integer number, increments on update
    createdAt: Date.now(), // timestamp of creation
    updatedAt: Date.now(),
  },
];

export const mockedArtists: Artist[] = [
  {
    id: uuidv4(),
    name: 'artist-1',
    grammy: false,
  },
  {
    id: uuidv4(),
    name: 'artist-2',
    grammy: false,
  },
  {
    id: uuidv4(),
    name: 'artist-3',
    grammy: true,
  },
];

export const mockedTracks: Track[] = [
  {
    id: uuidv4(),
    name: 'track-1',
    artistId: mockedArtists[0].id,
    albumId: null,
    duration: 300,
  },
  {
    id: uuidv4(),
    name: 'track-2',
    artistId: mockedArtists[0].id,
    albumId: null,

    duration: 300,
  },
  {
    id: uuidv4(),
    name: 'track-3',
    artistId: mockedArtists[0].id,
    albumId: null,
    duration: 300,
  },
  {
    id: uuidv4(),
    name: 'track-4',
    artistId: mockedArtists[1].id,
    albumId: null,
    duration: 300,
  },
  {
    id: uuidv4(),
    name: 'track-5',
    artistId: mockedArtists[1].id,
    albumId: null,
    duration: 300,
  },
];

export const mockedAlbums: Album[] = [
  {
    id: uuidv4(),
    name: 'album-1',
    year: 2020,
    artistId: mockedArtists[0].id,
  },
  {
    id: uuidv4(),
    name: 'album-2',
    year: 2021,
    artistId: mockedArtists[0].id,
  },
];

export const mockedFavorites: Favorites[] = [
  {
    artists: [mockedArtists[0].id, mockedArtists[1].id],
    albums: [mockedAlbums[0].id],
    tracks: [mockedTracks[0].id, mockedTracks[1].id],
  },
];
