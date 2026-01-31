import { LeaderboardEntry } from '../types';
import { DataStore } from '../data/store';
export declare class LeaderboardService {
    private store;
    constructor(store: DataStore);
    getLeaderboard(limit?: number, sortBy?: 'score' | 'speed'): LeaderboardEntry[];
    private calculateScore;
    private calculateFastestTime;
}
//# sourceMappingURL=LeaderboardService.d.ts.map