import { Request, Response, NextFunction } from 'express';
import { SubmissionService } from '../services/SubmissionService';
import { StatisticsService } from '../services/StatisticsService';
import { successResponse } from '../utils/response';
import { ValidationError } from '../utils/errors';

export class SubmissionController {
  constructor(
    private submissionService: SubmissionService,
    private statisticsService: StatisticsService
  ) {}

  submitCode(req: Request, res: Response, next: NextFunction): void {
    try {
      const { questionId, userCode, userId } = req.body;

      if (!questionId || !userCode || !userId) {
        throw new ValidationError('Missing required fields: questionId, userCode, userId');
      }

      const evaluation = this.submissionService.evaluateSubmission(questionId, userCode);
      const submission = this.submissionService.createSubmission(
        userId,
        questionId,
        userCode,
        evaluation.status,
        evaluation.message
      );

      this.submissionService.saveSubmission(submission);
      this.statisticsService.updateStatistics(userId, submission);

      res.status(200).json(successResponse(submission));
    } catch (error) {
      next(error);
    }
  }

  getSubmissionsByUser(req: Request, res: Response, next: NextFunction): void {
    try {
      const { userId } = req.params;
      const submissions = this.submissionService.getSubmissionsByUser(userId);
      res.status(200).json(successResponse(submissions));
    } catch (error) {
      next(error);
    }
  }
}
