import { v4 as uuidv4 } from 'uuid';
import { Submission, EvaluationResult } from '../types';
import { DataStore } from '../data/store';
import { NotFoundError } from '../utils/errors';

export class SubmissionService {
  constructor(private store: DataStore) {}

  evaluateSubmission(questionId: string, userCode: string): EvaluationResult {
    const questions = this.store.getQuestions();
    const question = questions.find(q => q.id === questionId);

    if (!question) {
      throw new NotFoundError(`Question with id ${questionId} not found`);
    }

    const expectedOutput = question.sampleOutput.trim();
    const userOutput = userCode.trim();

    if (userOutput === expectedOutput) {
      return {
        status: 'correct',
        message: 'Output matches expected result'
      };
    }

    if (userOutput.includes(expectedOutput) || expectedOutput.includes(userOutput)) {
      return {
        status: 'partially_correct',
        message: 'Output partially matches expected result'
      };
    }

    return {
      status: 'incorrect',
      message: 'Output does not match expected result'
    };
  }

  saveSubmission(submission: Submission): void {
    this.store.addSubmission(submission);
    this.store.saveData();
  }

  getSubmissionsByUser(userId: string): Submission[] {
    const submissions = this.store.getSubmissions();
    return submissions.filter(s => s.userId === userId);
  }

  createSubmission(
    userId: string,
    questionId: string,
    userCode: string,
    status: string,
    message: string
  ): Submission {
    return {
      submissionId: uuidv4(),
      userId,
      questionId,
      userCode,
      status: status as 'correct' | 'incorrect' | 'partially_correct',
      message,
      timestamp: new Date().toISOString()
    };
  }
}
