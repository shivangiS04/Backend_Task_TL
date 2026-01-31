import { LeaderboardEntry, Submission, UserStatistics } from '../types';
import { DataStore } from '../data/store';

export class LeaderboardService {
  constructor(private store: DataStore) {}

  getLeaderboard(limit: number = 10, sortBy: 'score' | 'speed' = 'score'): LeaderboardEntry[] {
    const maxLimit = Math.min(limit, 100);
    const statistics = this.store.getStatistics();
    const submissions = this.store.getSubmissions();

    const entries: LeaderboardEntry[] = statistics.map((stat, index) => {
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
    } else {
      entries.sort((a, b) => b.totalScore - a.totalScore);
    }

    return entries.slice(0, maxLimit).map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
  }

  private calculateScore(stat: UserStatistics): number {
    return Math.round(stat.successfulAttempts * 100 + stat.successRate);
  }

  private calculateFastestTime(submissions: Submission[]): number {
    if (submissions.length === 0) return 0;
    return submissions.length * 10;
  }
}
