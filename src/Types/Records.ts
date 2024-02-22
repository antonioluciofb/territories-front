import { Card } from './Cards';
import { User } from './User';

export interface Record {
  id: string;
  card: Card;
  designated: User;
  periodOfDay: string;
  date: string;
  pendingBlocks: Array<number>;
  createdAt: string;
}

export interface CreateRecord {
  id?: string;
  card: string;
  designated: string;
  periodOfDay: string;
  date: string;
  pendingBlocks: Array<number>;
}
