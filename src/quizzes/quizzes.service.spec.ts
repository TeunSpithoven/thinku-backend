// import { createMock } from '@golevelup/ts-jest';
// import { ExecutionContext } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Quiz } from './entities/quiz.entity';
import { Question } from '../questions/entities/question.entity';
import { Answer } from '../answers/entities/answer.entity';
import { QuizzesService } from './quizzes.service';
import { QuestionsService } from '../questions/questions.service';
import { AnswersService } from '../answers/answers.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import testquiz2 from '../../test/testquiz';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('QuizzesService', () => {
  let service: QuizzesService;
  let quizzesRepository: Repository<Quiz>;
  let questionsRepository: Repository<Question>;
  let answersRepository: Repository<Answer>;

  const QUIZ_REPOSITORY_TOKEN = getRepositoryToken(Quiz);
  const QUESTION_REPOSITORY_TOKEN = getRepositoryToken(Question);
  const ANSWER_REPOSITORY_TOKEN = getRepositoryToken(Answer);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizzesService,
        QuestionsService,
        AnswersService,
        {
          provide: QUIZ_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn().mockResolvedValue([{ quizzes: 'quizzes' }]),
            findOneOrFail: jest.fn().mockResolvedValue({ quiz: 'quiz' }),
            create: jest.fn().mockReturnValue(testquiz2),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: QUESTION_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn().mockResolvedValue([{ questions: 'questions' }]),
            findOneOrFail: jest
              .fn()
              .mockResolvedValue({ question: 'question' }),
            create: jest.fn().mockReturnValue(testquiz2.questions[0]),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: ANSWER_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn().mockResolvedValue([{ mockanswers: 'mockanswers' }]),
            findOneOrFail: jest
              .fn()
              .mockResolvedValue({ answer: 'mockanswer' }),
            create: jest
              .fn()
              .mockReturnValue(testquiz2.questions[0].answers[0]),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    })
      .useMocker((token) => {
        const results = testquiz2;
        const results2 = testquiz2.questions[0];
        const results3 = testquiz2.questions[0].answers[0];
        if (token === QuizzesService) {
          return { create: jest.fn().mockResolvedValue(results) };
        }
        if (token === QuestionsService) {
          return { create: jest.fn().mockResolvedValue(results2) };
        }
        if (token === AnswersService) {
          return { create: jest.fn().mockResolvedValue(results3) };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    service = module.get<QuizzesService>(QuizzesService);
    quizzesRepository = module.get<Repository<Quiz>>(QUIZ_REPOSITORY_TOKEN);
    questionsRepository = module.get<Repository<Question>>(
      QUESTION_REPOSITORY_TOKEN,
    );
    answersRepository = module.get<Repository<Answer>>(ANSWER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('quizzesRepository should be defined', () => {
    expect(quizzesRepository).toBeDefined();
  });
  it('questionsRepository should be defined', () => {
    expect(questionsRepository).toBeDefined();
  });
  it('answersRepository should be defined', () => {
    expect(answersRepository).toBeDefined();
  });

  // describe('create quiz', () => {
  //   it('should create a new quiz', async () => {
  //     // jest.spyOn('this.answersRepository.save').mockReturnValueOnce(answer);
  //     console.log('TESTQUIZ');
  //     console.log(testquiz2.questions[0].answers[0]);
  //     const result = await service.create(testquiz2);

  //     expect(result).toBeDefined();
  //   });
  // });
});
