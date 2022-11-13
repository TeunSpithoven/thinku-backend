import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Question, Answer])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
