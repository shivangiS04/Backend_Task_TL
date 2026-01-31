import { Request, Response, NextFunction } from 'express';
import { QuestionService } from '../services/QuestionService';
export declare class QuestionController {
    private questionService;
    constructor(questionService: QuestionService);
    getTodayQuestion(req: Request, res: Response, next: NextFunction): void;
    getQuestionById(req: Request, res: Response, next: NextFunction): void;
    getAllQuestions(req: Request, res: Response, next: NextFunction): void;
}
//# sourceMappingURL=QuestionController.d.ts.map