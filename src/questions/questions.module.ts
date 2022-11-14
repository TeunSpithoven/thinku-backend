import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Answer } from '../answers/entities/answer.entity';
import { AnswersService } from '../answers/answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer])],
  providers: [QuestionsService, AnswersService],
})
export class QuestionsModule {}
