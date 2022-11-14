import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuestionsService } from '../questions/questions.service';
import { Question } from '../questions/entities/question.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizzesRepository: Repository<Quiz>,

    private questionService: QuestionsService,
  ) {}

  async create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = new Quiz();
    quiz.userId = createQuizDto.userId;
    quiz.title = createQuizDto.title;
    quiz.description = createQuizDto.description;
    quiz.image = createQuizDto.image;
    const questionList: Question[] = [];
    let i = 0;
    for (i; i < createQuizDto.questions.length; i++) {
      const question = createQuizDto.questions[i];
      const newQuestion = await this.questionService.create(question);
      questionList.push(newQuestion);
    }
    quiz.questions = questionList;
    return this.quizzesRepository.save(quiz);
  }

  findAll(): Promise<Quiz[]> {
    return this.quizzesRepository.find();
  }

  findOne(id: number): Promise<Quiz> {
    return this.quizzesRepository.findOne({
      where: { id: id },
      relations: { questions: { answers: true } },
    });
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
