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
    question.number = createQuestionDto.number;
    const answerList: Answer[] = [];
    console.log(`answers.length: ${createQuestionDto.answers.length}`);
    for (let i = 0; i < createQuestionDto.answers.length; i++) {
      const answer = createQuestionDto.answers[i];
      console.log(`answer: ${answer.answer}`);
      const fakeAnswer = await this.answersService.create({
        answer: 'ja',
        isCorrect: true,
      });
      console.log(`fakeanswer: ${fakeAnswer}`);
      const newAnswer = await this.answersService.create(answer);
      console.log(newAnswer);
      answerList.push(newAnswer);
      console.log(
        `new answer with id: ${newAnswer.id} answer: ${newAnswer.answer}}`,
      );
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

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
