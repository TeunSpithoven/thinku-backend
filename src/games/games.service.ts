import { Injectable } from '@nestjs/common';
import { UpdateGameDto } from './dto/update-game.dto';
import { Quiz } from '../quizzes/entities/quiz.entity';
import { Game } from './entities/game.entity';
import { StudentsService } from '../students/students.service';
import { GamesGateway } from './games.gateway';
import { Student } from '../students/entities/student.entity';

const games: Game[] = [];

@Injectable()
export class GamesService {
  constructor(
    private studentsService: StudentsService,
    private gamesGateway: GamesGateway,
  ) {}
  create(quiz: Quiz) {
    const newGame = new Game();
    newGame.id = games.length + 1;
    newGame.quiz = quiz;
    newGame.students = [];
    games.push(newGame);
    newGame.roomCode = `testroom${newGame.id}`;
    // this.gamesGateway.createRoom(newGame.roomCode);
    return newGame;
  }

  addStudentToGame(roomcode: string, student: Student) {
    const index = games.findIndex((games) => games.roomCode === roomcode);
    if (index > -1) {
      games[index].students.push(student);
    }
  }

  findAll() {
    return games;
  }

  findOne(id: number) {
    return games.find((games) => games.id === id);
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    const index = games.findIndex((game) => game.id === id);
    games[index].roomCode = updateGameDto.roomCode;
    games[index].students = updateGameDto.students;
    return this.findOne(id);
  }

  remove(id: string) {
    const index = games.findIndex((game) => game.roomCode === id);
    games.splice(index, 1);
    return `game removed with id: ${id}`;
  }
}
