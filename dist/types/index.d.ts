export interface Question {
    id: string;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    problemStatement: string;
    sampleInput: string;
    sampleOutput: string;
    createdAt: string;
}
export interface Submission {
    submissionId: string;
    userId: string;
    questionId: string;
    userCode: string;
    status: 'correct' | 'incorrect' | 'partially_correct';
    message: string;
    timestamp: string;
}
export interface UserStatistics {
    userId: string;
    totalAttempts: number;
    successfulAttempts: number;
    successRate: number;
    lastAttemptAt: string;
}
export interface Hint {
    hintId: string;
    questionId: string;
    hintText: string;
    difficulty: 'basic' | 'intermediate' | 'advanced';
}
export interface LeaderboardEntry {
    rank: number;
    userId: string;
    username: string;
    totalScore: number;
    fastestSubmissionTime: number;
    successRate: number;
}
export interface EvaluationResult {
    status: 'correct' | 'incorrect' | 'partially_correct';
    message: string;
}
//# sourceMappingURL=index.d.ts.map