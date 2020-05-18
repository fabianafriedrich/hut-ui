import { Role } from './role';
export class User {
  id: number;
  email = '';
  password = '';
  name = '';
  studentId: number;
  role: Role;
  points: number;
  token = '';
  mailMessage = '';
}
