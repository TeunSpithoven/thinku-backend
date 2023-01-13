import { IsString, IsNumber } from 'class-validator';

export class UpdateStudentDto {
  @IsString()
  public username: string;

  @IsNumber()
  public score: number;
}
