import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { QuizzesModule } from './quizzes/quizzes.module';
import { User } from './users/entities/user.entity';
import { Quiz } from './quizzes/entities/quiz.entity';
import { Question } from './questions/entities/question.entity';
import { Answer } from './answers/entities/answer.entity';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { ImagesModule } from './images/images.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GamesModule } from './games/games.module';
import { StudentsModule } from './students/students.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestbase',
      entities: [User, Quiz, Question, Answer],
      synchronize: true,
    }),
    QuizzesModule,
    QuestionsModule,
    AnswersModule,
    ImagesModule,
    UsersModule,
    AuthModule,
    GamesModule,
    StudentsModule,
    RoomModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
