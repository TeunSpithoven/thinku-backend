import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizzesRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
  ) {}

  create(createQuizDto: CreateQuizDto): Promise<Quiz> {
    this.questionsRepository.save(createQuizDto.questions);
    let i = 0;
    for (i; i < createQuizDto.questions.length; i++) {
      this.answersRepository.save(createQuizDto.questions[i].answers);
    }
    return this.quizzesRepository.save(createQuizDto);
  }

  findAll(): Promise<Quiz[]> {
    return this.quizzesRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
