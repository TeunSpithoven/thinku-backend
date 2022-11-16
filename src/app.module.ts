import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizzesModule } from './quizzes/quizzes.module';
import { Quiz } from './quizzes/entities/quiz.entity';
import { Question } from './questions/entities/question.entity';
import { Answer } from './answers/entities/answer.entity';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestbase',
      entities: [Quiz, Question, Answer],
      synchronize: true,
    }),
    QuizzesModule,
    QuestionsModule,
    AnswersModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
