-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "artists" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "grammy" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "albums" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "artistId" TEXT,
    CONSTRAINT "albums_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tracks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "artistId" TEXT,
    "albumId" TEXT,
    "duration" INTEGER NOT NULL,
    CONSTRAINT "tracks_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "tracks_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "albums" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ArtistToFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ArtistToFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "artists" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ArtistToFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AlbumToFavorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AlbumToFavorites_A_fkey" FOREIGN KEY ("A") REFERENCES "albums" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AlbumToFavorites_B_fkey" FOREIGN KEY ("B") REFERENCES "Favorites" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FavoritesToTrack" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FavoritesToTrack_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorites" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FavoritesToTrack_B_fkey" FOREIGN KEY ("B") REFERENCES "tracks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ArtistToFavorites_AB_unique" ON "_ArtistToFavorites"("A", "B");

-- CreateIndex
CREATE INDEX "_ArtistToFavorites_B_index" ON "_ArtistToFavorites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToFavorites_AB_unique" ON "_AlbumToFavorites"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToFavorites_B_index" ON "_AlbumToFavorites"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritesToTrack_AB_unique" ON "_FavoritesToTrack"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritesToTrack_B_index" ON "_FavoritesToTrack"("B");
