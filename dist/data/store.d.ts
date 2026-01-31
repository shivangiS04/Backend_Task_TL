import { Question, Submission, UserStatistics, Hint } from '../types';
export declare class DataStore {
    private questions;
    private submissions;
    private statistics;
    private hints;
    private dataDir;
    constructor(dataDir?: string);
    private ensureDataDir;
    private initializeSeedData;
    loadData(): void;
    saveData(): void;
    private getFilePath;
    private loadQuestions;
    private saveQuestions;
    private loadSubmissions;
    private saveSubmissions;
    private loadStatistics;
    private saveStatistics;
    private loadHints;
    private saveHints;
    getQuestions(): Question[];
    setQuestions(questions: Question[]): void;
    getSubmissions(): Submission[];
    addSubmission(submission: Submission): void;
    getStatistics(): UserStatistics[];
    getStatisticsByUserId(userId: string): UserStatistics | undefined;
    updateStatistics(stats: UserStatistics): void;
    getHints(): Hint[];
    setHints(hints: Hint[]): void;
}
//# sourceMappingURL=store.d.ts.map