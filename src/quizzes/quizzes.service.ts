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

  async update(id: number, updateQuizDto: UpdateQuizDto): Promise<Quiz> {
    const quiz = new Quiz();
    quiz.userId = updateQuizDto.userId;
    quiz.title = updateQuizDto.title;
    quiz.description = updateQuizDto.description;
    quiz.image = updateQuizDto.image;
    const questionList: Question[] = [];
    let i = 0;
    for (i; i < updateQuizDto.questions.length; i++) {
      const q = updateQuizDto.questions[i];
      // if the question alrady exists, update. else create a new question
      if (q.id === undefined) {
        console.log(`q.id: ${q.id}`);
        console.log(q.type);
        // DEBUG: hier ongeveer doe ik iets fout wat goed gaat in de questionscontroller bij de answers
        const newQuestion = await this.questionService.create(q);
        questionList.push(newQuestion);
      } else {
        const updatedQuestion = await this.questionService.update(q.id, q);
        questionList.push(updatedQuestion);
      }
    }
    quiz.questions = questionList;
    const returnQuiz = await this.quizzesRepository.update(id, quiz);
    console.log(returnQuiz);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.quizzesRepository.delete(id);
  }

  async setImage(id: number, imageUrl: string) {
    this.update(id, { image: imageUrl });
  }
}
