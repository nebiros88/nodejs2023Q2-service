import { Module, forwardRef } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
