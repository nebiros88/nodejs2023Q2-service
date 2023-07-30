import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindByOneParam {
  @IsUUID('4')
  id: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
