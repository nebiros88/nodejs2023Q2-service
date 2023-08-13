export const REQUEST_ERRORS = {
  USER: {
    USER_EXISTS_LOGIN: 'User with this login already exists!',
    NO_USER_WITH_PROVIDED_ID: 'The user with provided id does not exist!',
    USER_WRONG_PASSWORD: 'Wrong old password!',
  },
  TRACK: {
    NO_TRACK_BY_ID: 'The track with provided id does not exist!',
  },
  ARTIST: {
    NO_ARTIST_BY_ID: 'The artist with provided id does not exist!',
  },
  ALBUM: {
    NO_ALBUM_BY_ID: 'The album with provided id does not exist!',
  },
  FAVS: {
    NO_ALBUM_IN_FAVS:
      'The album with provided id does not included in favorites!',
    NO_TRACK_IN_FAVS:
      'The track with provided id does not included in favorites!',
    NO_ARTIST_IN_FAVS:
      'The artist with provided id does not included in favorites!',
  },
};
