import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { Quiz } from '../quizzes/entities/quiz.entity';
import { AnswersService } from '../answers/answers.service';
import { Answer } from '../answers/entities/answer.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    private answersService: AnswersService,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = new Question();
    question.question = createQuestionDto.question;
    question.type = createQuestionDto.type;
    question.time = createQuestionDto.time;
    question.number = createQuestionDto.number;
    const answerList: Answer[] = [];
    for (let i = 0; i < createQuestionDto.answers.length; i++) {
      const answer = createQuestionDto.answers[i];
      const newAnswer = await this.answersService.create(answer);
      answerList.push(newAnswer);
    }
    console.log(`answers: ${answerList}`);
    question.answers = answerList;
    return this.questionsRepository.save(question);
  }

  findAll(): Promise<Question[]> {
    return this.questionsRepository.find();
  }

  findOne(id: number): Promise<Question> {
    return this.questionsRepository.findOne({ where: { id: id } });
  }

  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const question = new Question();
    question.question = updateQuestionDto.question;
    question.type = updateQuestionDto.type;
    question.time = updateQuestionDto.time;
    question.number = updateQuestionDto.number;
    for (let i = 0; i < updateQuestionDto.answers.length; i++) {
      const answer = updateQuestionDto.answers[i];
      await this.answersService.update(answer.id, answer);
    }
    // if the submitted question hasn't been changed, dont update it
    // const currentQuestion = await this.findOne(id);
    // if (currentQuestion === question) {
    //   return currentQuestion;
    // }
    // update the question
    const returnQuestion = await this.questionsRepository.update(id, question);
    console.log(returnQuestion);
    return this.findOne(id);
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
