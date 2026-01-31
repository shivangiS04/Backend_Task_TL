import { Request, Response, NextFunction } from 'express';
import { LeaderboardService } from '../services/LeaderboardService';
import { successResponse } from '../utils/response';

export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) {}

  getLeaderboard(req: Request, res: Response, next: NextFunction): void {
    try {
      const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);
      const sortBy = (req.query.sortBy as 'score' | 'speed') || 'score';

      const leaderboard = this.leaderboardService.getLeaderboard(limit, sortBy);
      res.status(200).json(successResponse(leaderboard));
    } catch (error) {
      next(error);
    }
  }
}
