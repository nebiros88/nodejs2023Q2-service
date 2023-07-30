import { IsUUID } from 'class-validator';

export class FindByOneParam {
  @IsUUID('4')
  id: string;
}
