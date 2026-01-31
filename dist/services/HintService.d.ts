import { Hint } from '../types';
import { DataStore } from '../data/store';
export declare class HintService {
    private store;
    constructor(store: DataStore);
    getHintsByQuestion(questionId: string): Hint[];
    getAllHints(): Hint[];
}
//# sourceMappingURL=HintService.d.ts.map