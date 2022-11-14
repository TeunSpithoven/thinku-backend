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

  create(createQuestionDto: CreateQuestionDto, quiz: Quiz): Promise<Question> {
    const question = new Question();
    question.quiz = quiz;
    question.question = createQuestionDto.question;
    question.type = createQuestionDto.type;
    question.number = createQuestionDto.number;
    let answerList: Answer[];
    for (let i = 0; i < createQuestionDto.answers.length; i++) {
      const answer = createQuestionDto.answers[i];
      const newAnswer = new Answer();
      newAnswer.answer = answer.answer;
      newAnswer.isCorrect = answer.isCorrect;
      newAnswer.question = question;
      answerList.push(newAnswer);
    }
    question.answers = answerList;
    let i = 0;
    for (i; i < question.answers.length; i++) {
      const answer = question.answers[i];
      this.answersService.create(answer, question);
    }
    return this.questionsRepository.save(question);
  }

  findAll(): Promise<Question[]> {
    return this.questionsRepository.find();
  }

  findOne(id: number): Promise<Question> {
    return this.questionsRepository.findOne({ where: { id: id } });
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
