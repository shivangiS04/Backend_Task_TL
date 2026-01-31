import { Request, Response, NextFunction } from 'express';
import { QuestionService } from '../services/QuestionService';
import { successResponse } from '../utils/response';
import { NotFoundError } from '../utils/errors';

export class QuestionController {
  constructor(private questionService: QuestionService) {}

  getTodayQuestion(req: Request, res: Response, next: NextFunction): void {
    try {
      const question = this.questionService.getTodayQuestion();
      res.status(200).json(successResponse(question));
    } catch (error) {
      next(error);
    }
  }

  getQuestionById(req: Request, res: Response, next: NextFunction): void {
    try {
      const { id } = req.params;
      const question = this.questionService.getQuestionById(id);
      if (!question) {
        throw new NotFoundError(`Question with id ${id} not found`);
      }
      res.status(200).json(successResponse(question));
    } catch (error) {
      next(error);
    }
  }

  getAllQuestions(req: Request, res: Response, next: NextFunction): void {
    try {
      const questions = this.questionService.getAllQuestions();
      res.status(200).json(successResponse(questions));
    } catch (error) {
      next(error);
    }
  }
}
