import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ArtistIdDto {
  @IsUUID('4')
  id: string;
}

export class ArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  grammy: boolean;
}
