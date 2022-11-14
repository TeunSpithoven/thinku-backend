import { Test, TestingModule } from '@nestjs/testing';
import { Quiz } from './entities/quiz.entity';
import { Question } from '../questions/entities/question.entity';
import { Answer } from '../answers/entities/answer.entity';
import { QuizzesService } from './quizzes.service';
import { QuestionsService } from '../questions/questions.service';
import { AnswersService } from '../answers/answers.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('QuizzesService', () => {
  let service: QuizzesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<QuizzesService>(QuizzesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
