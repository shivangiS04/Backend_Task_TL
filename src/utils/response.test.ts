import { successResponse, errorResponse } from './response';
import * as fc from 'fast-check';

describe('Response Utilities', () => {
  describe('successResponse', () => {
    // Property 14: API Response Format Consistency
    it('should return valid response format', () => {
      fc.assert(
        fc.property(fc.string(), (data: string) => {
          const response = successResponse(data);
          expect(response).toHaveProperty('success');
          expect(response).toHaveProperty('data');
          expect(response).toHaveProperty('error');
          expect(response).toHaveProperty('timestamp');
          expect(typeof response.success).toBe('boolean');
          expect(typeof response.timestamp).toBe('string');
        }),
        { numRuns: 100 }
      );
    });

    // Property 15: Success Flag Accuracy
    it('should set success flag to true', () => {
      const response = successResponse({ test: 'data' });
      expect(response.success).toBe(true);
      expect(response.error).toBeNull();
    });

    it('should include data in response', () => {
      const testData = { id: 1, name: 'test' };
      const response = successResponse(testData);
      expect(response.data).toEqual(testData);
    });

    it('should include valid timestamp', () => {
      const response = successResponse({});
      expect(new Date(response.timestamp)).toBeInstanceOf(Date);
      expect(new Date(response.timestamp).getTime()).toBeGreaterThan(0);
    });
  });

  describe('errorResponse', () => {
    // Property 13: Error Response Format
    it('should return valid error response format', () => {
      fc.assert(
        fc.property(fc.string(), fc.string(), (errorCode: string, message: string) => {
          const response = errorResponse(errorCode, message);
          expect(response).toHaveProperty('success');
          expect(response).toHaveProperty('data');
          expect(response).toHaveProperty('error');
          expect(response).toHaveProperty('timestamp');
          expect(response.error).toHaveProperty('errorCode');
          expect(response.error).toHaveProperty('message');
          expect(response.error).toHaveProperty('timestamp');
        }),
        { numRuns: 100 }
      );
    });

    // Property 15: Success Flag Accuracy
    it('should set success flag to false', () => {
      const response = errorResponse('TEST_ERROR', 'Test message');
      expect(response.success).toBe(false);
      expect(response.data).toBeNull();
    });

    it('should include error details', () => {
      const response = errorResponse('VALIDATION_ERROR', 'Invalid input');
      expect(response.error?.errorCode).toBe('VALIDATION_ERROR');
      expect(response.error?.message).toBe('Invalid input');
    });

    it('should include valid timestamp in error', () => {
      const response = errorResponse('ERROR', 'message');
      expect(new Date(response.error!.timestamp)).toBeInstanceOf(Date);
      expect(new Date(response.error!.timestamp).getTime()).toBeGreaterThan(0);
    });
  });
});
