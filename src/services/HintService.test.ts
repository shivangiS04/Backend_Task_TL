import { HintService } from './HintService';
import { DataStore } from '../data/store';
import * as fc from 'fast-check';

describe('HintService', () => {
  let service: HintService;
  let store: DataStore;

  beforeEach(() => {
    store = new DataStore('./test-data');
    service = new HintService(store);
  });

  describe('getHintsByQuestion', () => {
    it('should return hints for a question', () => {
      const hints = service.getHintsByQuestion('q1');
      expect(Array.isArray(hints)).toBe(true);
      hints.forEach(hint => {
        expect(hint.questionId).toBe('q1');
      });
    });

    it('should return empty array for question with no hints', () => {
      const hints = service.getHintsByQuestion('nonexistent_question');
      expect(hints).toEqual([]);
    });

    // Property 8: Hint Retrieval Completeness
    it('should retrieve all hints for a question', () => {
      const allHints = service.getAllHints();
      const questionIds = new Set(allHints.map(h => h.questionId));

      questionIds.forEach(questionId => {
        const hints = service.getHintsByQuestion(questionId);
        const expectedHints = allHints.filter(h => h.questionId === questionId);
        expect(hints.length).toBe(expectedHints.length);
      });
    });

    // Property 9: Hint Object Structure
    it('should return hints with all required fields', () => {
      fc.assert(
        fc.property(fc.string(), (questionId: string) => {
          const hints = service.getHintsByQuestion(questionId);
          hints.forEach(hint => {
            expect(hint).toHaveProperty('hintId');
            expect(hint).toHaveProperty('questionId');
            expect(hint).toHaveProperty('hintText');
            expect(hint).toHaveProperty('difficulty');
            expect(hint.hintId).toBeTruthy();
            expect(hint.hintText).toBeTruthy();
            expect(['basic', 'intermediate', 'advanced']).toContain(hint.difficulty);
          });
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('getAllHints', () => {
    it('should return all hints', () => {
      const hints = service.getAllHints();
      expect(Array.isArray(hints)).toBe(true);
      expect(hints.length).toBeGreaterThan(0);
    });
  });
});
