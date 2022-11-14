import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuestionsService } from '../questions/questions.service';
import { AnswersService } from '../answers/answers.service';

@EventSubscriber()
export class QuizSubscriber implements EntitySubscriberInterface<Quiz> {
  constructor(
    dataSource: DataSource,
    private questionsService: QuestionsService,
    private answersService: AnswersService,
  ) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Quiz;
  }

  beforeInsert(event: InsertEvent<Quiz>) {
    // let i = 0;
    // for (i; i < event.entity.questions.length; i++) {
    //   const q = event.entity.questions[i];
    //   const newQuestion = {
    //     quizId: event.entity.id,
    //     question: q.question,
    //     type: q.type,
    //     number: q.number,
    //     answers: q.answers,
    //   };
    //   this.questionsService.create(newQuestion);
    //   let ai = 0;
    //   for (ai; ai < event.entity.questions[i].answers.length; ai++) {
    //     this.answersService.create(event.entity.questions[i].answers[ai]);
    //   }
    // }
    console.log(`BEFORE QUIZ INSERTED: `, event.entity);
  }
}
