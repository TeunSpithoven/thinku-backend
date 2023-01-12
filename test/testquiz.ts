import { Answer } from '../src/answers/entities/answer.entity';
import { Question } from '../src/questions/entities/question.entity';
import { CreateQuizDto } from '../src/quizzes/dto/create-quiz.dto';

const testquiz2 = new CreateQuizDto();
const question2 = new Question();
const answer2 = new Answer();

testquiz2.userId = 3;
testquiz2.title = 'testQuiz';
testquiz2.description = 'testDescription';
testquiz2.image = 'imageLocation';
testquiz2.questions = [];

question2.id = 3;
question2.question = 'testQuestion';
question2.type = 'open';
question2.time = 3;
question2.number = 3;
question2.answers = [];

answer2.id = 3;
answer2.question = question2;
answer2.answer = 'testAnswer';
answer2.isCorrect = true;

question2.answers.push(answer2);
testquiz2.questions.push(question2);

const testquiz = {
  userId: 3,
  title: 'testQuiz',
  description: 'this test is was created for a unit test',
  image: 'imageLocation',
  questions: [],
};
const question = {
  id: 3,
  quiz: testquiz,
  question: 'testQuestion',
  type: 'open',
  time: 3,
  number: 3,
  answers: [],
};
const answer = {
  id: 3,
  question: question,
  answer: 'testAnswer',
  isCorrect: true,
};
testquiz.questions.push(question);
testquiz.questions[0].answers.push(answer);

export default testquiz2;
