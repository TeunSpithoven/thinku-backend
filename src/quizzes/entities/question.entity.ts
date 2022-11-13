import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Quiz } from './quiz.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToOne((type) => Quiz, (quiz) => quiz.questions)
  quiz: Quiz;

  @Column()
  question: string;

  @Column()
  type: string;

  @Column()
  number: number;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => Answer, (answer) => answer.question)
  answers: Answer[];
}
