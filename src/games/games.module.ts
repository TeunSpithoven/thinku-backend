import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesGateway } from './games.gateway';
import { StudentsService } from '../students/students.service';
import { RoomService } from '../room/room.service';

@Module({
  providers: [GamesGateway, GamesService, StudentsService, RoomService],
})
export class GamesModule {}
