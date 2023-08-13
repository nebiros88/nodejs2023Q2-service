import { IsNotEmpty, IsNumber, IsString, IsUUID, ValidateIf } from 'class-validator';

export class TrackIdDto {
  @IsUUID('4')
  id: string;
}

export class TrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf(({ artistId }) => !Object.is(artistId, null))
  @IsString()
  artistId: string | null;

  @ValidateIf(({ albumId }) => !Object.is(albumId, null))
  @IsString()
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
