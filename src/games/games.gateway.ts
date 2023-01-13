import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Student } from '../students/entities/student.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
class Message {
  student: Student;
  timeSent: string;
  message: string;
  roomName: string;
}

export class GamesGateway {
  constructor(private readonly gamesService: GamesService) {}

  @WebSocketServer() server: Server = new Server();

  @SubscribeMessage('chat')
  async handleChatEvent(
    @MessageBody()
    payload: Message,
  ): Promise<Message> {
    console.log(payload);
    this.server.to(payload.roomName).emit('chat', payload);
    return payload;
  }

  @SubscribeMessage('join_room')
  async handleSetClientDataEvent(
    @MessageBody()
    payload: {
      roomName: string;
      student: Student;
    },
  ) {
    if (payload.student.gameId) {
      console.log(`${payload.student.gameId} is joining ${payload.roomName}`);
      await this.server
        .in(payload.student.gameId)
        .socketsJoin(payload.roomName);
      await this.gamesService.addStudentToGame(
        payload.roomName,
        payload.student,
      );
    }
  }

  @SubscribeMessage('removeGame')
  remove(@MessageBody() id: string) {
    return this.gamesService.remove(id);
  }
}
