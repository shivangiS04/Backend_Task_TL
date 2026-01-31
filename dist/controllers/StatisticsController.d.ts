import { Request, Response, NextFunction } from 'express';
import { StatisticsService } from '../services/StatisticsService';
export declare class StatisticsController {
    private statisticsService;
    constructor(statisticsService: StatisticsService);
    getStatistics(req: Request, res: Response, next: NextFunction): void;
    getAllStatistics(req: Request, res: Response, next: NextFunction): void;
}
//# sourceMappingURL=StatisticsController.d.ts.map