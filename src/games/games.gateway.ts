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
import {
  ServerToClientEvents,
  ClientToServerEvents,
  Message,
  JoinRoom,
  KickUser,
} from './interfaces/chat.interface';
import { RoomService } from '../room/room.service';
import { StudentsService } from '../students/students.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
// class Message {
//   student: Student;
//   timeSent: string;
//   message: string;
//   roomName: string;
// }
export class GamesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    // private readonly gamesService: GamesService,
    private roomService: RoomService,
    private studentsService: StudentsService,
  ) {}

  @WebSocketServer() server: Server = new Server<
    ServerToClientEvents,
    ClientToServerEvents
  >();

  @SubscribeMessage('chat')
  async handleChatEvent(
    @MessageBody()
    payload: Message,
  ): Promise<boolean> {
    console.log(payload);
    this.server.to(payload.roomName).emit('chat', payload);
    return true;
  }

  @SubscribeMessage('join_room')
  async handleSetClientDataEvent(
    @MessageBody()
    payload: JoinRoom,
  ): Promise<boolean> {
    console.log(
      `${payload.user.socketId} aka ${payload.user.userName} is joining ${payload.roomName}`,
    );
    const newStudent = new Student(payload.user);
    await this.studentsService.addStudent(newStudent);
    await this.server.in(payload.user.socketId).socketsJoin(payload.roomName);
    await this.roomService.addUserToRoom(payload.roomName, payload.user.userId);
    return true;
  }

  @SubscribeMessage('kick_user')
  async handleKickUserEvent(
    @MessageBody() payload: KickUser,
  ): Promise<boolean> {
    console.log(
      `${payload.userToKick.userName} is getting kicked from ${payload.roomName}`,
    );
    await this.server.to(payload.roomName).emit('kick_user', payload);
    await this.server
      .in(payload.userToKick.socketId)
      .socketsLeave(payload.roomName);
    await this.server.to(payload.roomName).emit('chat', {
      user: {
        userId: 'serverId',
        userName: 'TheServer',
        socketId: 'ServerSocketId',
      },
      timeSent: new Date(Date.now()).toLocaleString('en-US'),
      message: `${payload.userToKick.userName} was kicked.`,
      roomName: payload.roomName,
    });
    return true;
  }

  // @SubscribeMessage('removeGame')
  // remove(@MessageBody() id: string) {
  //   return this.gamesService.remove(id);
  // }

  async handleConnection(socket: Socket): Promise<void> {
    console.log(`Socket connected: ${socket.id}`);
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    const user = await this.roomService.getFirstInstanceOfUser(socket.id);
    if (user !== 'Not Exists') {
      await this.studentsService.removeStudentById(user.userId);
    }
    await this.roomService.removeUserFromAllRooms(socket.id);
    console.log(`Socket disconnected: ${socket.id}`);
  }
}
