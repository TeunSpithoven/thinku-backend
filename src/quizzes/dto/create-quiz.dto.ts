import {
  ArrayMinSize,
  IsArray,
  //   IsBoolean,
  //   IsNotEmpty,
  IsNumber,
  //   IsOptional,
  IsString,
} from 'class-validator';
import { Question } from '../entities/question.entity';

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
  public questions: Question[];
}
