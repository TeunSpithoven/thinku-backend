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
          // useClass: Quiz,
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: QUESTION_REPOSITORY_TOKEN,
          // useClass: Question,
          useValue: {
            save: jest.fn(),
          },
        },
        {
          provide: ANSWER_REPOSITORY_TOKEN,
          // useClass: Answer,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

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
  it('quizzesRepository should be defined', () => {
    expect(questionsRepository).toBeDefined();
  });
  it('quizzesRepository should be defined', () => {
    expect(answersRepository).toBeDefined();
  });

  describe('create quiz', () => {
    it('should create a new quiz', async () => {
      const quiz = {
        userId: 3,
        title: 'testQuiz',
        description: 'this test is was created for a unit test',
        image: 'imageLocation',
        questions: [],
      };
      const question = {
        id: 3,
        quiz: quiz,
        question: 'testQuestion',
        type: 'open',
        time: 3,
        number: 3,
        answers: [],
      };
      const answer = {
        id: 3,
        question: question,
        answer: 'testAnswer',
        isCorrect: true,
      };
      quiz.questions.push(question);
      quiz.questions[0].answers.push(answer);

      // jest.spyOn('this.answersRepository.save').mockReturnValueOnce(answer);
      const result = await service.create(quiz);

      expect(result).toBeDefined();
    });
  });
});
