# Home Library Service

## How to install

```
git clone https://github.com/nebiros88/nodejs2023Q2-service.git

```

## How to install

Checkout to ```home_library_service_part_2``` branch

## Installing NPM modules

```
npm install
```

## Running application

```
npm run start
```

## Running application in containers with docker

- run ```docker compose build```
- run ```docker compose up```
- two services should be started after two previous commands the database server and the server for application

## Link to docker images  

1. [Database](https://hub.docker.com/r/siarheikorbut/nodejs2023q2-service-db) to pull this image run ```docker pull siarheikorbut/nodejs2023q2-service-db``` 
2. [Server](https://hub.docker.com/r/siarheikorbut/nodejs2023q2-service-server) to pull this image run ```docker pull siarheikorbut/nodejs2023q2-service-server``` 

## Testing

After application running with docker open new terminal and enter:

To run all tests without authorization

```
npm run test
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### How to use

- `Users` (`/user` route)

  - `GET /user` - get all users
    - Server should answer with `status code` **200** and all users records
  - `GET /user/:id` - get single user by id
    - Server should answer with `status code` **200** and and record with `id === userId` if it exists
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
  - `POST /user` - create user

    ```typescript
    interface CreateUser {
      login: string;
      password: string;
    }
    ```

    - Server should answer with `status code` **201** and newly created record if request is valid
    - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields

  - `PUT /user/:id` - update user's password
    `UpdatePasswordDto`:
    ```typescript
    interface UpdatePasswordDto {
      oldPassword: string;
      newPassword: string;
    }
    ```
    - Server should answer with` status code` **200** and updated record if request is valid
    - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - Server should answer with` status code` **403** and corresponding message if `oldPassword` is wrong
  - `DELETE /user/:id` - delete user

    - Server should answer with `status code` **204** if the record is found and deleted
    - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
    - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

  - `Tracks` (`/track` route)

    - `GET /track` - get all tracks
      - Server should answer with `status code` **200** and all tracks records
    - `GET /track/:id` - get single track by id
      - Server should answer with `status code` **200** and and record with `id === trackId` if it exists
      - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist
    - `POST /track` - create new track
      - Server should answer with `status code` **201** and newly created record if request is valid
      - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    - `PUT /track/:id` - update track info
      - Server should answer with` status code` **200** and updated record if request is valid
      - Server should answer with` status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
      - Server should answer with` status code` **404** and corresponding message if record with `id === trackId` doesn't exist
    - `DELETE /track/:id` - delete track
      - Server should answer with `status code` **204** if the record is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist

  - `Artists` (`/artist` route)

    - `GET /artist` - get all artists
      - Server should answer with `status code` **200** and all artists records
    - `GET /artist/:id` - get single artist by id
      - Server should answer with `status code` **200** and and record with `id === artistId` if it exists
      - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist
    - `POST /artist` - create new artist
      - Server should answer with `status code` **201** and newly created record if request is valid
      - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    - `PUT /artist/:id` - update artist info
      - Server should answer with` status code` **200** and updated record if request is valid
      - Server should answer with` status code` **400** and corresponding message if `artist` is invalid (not `uuid`)
      - Server should answer with` status code` **404** and corresponding message if record with `id === artistId` doesn't exist
    - `DELETE /artist/:id` - delete album
      - Server should answer with `status code` **204** if the record is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist

  - `Albums` (`/album` route)

    - `GET /album` - get all albums
      - Server should answer with `status code` **200** and all albums records
    - `GET /album/:id` - get single album by id
      - Server should answer with `status code` **200** and and record with `id === albumId` if it exists
      - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist
    - `POST /album` - create new album
      - Server should answer with `status code` **201** and newly created record if request is valid
      - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    - `PUT /album/:id` - update album info
      - Server should answer with` status code` **200** and updated record if request is valid
      - Server should answer with` status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
      - Server should answer with` status code` **404** and corresponding message if record with `id === albumId` doesn't exist
    - `DELETE /album/:id` - delete album
      - Server should answer with `status code` **204** if the record is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist

  - `Favorites`
    - `GET /favs` - get all favorites
      - Server should answer with `status code` **200** and all favorite records (**not their ids**), split by entity type:
      ```typescript
      interface FavoritesResponse {
        artists: Artist[];
        albums: Album[];
        tracks: Track[];
      }
      ```
    - `POST /favs/track/:id` - add track to the favorites
      - Server should answer with `status code` **201** and corresponding message if track with `id === trackId` exists
      - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
      - Server should answer with `status code` **422** and corresponding message if track with `id === trackId` doesn't exist
    - `DELETE /favs/track/:id` - delete track from favorites
      - Server should answer with `status code` **204** if the track was in favorites and now it's deleted id is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if corresponding track is not favorite
    - `POST /favs/album/:id` - add album to the favorites
      - Server should answer with `status code` **201** and corresponding message if album with `id === albumId` exists
      - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
      - Server should answer with `status code` **422** and corresponding message if album with `id === albumId` doesn't exist
    - `DELETE /favs/album/:id` - delete album from favorites
      - Server should answer with `status code` **204** if the album was in favorites and now it's deleted id is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if corresponding album is not favorite
    - `POST /favs/artist/:id` - add artist to the favorites
      - Server should answer with `status code` **201** and corresponding message if artist with `id === artistId` exists
      - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
      - Server should answer with `status code` **422** and corresponding message if artist with `id === artistId` doesn't exist
    - `DELETE /favs/artist/:id` - delete artist from favorites
      - Server should answer with `status code` **204** if the artist was in favorites and now it's deleted id is found and deleted
      - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
      - Server should answer with `status code` **404** and corresponding message if corresponding artist is not favorite
