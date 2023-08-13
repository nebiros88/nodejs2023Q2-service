import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [ArtistModule, AlbumModule, TrackModule],
})
export class FavsModule {}
