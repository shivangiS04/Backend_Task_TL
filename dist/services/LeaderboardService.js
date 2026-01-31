"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardService = void 0;
class LeaderboardService {
    constructor(store) {
        this.store = store;
    }
    getLeaderboard(limit = 10, sortBy = 'score') {
        const maxLimit = Math.min(limit, 100);
        const statistics = this.store.getStatistics();
        const submissions = this.store.getSubmissions();
        const entries = statistics.map((stat, index) => {
            const userSubmissions = submissions.filter(s => s.userId === stat.userId);
            const fastestTime = this.calculateFastestTime(userSubmissions);
            const totalScore = this.calculateScore(stat);
            return {
                rank: index + 1,
                userId: stat.userId,
                username: `user_${stat.userId.substring(0, 8)}`,
                totalScore,
                fastestSubmissionTime: fastestTime,
                successRate: stat.successRate
            };
        });
        if (sortBy === 'speed') {
            entries.sort((a, b) => a.fastestSubmissionTime - b.fastestSubmissionTime);
        }
        else {
            entries.sort((a, b) => b.totalScore - a.totalScore);
        }
        return entries.slice(0, maxLimit).map((entry, index) => ({
            ...entry,
            rank: index + 1
        }));
    }
    calculateScore(stat) {
        return Math.round(stat.successfulAttempts * 100 + stat.successRate);
    }
    calculateFastestTime(submissions) {
        if (submissions.length === 0)
            return 0;
        return submissions.length * 10;
    }
}
exports.LeaderboardService = LeaderboardService;
//# sourceMappingURL=LeaderboardService.js.map