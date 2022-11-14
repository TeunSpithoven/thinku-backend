import { IsBoolean, IsString } from 'class-validator';
// import { Question } from '../../questions/entities/question.entity';

export class CreateAnswerDto {
  @IsString()
  public answer: string;

  @IsBoolean()
  public isCorrect: boolean;
}
