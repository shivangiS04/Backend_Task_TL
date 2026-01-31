import { Hint } from '../types';
import { DataStore } from '../data/store';

export class HintService {
  constructor(private store: DataStore) {}

  getHintsByQuestion(questionId: string): Hint[] {
    const hints = this.store.getHints();
    return hints.filter(h => h.questionId === questionId);
  }

  getAllHints(): Hint[] {
    return this.store.getHints();
  }
}
