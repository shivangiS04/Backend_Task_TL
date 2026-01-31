import { Request, Response, NextFunction } from 'express';
import { StatisticsService } from '../services/StatisticsService';
import { successResponse } from '../utils/response';

export class StatisticsController {
  constructor(private statisticsService: StatisticsService) {}

  getStatistics(req: Request, res: Response, next: NextFunction): void {
    try {
      const { userId } = req.params;
      const statistics = this.statisticsService.getStatistics(userId);
      res.status(200).json(successResponse(statistics));
    } catch (error) {
      next(error);
    }
  }

  getAllStatistics(req: Request, res: Response, next: NextFunction): void {
    try {
      const statistics = this.statisticsService.getAllStatistics();
      res.status(200).json(successResponse(statistics));
    } catch (error) {
      next(error);
    }
  }
}
