import { Question } from '../types';
import { DataStore } from '../data/store';
export declare class QuestionService {
    private store;
    constructor(store: DataStore);
    getTodayQuestion(): Question;
    getQuestionById(id: string): Question | null;
    getAllQuestions(): Question[];
}
//# sourceMappingURL=QuestionService.d.ts.map