import { Question } from '../types';
import { DataStore } from '../data/store';
import { NotFoundError } from '../utils/errors';

export class QuestionService {
  constructor(private store: DataStore) {}

  getTodayQuestion(): Question {
    const questions = this.store.getQuestions();
    if (questions.length === 0) {
      throw new NotFoundError('No questions available');
    }

    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
    );
    const index = dayOfYear % questions.length;

    return questions[index];
  }

  getQuestionById(id: string): Question | null {
    const questions = this.store.getQuestions();
    return questions.find(q => q.id === id) || null;
  }

  getAllQuestions(): Question[] {
    return this.store.getQuestions();
  }
}
