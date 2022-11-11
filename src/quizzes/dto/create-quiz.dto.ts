import {
  ArrayMinSize,
  IsArray,
  //   IsBoolean,
  //   IsNotEmpty,
  IsNumber,
  //   IsOptional,
  IsString,
} from 'class-validator';
export class CreateQuizDto {
  @IsNumber()
  public UserId: number;

  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public image: string;

  @IsArray()
  @ArrayMinSize(1)
  public questions: string[];
}
