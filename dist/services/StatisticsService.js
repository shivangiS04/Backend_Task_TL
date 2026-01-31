"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsService = void 0;
class StatisticsService {
    constructor(store) {
        this.store = store;
    }
    getStatistics(userId) {
        let stats = this.store.getStatisticsByUserId(userId);
        if (!stats) {
            stats = {
                userId,
                totalAttempts: 0,
                successfulAttempts: 0,
                successRate: 0,
                lastAttemptAt: new Date().toISOString()
            };
        }
        return stats;
    }
    updateStatistics(userId, submission) {
        let stats = this.store.getStatisticsByUserId(userId);
        if (!stats) {
            stats = {
                userId,
                totalAttempts: 0,
                successfulAttempts: 0,
                successRate: 0,
                lastAttemptAt: submission.timestamp
            };
        }
        stats.totalAttempts += 1;
        if (submission.status === 'correct') {
            stats.successfulAttempts += 1;
        }
        stats.successRate = (stats.successfulAttempts / stats.totalAttempts) * 100;
        stats.lastAttemptAt = submission.timestamp;
        this.store.updateStatistics(stats);
        this.store.saveData();
    }
    getAllStatistics() {
        return this.store.getStatistics();
    }
}
exports.StatisticsService = StatisticsService;
//# sourceMappingURL=StatisticsService.js.map