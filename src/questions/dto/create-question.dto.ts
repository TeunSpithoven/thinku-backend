import {
  ArrayMinSize,
  IsArray,
  //   IsBoolean,
  //   IsNotEmpty,
  IsNumber,
  //   IsOptional,
  IsString,
} from 'class-validator';
// import { CreateQuizDto } from '../../quizzes/dto/create-quiz.dto';
import { CreateAnswerDto } from '../../answers/dto/create-answer.dto';

export class CreateQuestionDto {
  @IsString()
  public question: string;

  @IsString()
  public type: string;

  @IsNumber()
  public time: number;

  @IsNumber()
  public number: number;

  @IsArray()
  @ArrayMinSize(1)
  public answers: CreateAnswerDto[];
}
