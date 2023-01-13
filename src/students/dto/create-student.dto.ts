import { IsString, IsNumber, isNumber } from 'class-validator';

export class CreateStudentDto {
  @isNumber
  public gameId: number;

  @IsString()
  public username: string;

  @IsNumber()
  public score: number;
}
