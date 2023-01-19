import {
  RoomName,
  Room as RoomType,
  User,
} from '../../games/interfaces/chat.interface';

export class Room implements RoomType {
  constructor(attrs: RoomType) {
    Object.assign(this, attrs);
  }
  name: RoomName;
  host: User;
  users: User[];
}
