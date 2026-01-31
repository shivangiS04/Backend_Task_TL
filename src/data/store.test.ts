import { DataStore } from './store';
import { Submission, UserStatistics } from '../types';
import * as fs from 'fs';
import * as path from 'path';
import * as fc from 'fast-check';

describe('DataStore', () => {
  const testDataDir = './test-data-store';

  beforeEach(() => {
    if (fs.existsSync(testDataDir)) {
      fs.rmSync(testDataDir, { recursive: true });
    }
  });

  afterEach(() => {
    if (fs.existsSync(testDataDir)) {
      fs.rmSync(testDataDir, { recursive: true });
    }
  });

  describe('initialization', () => {
    it('should create data directory if it does not exist', () => {
      const store = new DataStore(testDataDir);
      expect(fs.existsSync(testDataDir)).toBe(true);
    });

    it('should initialize with seed data', () => {
      const store = new DataStore(testDataDir);
      expect(store.getQuestions().length).toBeGreaterThan(0);
      expect(store.getHints().length).toBeGreaterThan(0);
    });
  });

  describe('questions', () => {
    it('should save and load questions', () => {
      const store1 = new DataStore(testDataDir);
      const questions = store1.getQuestions();
      expect(questions.length).toBeGreaterThan(0);

      const store2 = new DataStore(testDataDir);
      const loadedQuestions = store2.getQuestions();
      expect(loadedQuestions).toEqual(questions);
    });
  });

  describe('submissions', () => {
    it('should add and retrieve submissions', () => {
      const store = new DataStore(testDataDir);
      const submission: Submission = {
        submissionId: 'sub_1',
        userId: 'user_1',
        questionId: 'q1',
        userCode: 'code',
        status: 'correct',
        message: 'test',
        timestamp: new Date().toISOString()
      };

      store.addSubmission(submission);
      store.saveData();

      const store2 = new DataStore(testDataDir);
      const submissions = store2.getSubmissions();
      expect(submissions).toContainEqual(submission);
    });

    // Property 16: Data Persistence Round-trip
    it('should persist and retrieve submissions correctly', () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.string(),
          fc.string(),
          (userId: string, questionId: string, userCode: string) => {
            const store1 = new DataStore(testDataDir);
            const submission: Submission = {
              submissionId: `sub_${Math.random()}`,
              userId,
              questionId,
              userCode,
              status: 'correct',
              message: 'test',
              timestamp: new Date().toISOString()
            };

            store1.addSubmission(submission);
            store1.saveData();

            const store2 = new DataStore(testDataDir);
            const submissions = store2.getSubmissions();
            const found = submissions.find(s => s.submissionId === submission.submissionId);
            expect(found).toEqual(submission);
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('statistics', () => {
    it('should update and retrieve statistics', () => {
      const store = new DataStore(testDataDir);
      const stats: UserStatistics = {
        userId: 'user_1',
        totalAttempts: 5,
        successfulAttempts: 3,
        successRate: 60,
        lastAttemptAt: new Date().toISOString()
      };

      store.updateStatistics(stats);
      store.saveData();

      const store2 = new DataStore(testDataDir);
      const retrieved = store2.getStatisticsByUserId('user_1');
      expect(retrieved).toEqual(stats);
    });

    // Property 16: Data Persistence Round-trip
    it('should persist and retrieve statistics correctly', () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.integer({ min: 0, max: 1000 }),
          fc.integer({ min: 0, max: 1000 }),
          (userId: string, total: number, successful: number) => {
            const adjustedSuccessful = Math.min(successful, total);
            const store1 = new DataStore(testDataDir);
            const stats: UserStatistics = {
              userId,
              totalAttempts: total,
              successfulAttempts: adjustedSuccessful,
              successRate: total > 0 ? (adjustedSuccessful / total) * 100 : 0,
              lastAttemptAt: new Date().toISOString()
            };

            store1.updateStatistics(stats);
            store1.saveData();

            const store2 = new DataStore(testDataDir);
            const retrieved = store2.getStatisticsByUserId(userId);
            expect(retrieved).toEqual(stats);
          }
        ),
        { numRuns: 50 }
      );
    });
  });

  describe('hints', () => {
    it('should save and load hints', () => {
      const store1 = new DataStore(testDataDir);
      const hints = store1.getHints();
      expect(hints.length).toBeGreaterThan(0);

      const store2 = new DataStore(testDataDir);
      const loadedHints = store2.getHints();
      expect(loadedHints).toEqual(hints);
    });
  });
});
