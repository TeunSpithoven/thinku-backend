import { Test, TestingModule } from '@nestjs/testing';
import { QuestionsService } from '../questions/questions.service';
import { AnswersService } from '../answers/answers.service';
import { Quiz } from './entities/quiz.entity';
import { QuizzesService } from './quizzes.service';

describe('QuizzesService', () => {
  let service: QuizzesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizzesService, QuestionsService],
    }).compile();

    service = module.get<QuizzesService>(QuizzesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
