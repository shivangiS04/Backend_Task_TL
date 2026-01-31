import { Submission, EvaluationResult } from '../types';
import { DataStore } from '../data/store';
export declare class SubmissionService {
    private store;
    constructor(store: DataStore);
    evaluateSubmission(questionId: string, userCode: string): EvaluationResult;
    saveSubmission(submission: Submission): void;
    getSubmissionsByUser(userId: string): Submission[];
    createSubmission(userId: string, questionId: string, userCode: string, status: string, message: string): Submission;
}
//# sourceMappingURL=SubmissionService.d.ts.map