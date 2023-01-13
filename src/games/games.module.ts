import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesGateway } from './games.gateway';
import { StudentsService } from '../students/students.service';

@Module({
  providers: [GamesGateway, GamesService, StudentsService],
})
export class GamesModule {}
