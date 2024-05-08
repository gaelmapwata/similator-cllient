import { UserI } from './user'

export interface PenaltyI {
  id: number;
  company: string;
  amount: number;
  datePenalty: Date;
  users?: UserI[];
}
