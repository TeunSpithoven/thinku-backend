import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuestionsService } from '../questions/questions.service';
import { Question } from '../questions/entities/question.entity';
import { isInt16Array } from 'util/types';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizzesRepository: Repository<Quiz>,

    private questionService: QuestionsService,
  ) {}

  create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    const quiz = new Quiz();
    quiz.userId = createQuizDto.userId;
    quiz.title = createQuizDto.title;
    quiz.description = createQuizDto.description;
    quiz.image = createQuizDto.image;
    let questionList = Question[];
    for (let i = 0; i < createQuizDto.questions.length; i++) {
      const question = createQuizDto.questions[i];
      const newQuestion = new Question();
      newQuestion.question = question.question;
      newQuestion.number = question.number;
      newQuestion.answers = question.answers;
      newQuestion.type = question.type;
      newQuestion.quiz = quiz;
      questionList.push(newQuestion);
    }
    quiz.questions = questionList;
    let i = 0;
    for (i; i < createQuizDto.questions.length; i++) {
      const question = createQuizDto.questions[i];
      this.questionService.create(question, quiz);
    }
    return this.quizzesRepository.save(quiz);
  }

  findAll(): Promise<Quiz[]> {
    return this.quizzesRepository.find();
  }

  findOne(id: number): Promise<Quiz> {
    return this.quizzesRepository.findOne({
      where: { id: id },
      relations: { questions: true },
    });
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
