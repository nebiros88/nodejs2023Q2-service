import { DBType } from 'src/types';
import {
  mockedAlbums,
  mockedArtists,
  mockedFavorites,
  mockedTracks,
  mockedUsers,
} from 'src/mocks';

export const db: DBType = {
  user: [...mockedUsers],
  artist: [...mockedArtists],
  track: [...mockedTracks],
  album: [...mockedAlbums],
  favorites: [...mockedFavorites],
};
