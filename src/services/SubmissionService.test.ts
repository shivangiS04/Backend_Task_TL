import { SubmissionService } from './SubmissionService';
import { DataStore } from '../data/store';
import * as fc from 'fast-check';

describe('SubmissionService', () => {
  let service: SubmissionService;
  let store: DataStore;

  beforeEach(() => {
    store = new DataStore('./test-data');
    service = new SubmissionService(store);
  });

  describe('evaluateSubmission', () => {
    it('should return correct status for exact match', () => {
      const result = service.evaluateSubmission('q1', '[0, 1]');
      expect(result.status).toBe('correct');
      expect(result.message).toBe('Output matches expected result');
    });

    it('should return incorrect status for no match', () => {
      const result = service.evaluateSubmission('q1', 'wrong answer');
      expect(result.status).toBe('incorrect');
      expect(result.message).toBe('Output does not match expected result');
    });

    it('should return partially_correct for partial match', () => {
      const result = service.evaluateSubmission('q1', '[0, 1] extra');
      expect(result.status).toBe('partially_correct');
    });

    it('should throw NotFoundError for invalid questionId', () => {
      expect(() => service.evaluateSubmission('invalid_id', 'code')).toThrow();
    });

    // Property 3: Submission Evaluation Consistency
    it('should return consistent evaluation for same inputs', () => {
      fc.assert(
        fc.property(fc.string(), (userCode: string) => {
          const result1 = service.evaluateSubmission('q1', userCode);
          const result2 = service.evaluateSubmission('q1', userCode);
          expect(result1.status).toBe(result2.status);
          expect(result1.message).toBe(result2.message);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('createSubmission', () => {
    // Property 4: Submission Response Completeness
    it('should create submission with all required fields', () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.string(),
          fc.string(),
          fc.string(),
          fc.string(),
          (userId, questionId, userCode, status, message) => {
            const submission = service.createSubmission(
              userId,
              questionId,
              userCode,
              status,
              message
            );
            expect(submission).toHaveProperty('submissionId');
            expect(submission).toHaveProperty('userId');
            expect(submission).toHaveProperty('questionId');
            expect(submission).toHaveProperty('userCode');
            expect(submission).toHaveProperty('status');
            expect(submission).toHaveProperty('message');
            expect(submission).toHaveProperty('timestamp');
            expect(submission.submissionId).toBeTruthy();
            expect(submission.timestamp).toBeTruthy();
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('getSubmissionsByUser', () => {
    it('should return submissions for a user', () => {
      const submissions = service.getSubmissionsByUser('user_1');
      expect(Array.isArray(submissions)).toBe(true);
      submissions.forEach(sub => {
        expect(sub.userId).toBe('user_1');
      });
    });

    it('should return empty array for user with no submissions', () => {
      const submissions = service.getSubmissionsByUser('nonexistent_user');
      expect(submissions).toEqual([]);
    });
  });
});
