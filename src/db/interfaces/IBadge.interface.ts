import { IDataBaseDoc } from './IDatabaseDoc.interface';

export enum BadgeConditionType {
  STREAK = 'streak',
  XP = 'xp',
  LESSONS = 'lessons',
  QUIZZES = 'quizzes',
  MASTER_WORDS = 'master_words',
}
export interface ICondition {
  type: BadgeConditionType;
  value: number;
}
export interface IBadge extends IDataBaseDoc {
  name: string;
  description: string;
  icon_url: string;
  condition: ICondition;
}
