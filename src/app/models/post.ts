import {User} from './user';

export class Post {
  id: number;
  creationDate: Date;
  title = '';
  description = '';
  status: boolean;
  dislikes: number;
  likes: number;
  subject: string;
  user: User;
}
