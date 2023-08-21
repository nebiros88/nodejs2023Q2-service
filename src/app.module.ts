import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { FavsModule } from './favs/favs.module';
import { PrismaModule } from './prisma/prisma.module';
import { LoggerServiceMiddleware } from './logger/logger-service.middleware';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from './utils';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
    PrismaModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: CustomExceptionFilter }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerServiceMiddleware).forRoutes('*');
  }
}
