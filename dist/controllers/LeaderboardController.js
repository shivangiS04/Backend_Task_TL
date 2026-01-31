"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardController = void 0;
const response_1 = require("../utils/response");
class LeaderboardController {
    constructor(leaderboardService) {
        this.leaderboardService = leaderboardService;
    }
    getLeaderboard(req, res, next) {
        try {
            const limit = Math.min(parseInt(req.query.limit) || 10, 100);
            const sortBy = req.query.sortBy || 'score';
            const leaderboard = this.leaderboardService.getLeaderboard(limit, sortBy);
            res.status(200).json((0, response_1.successResponse)(leaderboard));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.LeaderboardController = LeaderboardController;
//# sourceMappingURL=LeaderboardController.js.map