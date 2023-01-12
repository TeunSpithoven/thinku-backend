import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import testquiz2 from '../../test/testquiz';
import { Repository } from 'typeorm';
import { Quiz } from '../quizzes/entities/quiz.entity';
import { QuizzesService } from '../quizzes/quizzes.service';
import { QuestionsService } from '../questions/questions.service';
import { AnswersService } from '../answers/answers.service';
import { Question } from '../questions/entities/question.entity';
import { Answer } from '../answers/entities/answer.entity';

describe('QuizzesService using createMock with DI', () => {
  let repo: Repository<Quiz>;
  let repo2: Repository<Question>;
  let repo3: Repository<Answer>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        QuizzesService,
        {
          provide: getRepositoryToken(Quiz),
          useValue: createMock<Repository<Quiz>>(),
        },
        QuestionsService,
        {
          provide: getRepositoryToken(Question),
          useValue: createMock<Repository<Question>>(),
        },
        AnswersService,
        {
          provide: getRepositoryToken(Answer),
          useValue: createMock<Repository<Answer>>(),
        },
      ],
    }).compile();

    repo = module.get<Repository<Quiz>>(getRepositoryToken(Quiz));
    repo2 = module.get<Repository<Question>>(getRepositoryToken(Question));
    repo3 = module.get<Repository<Answer>>(getRepositoryToken(Answer));
  });

  it('should have the repo mocked', () => {
    expect(typeof repo.find).toBe('function');
  });
  it('should have the repo mocked', () => {
    expect(typeof repo2.find).toBe('function');
  });
  it('should have the repo mocked', () => {
    expect(typeof repo3.find).toBe('function');
  });
});

describe('QuizzesService using createMock without DI', () => {
  const repo = createMock<Repository<Quiz>>();
  const repo2 = createMock<Repository<Question>>();
  const repo3 = createMock<Repository<Answer>>();

  beforeEach(async () => {
    await Test.createTestingModule({
      providers: [
        QuizzesService,
        {
          provide: getRepositoryToken(Quiz),
          useValue: repo,
        },
        QuestionsService,
        {
          provide: getRepositoryToken(Question),
          useValue: repo,
        },
        AnswersService,
        {
          provide: getRepositoryToken(Answer),
          useValue: repo,
        },
      ],
    }).compile();
  });

  const quiz = new Quiz();
  quiz.id = 1;
  quiz.userId = testquiz2.userId;
  quiz.title = testquiz2.title;
  quiz.description = testquiz2.description;
  quiz.image = testquiz2.image;
  quiz.questions = testquiz2.questions;

  it('should have the repo mocked', async () => {
    repo.find.mockResolvedValue([quiz]);
    // tslint:disable-next-line: no-invalid-await
    expect(await repo.find()).toEqual([quiz]);
  });

  it('should have the repo mocked', async () => {
    repo2.find.mockResolvedValue([testquiz2.questions[0]]);
    // tslint:disable-next-line: no-invalid-await
    expect(await repo2.find()).toEqual([testquiz2.questions[0]]);
  });

  it('should have the repo mocked', async () => {
    const answer = new Answer();
    answer.id = 1;

    repo3.find.mockResolvedValue([testquiz2.questions[0].answers[0]]);
    // tslint:disable-next-line: no-invalid-await
    expect(await repo3.find()).toEqual([testquiz2.questions[0].answers[0]]);
  });

  it('should create a new quiz', async () => {
    repo.save.mockResolvedValue(quiz);

    const newQuiz = await repo.save(quiz);

    expect(newQuiz).toEqual(quiz);
  });
});
