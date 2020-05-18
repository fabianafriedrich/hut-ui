import {User} from './user';

export class Post {
  id: number;
  creationDate: Date;
  title = '';
  description = '';
  status: string;
  dislikes: number;
  likes: number;
  subjects: string;
  user: User;
}
