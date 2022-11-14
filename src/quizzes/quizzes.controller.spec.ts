import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './entities/quiz.entity';
import { Question } from '../questions/entities/question.entity';
import { Answer } from '../answers/entities/answer.entity';
import { QuestionsService } from '../questions/questions.service';
import { AnswersService } from '../answers/answers.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('QuizzesController', () => {
  let controller: QuizzesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizzesController],
      providers: [
        QuizzesService,
        QuestionsService,
        AnswersService,
        {
          provide: getRepositoryToken(Quiz),
          useClass: Quiz,
        },
        {
          provide: getRepositoryToken(Question),
          useClass: Question,
        },
        {
          provide: getRepositoryToken(Answer),
          useClass: Answer,
        },
      ],
    }).compile();

    controller = module.get<QuizzesController>(QuizzesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
