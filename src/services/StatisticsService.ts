import { UserStatistics, Submission } from '../types';
import { DataStore } from '../data/store';

export class StatisticsService {
  constructor(private store: DataStore) {}

  getStatistics(userId: string): UserStatistics {
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

  updateStatistics(userId: string, submission: Submission): void {
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

  getAllStatistics(): UserStatistics[] {
    return this.store.getStatistics();
  }
}
