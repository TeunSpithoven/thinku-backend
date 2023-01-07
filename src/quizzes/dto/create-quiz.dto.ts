import {
  ArrayMinSize,
  ArrayMaxSize,
  IsArray,
  //   IsBoolean,
  //   IsNotEmpty,
  IsNumber,
  //   IsOptional,
  IsString,
} from 'class-validator';
// import { CreateQuestionDto } from '../../questions/dto/create-question.dto';
import { Question } from '../../questions/entities/question.entity';

export class CreateQuizDto {
  @IsNumber()
  public userId: number;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public image: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  public questions: Question[];
}
