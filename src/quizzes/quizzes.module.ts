import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizSubscriber } from './quizzes.subscriber';
import { Question } from '../questions/entities/question.entity';
import { Answer } from '../answers/entities/answer.entity';
import { QuestionsService } from '../questions/questions.service';
import { AnswersService } from '../answers/answers.service';
import { QuestionsModule } from '../questions/questions.module';
import { AnswersModule } from '../answers/answers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quiz, Question, Answer]),
    QuestionsModule,
    AnswersModule,
  ],
  controllers: [QuizzesController],
  providers: [QuizzesService, QuizSubscriber, QuestionsService, AnswersService],
})
export class QuizzesModule {}
