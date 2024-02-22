import { DontVisit } from "./DontVisit";

interface Block {
  number: number;
  isFinished: boolean;
}
export interface Card {
  id: string;
  name: string;
  img: string;
  inProgress: boolean;
  finished: boolean;
  finishedAt: string;
  blocks: Array<Block>;
  pendingBlocks: Array<number>;
  records: Array<string>;
  dontVisit: Array<DontVisit>;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateCardData {
  id?: string;
  name: string;
  blocks: number;
  img: string;
}
