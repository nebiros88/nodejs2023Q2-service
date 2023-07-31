import { IsNotEmpty, IsUUID } from 'class-validator';

export class ArtistIdDto {
  @IsUUID('4')
  id: string;
}

export class ArtistDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  grammy: boolean;
}
