import { Module } from '@nestjs/common';
// import { CaslModule } from '../casl/casl.module';
import { StudentsModule } from '../students/students.module';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { StudentsService } from '../students/students.service';

@Module({
  imports: [StudentsModule],
  controllers: [RoomController],
  providers: [RoomService, StudentsService],
  exports: [RoomService],
})
export class RoomModule {}
