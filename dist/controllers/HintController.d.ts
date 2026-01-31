import { Request, Response, NextFunction } from 'express';
import { HintService } from '../services/HintService';
export declare class HintController {
    private hintService;
    constructor(hintService: HintService);
    getHints(req: Request, res: Response, next: NextFunction): void;
}
//# sourceMappingURL=HintController.d.ts.map