import { UserI } from './user'

export interface PenaltyI {
  id: number;
  company: string;
  amount: string;
  datePenalty: Date;
  users?: UserI[];
}
