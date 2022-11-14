import { Test, TestingModule } from '@nestjs/testing';
import { Quiz } from '../quizzes/entities/quiz.entity';
import { Question } from '../questions/entities/question.entity';
import { Answer } from '../answers/entities/answer.entity';
import { QuizzesService } from '../quizzes/quizzes.service';
import { QuestionsService } from '../questions/questions.service';
import { AnswersService } from '../answers/answers.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AnswersService', () => {
  let service: AnswersService;

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

    service = module.get<AnswersService>(AnswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
