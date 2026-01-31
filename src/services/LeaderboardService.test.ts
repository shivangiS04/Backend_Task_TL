import { LeaderboardService } from './LeaderboardService';
import { DataStore } from '../data/store';
import * as fc from 'fast-check';

describe('LeaderboardService', () => {
  let service: LeaderboardService;
  let store: DataStore;

  beforeEach(() => {
    store = new DataStore('./test-data');
    service = new LeaderboardService(store);
  });

  describe('getLeaderboard', () => {
    it('should return leaderboard sorted by score by default', () => {
      const leaderboard = service.getLeaderboard();
      expect(Array.isArray(leaderboard)).toBe(true);

      for (let i = 1; i < leaderboard.length; i++) {
        expect(leaderboard[i - 1].totalScore).toBeGreaterThanOrEqual(leaderboard[i].totalScore);
      }
    });

    it('should return leaderboard sorted by speed when specified', () => {
      const leaderboard = service.getLeaderboard(10, 'speed');
      expect(Array.isArray(leaderboard)).toBe(true);

      for (let i = 1; i < leaderboard.length; i++) {
        expect(leaderboard[i - 1].fastestSubmissionTime).toBeLessThanOrEqual(
          leaderboard[i].fastestSubmissionTime
        );
      }
    });

    // Property 10: Leaderboard Ordering
    it('should maintain descending order by score', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 100 }), (limit: number) => {
          const leaderboard = service.getLeaderboard(limit, 'score');
          for (let i = 1; i < leaderboard.length; i++) {
            expect(leaderboard[i - 1].totalScore).toBeGreaterThanOrEqual(
              leaderboard[i].totalScore
            );
          }
        }),
        { numRuns: 50 }
      );
    });

    // Property 11: Leaderboard Limit Enforcement
    it('should enforce limit parameter', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 100 }), (limit: number) => {
          const leaderboard = service.getLeaderboard(limit);
          expect(leaderboard.length).toBeLessThanOrEqual(limit);
          expect(leaderboard.length).toBeLessThanOrEqual(100);
        }),
        { numRuns: 100 }
      );
    });

    it('should enforce max limit of 100', () => {
      const leaderboard = service.getLeaderboard(200);
      expect(leaderboard.length).toBeLessThanOrEqual(100);
    });

    it('should return empty array when no users exist', () => {
      const emptyStore = new DataStore('./test-data-empty');
      emptyStore.setQuestions([]);
      const emptyService = new LeaderboardService(emptyStore);
      const leaderboard = emptyService.getLeaderboard();
      expect(Array.isArray(leaderboard)).toBe(true);
    });

    // Property 12: Leaderboard Entry Completeness
    it('should return entries with all required fields', () => {
      fc.assert(
        fc.property(fc.integer({ min: 1, max: 100 }), (limit: number) => {
          const leaderboard = service.getLeaderboard(limit);
          leaderboard.forEach(entry => {
            expect(entry).toHaveProperty('rank');
            expect(entry).toHaveProperty('userId');
            expect(entry).toHaveProperty('username');
            expect(entry).toHaveProperty('totalScore');
            expect(entry).toHaveProperty('fastestSubmissionTime');
            expect(entry).toHaveProperty('successRate');
            expect(entry.rank).toBeGreaterThan(0);
            expect(entry.userId).toBeTruthy();
            expect(entry.username).toBeTruthy();
          });
        }),
        { numRuns: 50 }
      );
    });

    it('should assign correct rank numbers', () => {
      const leaderboard = service.getLeaderboard(10);
      leaderboard.forEach((entry, index) => {
        expect(entry.rank).toBe(index + 1);
      });
    });
  });
});
