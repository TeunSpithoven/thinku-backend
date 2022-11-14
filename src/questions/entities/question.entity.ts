import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Quiz } from '../../quizzes/entities/quiz.entity';
import { Answer } from '../../answers/entities/answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions, {
    onDelete: 'CASCADE',
  })
  quiz: Quiz;

  @Column()
  question: string;

  @Column()
  type: string;

  @Column()
  number: number;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
