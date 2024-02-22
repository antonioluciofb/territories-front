import { Card } from './Cards';
import { Record } from './Records';

export interface TerritoryClosures {
  id?: string;
  startDate: string;
  endDate: string;
  periodRange: string;
  cards: Array<Card>;
  records: Array<Record>;
}
