import {
  SocketId,
  User as UserType,
  UserId,
  UserName,
} from '../../games/interfaces/chat.interface';

export class User implements UserType {
  constructor(attrs: UserType) {
    Object.assign(this, attrs);
  }
  userId: UserId;
  userName: UserName;
  socketId: SocketId;
}
