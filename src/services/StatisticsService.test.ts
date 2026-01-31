import { StatisticsService } from './StatisticsService';
import { DataStore } from '../data/store';
import { Submission } from '../types';
import * as fc from 'fast-check';

describe('StatisticsService', () => {
  let service: StatisticsService;
  let store: DataStore;

  beforeEach(() => {
    store = new DataStore('./test-data');
    service = new StatisticsService(store);
  });

  describe('getStatistics', () => {
    it('should return statistics for existing user', () => {
      const stats = service.getStatistics('user_1');
      expect(stats.userId).toBe('user_1');
      expect(stats.totalAttempts).toBeGreaterThanOrEqual(0);
      expect(stats.successfulAttempts).toBeGreaterThanOrEqual(0);
      expect(stats.successRate).toBeGreaterThanOrEqual(0);
    });

    it('should return zero statistics for new user', () => {
      const stats = service.getStatistics('new_user_xyz');
      expect(stats.userId).toBe('new_user_xyz');
      expect(stats.totalAttempts).toBe(0);
      expect(stats.successfulAttempts).toBe(0);
      expect(stats.successRate).toBe(0);
    });

    // Property 7: Statistics Completeness
    it('should return all required fields', () => {
      fc.assert(
        fc.property(fc.string(), (userId: string) => {
          const stats = service.getStatistics(userId);
          expect(stats).toHaveProperty('userId');
          expect(stats).toHaveProperty('totalAttempts');
          expect(stats).toHaveProperty('successfulAttempts');
          expect(stats).toHaveProperty('successRate');
          expect(stats).toHaveProperty('lastAttemptAt');
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('updateStatistics', () => {
    // Property 6: Statistics Accuracy
    it('should calculate success rate correctly', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 100 }),
          fc.integer({ min: 0, max: 100 }),
          (total: number, successful: number) => {
            const adjustedSuccessful = Math.min(successful, total);
            const userId = `test_user_${Math.random()}`;
            
            for (let i = 0; i < total; i++) {
              const submission: Submission = {
                submissionId: `sub_${i}`,
                userId,
                questionId: 'q1',
                userCode: 'code',
                status: i < adjustedSuccessful ? 'correct' : 'incorrect',
                message: 'test',
                timestamp: new Date().toISOString()
              };
              service.updateStatistics(userId, submission);
            }

            const stats = service.getStatistics(userId);
            const expectedRate = (adjustedSuccessful / total) * 100;
            expect(stats.successRate).toBeCloseTo(expectedRate, 1);
            expect(stats.totalAttempts).toBe(total);
            expect(stats.successfulAttempts).toBe(adjustedSuccessful);
          }
        ),
        { numRuns: 50 }
      );
    });

    it('should update lastAttemptAt timestamp', () => {
      const userId = 'test_user';
      const submission: Submission = {
        submissionId: 'sub_1',
        userId,
        questionId: 'q1',
        userCode: 'code',
        status: 'correct',
        message: 'test',
        timestamp: new Date().toISOString()
      };

      service.updateStatistics(userId, submission);
      const stats = service.getStatistics(userId);
      expect(stats.lastAttemptAt).toBe(submission.timestamp);
    });
  });

  describe('getAllStatistics', () => {
    it('should return array of statistics', () => {
      const allStats = service.getAllStatistics();
      expect(Array.isArray(allStats)).toBe(true);
      allStats.forEach(stat => {
        expect(stat).toHaveProperty('userId');
        expect(stat).toHaveProperty('totalAttempts');
        expect(stat).toHaveProperty('successfulAttempts');
        expect(stat).toHaveProperty('successRate');
      });
    });
  });
});
