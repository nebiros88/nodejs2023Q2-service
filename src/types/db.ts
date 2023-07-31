import { Album } from './album';
import { Artist } from './artist';
import { Favorites } from './favorites';
import { Track } from './track';
import { User } from './user';

export type DBType = {
  user: User[];
  artist: Artist[];
  track: Track[];
  album: Album[];
  favorites: Favorites;
};
