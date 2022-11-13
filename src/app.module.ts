import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizzesModule } from './quizzes/quizzes.module';
import { Quiz } from './quizzes/entities/quiz.entity';
import { Question } from './quizzes/entities/question.entity';
import { Answer } from './quizzes/entities/answer.entity';

@Module({
  imports: [
    QuizzesModule,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
