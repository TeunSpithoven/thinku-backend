import { IsString, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsNumber()
  public gameId: number;

  @IsString()
  public username: string;

  @IsNumber()
  public score: number;
}
