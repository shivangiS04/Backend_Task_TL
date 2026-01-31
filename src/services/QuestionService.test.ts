import { QuestionService } from './QuestionService';
import { DataStore } from '../data/store';
import * as fc from 'fast-check';

describe('QuestionService', () => {
  let service: QuestionService;
  let store: DataStore;

  beforeEach(() => {
    store = new DataStore('./test-data');
    service = new QuestionService(store);
  });

  describe('getTodayQuestion', () => {
    it('should return a question', () => {
      const question = service.getTodayQuestion();
      expect(question).toBeDefined();
      expect(question.id).toBeTruthy();
      expect(question.title).toBeTruthy();
    });

    // Property 1: Question Retrieval Completeness
    it('should return question with all required fields', () => {
      const question = service.getTodayQuestion();
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('title');
      expect(question).toHaveProperty('difficulty');
      expect(question).toHaveProperty('problemStatement');
      expect(question).toHaveProperty('sampleInput');
      expect(question).toHaveProperty('sampleOutput');
      expect(question).toHaveProperty('createdAt');
      expect(['easy', 'medium', 'hard']).toContain(question.difficulty);
    });

    // Property 2: Question Idempotence
    it('should return same question when called multiple times in a day', () => {
      const question1 = service.getTodayQuestion();
      const question2 = service.getTodayQuestion();
      const question3 = service.getTodayQuestion();

      expect(question1.id).toBe(question2.id);
      expect(question2.id).toBe(question3.id);
      expect(question1).toEqual(question2);
      expect(question2).toEqual(question3);
    });
  });

  describe('getQuestionById', () => {
    it('should return question by id', () => {
      const question = service.getQuestionById('q1');
      expect(question).toBeDefined();
      expect(question?.id).toBe('q1');
    });

    it('should return null for non-existent id', () => {
      const question = service.getQuestionById('nonexistent');
      expect(question).toBeNull();
    });

    // Property 1: Question Retrieval Completeness
    it('should return question with all required fields when found', () => {
      fc.assert(
        fc.property(fc.string(), (id: string) => {
          const question = service.getQuestionById(id);
          if (question) {
            expect(question).toHaveProperty('id');
            expect(question).toHaveProperty('title');
            expect(question).toHaveProperty('difficulty');
            expect(question).toHaveProperty('problemStatement');
            expect(question).toHaveProperty('sampleInput');
            expect(question).toHaveProperty('sampleOutput');
            expect(question).toHaveProperty('createdAt');
          }
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('getAllQuestions', () => {
    it('should return all questions', () => {
      const questions = service.getAllQuestions();
      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBeGreaterThan(0);
    });

    it('should return questions with all required fields', () => {
      const questions = service.getAllQuestions();
      questions.forEach(question => {
        expect(question).toHaveProperty('id');
        expect(question).toHaveProperty('title');
        expect(question).toHaveProperty('difficulty');
        expect(question).toHaveProperty('problemStatement');
        expect(question).toHaveProperty('sampleInput');
        expect(question).toHaveProperty('sampleOutput');
        expect(question).toHaveProperty('createdAt');
      });
    });
  });
});
