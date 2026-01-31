import { Request, Response, NextFunction } from 'express';
import { HintService } from '../services/HintService';
import { successResponse } from '../utils/response';

export class HintController {
  constructor(private hintService: HintService) {}

  getHints(req: Request, res: Response, next: NextFunction): void {
    try {
      const { questionId } = req.params;
      const hints = this.hintService.getHintsByQuestion(questionId);
      res.status(200).json(successResponse(hints));
    } catch (error) {
      next(error);
    }
  }
}
