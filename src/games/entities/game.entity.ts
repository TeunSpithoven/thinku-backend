import { Student } from '../../students/entities/student.entity';
import { Quiz } from '../../quizzes/entities/quiz.entity';

export class Game {
  public id: number;

  public roomCode: string;

  public quiz: Quiz;

  public students: Student[];

  public currentQuestion: number;
}
