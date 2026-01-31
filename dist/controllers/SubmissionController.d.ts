import { Request, Response, NextFunction } from 'express';
import { SubmissionService } from '../services/SubmissionService';
import { StatisticsService } from '../services/StatisticsService';
export declare class SubmissionController {
    private submissionService;
    private statisticsService;
    constructor(submissionService: SubmissionService, statisticsService: StatisticsService);
    submitCode(req: Request, res: Response, next: NextFunction): void;
    getSubmissionsByUser(req: Request, res: Response, next: NextFunction): void;
}
//# sourceMappingURL=SubmissionController.d.ts.map