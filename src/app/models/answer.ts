import {User} from './user';
import { Post } from './post';

export class Answer {
  id: number;
  creationDate: Date;
  correctAnswer: boolean;
  text = '';
  dislikes: number;
  likes: number;
  post: Post;
  user: User;
}
