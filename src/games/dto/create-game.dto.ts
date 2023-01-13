import { IsNumber } from 'class-validator';
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { Student } from '../../students/entities/student.entity';

export class CreateGameDto {
  public quiz: Quiz;

  public roomCode: string;

  public students: Student[];

  @IsNumber()
  public currentQuestion: number;
}
