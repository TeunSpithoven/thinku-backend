import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { Question } from '../questions/entities/question.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
  ) {}

  create(
    createAnswerDto: CreateAnswerDto,
    question: Question,
  ): Promise<Answer> {
    const answer = new Answer();
    answer.answer = createAnswerDto.answer;
    answer.isCorrect = createAnswerDto.isCorrect;
    answer.question = question;
    return this.answersRepository.save(answer);
  }

  findAll(): Promise<Answer[]> {
    return this.answersRepository.find();
  }

  findOne(id: number): Promise<Answer> {
    return this.answersRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
