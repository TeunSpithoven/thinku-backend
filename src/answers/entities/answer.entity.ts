import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answer: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
}
