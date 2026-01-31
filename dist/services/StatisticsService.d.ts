import { UserStatistics, Submission } from '../types';
import { DataStore } from '../data/store';
export declare class StatisticsService {
    private store;
    constructor(store: DataStore);
    getStatistics(userId: string): UserStatistics;
    updateStatistics(userId: string, submission: Submission): void;
    getAllStatistics(): UserStatistics[];
}
//# sourceMappingURL=StatisticsService.d.ts.map