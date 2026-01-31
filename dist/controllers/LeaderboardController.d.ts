import { Request, Response, NextFunction } from 'express';
import { LeaderboardService } from '../services/LeaderboardService';
export declare class LeaderboardController {
    private leaderboardService;
    constructor(leaderboardService: LeaderboardService);
    getLeaderboard(req: Request, res: Response, next: NextFunction): void;
}
//# sourceMappingURL=LeaderboardController.d.ts.map