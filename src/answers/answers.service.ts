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

  create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const answer = new Answer();
    answer.answer = createAnswerDto.answer;
    answer.isCorrect = createAnswerDto.isCorrect;
    // TODO: this returns undefined! because the repository is not defined during the test
    const huts = this.answersRepository;
    console.log(huts);
    return this.answersRepository.save(answer);
  }

  findAll(): Promise<Answer[]> {
    return this.answersRepository.find();
  }

  findAllById(question: Question): Promise<Answer[]> {
    return this.answersRepository.find({ where: { question: question } });
  }

  findOne(id: number): Promise<Answer> {
    return this.answersRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    const answer = new Answer();
    answer.answer = updateAnswerDto.answer;
    answer.isCorrect = updateAnswerDto.isCorrect;
    // if the submitted answer hasn't been changed, don't update it
    // const currentAnswer = await this.findOne(id);
    // if (currentAnswer === answer) {
    //   return currentAnswer;
    // }
    // update the answer
    const returnAnswer = await this.answersRepository.update(id, answer);
    console.log(returnAnswer);
    return this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} answer`;
  }
}
