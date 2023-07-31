import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserIdDto {
  @IsUUID('4')
  id: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  oldPassword: string;

  @IsNotEmpty()
  newPassword: string;
}
