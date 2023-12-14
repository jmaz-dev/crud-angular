import { Lesson } from '../lessons/lesson';

export interface Course {
  _id: string;
  name: string;
  category: string;
  lessons?: Lesson[];
}
