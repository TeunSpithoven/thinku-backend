import { Injectable } from '@nestjs/common';
import { UpdateGameDto } from './dto/update-game.dto';
import { Quiz } from '../quizzes/entities/quiz.entity';
import { Game } from './entities/game.entity';
import { StudentsService } from '../students/students.service';

const games: Game[] = [];

@Injectable()
export class GamesService {
  constructor(private studentsService: StudentsService) {}
  create(quiz: Quiz) {
    const newGame = new Game();
    newGame.id = games.length + 1;
    newGame.roomCode = 'testcode';
    newGame.quiz = quiz;
    newGame.students = [];
    games.push(newGame);
    return newGame;
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

  remove(id: number) {
    this.studentsService.removeAll(id);
    const index = games.findIndex((game) => game.id === id);
    games.splice(index, 1);
    return `game removed with id: ${id}`;
  }
}
