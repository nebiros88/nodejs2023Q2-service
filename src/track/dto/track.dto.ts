import { IsNotEmpty, IsUUID } from 'class-validator';

export class TrackIdDto {
  @IsUUID('4')
  id: string;
}

export class TrackDto {
  @IsNotEmpty()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsNotEmpty()
  duration: number;
}
