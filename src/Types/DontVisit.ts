import { Card } from './Cards';

export interface DontVisit {
  id?: string;
  card: Card;
  street: string;
  number: string;
  type: string;
  observations: string;
}

export interface ICreateDontVisitData {
  id?: string;
  card: string;
  type: string;
  street: string;
  number: string;
  observations: string;
}
