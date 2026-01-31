"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsController = void 0;
const response_1 = require("../utils/response");
class StatisticsController {
    constructor(statisticsService) {
        this.statisticsService = statisticsService;
    }
    getStatistics(req, res, next) {
        try {
            const { userId } = req.params;
            const statistics = this.statisticsService.getStatistics(userId);
            res.status(200).json((0, response_1.successResponse)(statistics));
        }
        catch (error) {
            next(error);
        }
    }
    getAllStatistics(req, res, next) {
        try {
            const statistics = this.statisticsService.getAllStatistics();
            res.status(200).json((0, response_1.successResponse)(statistics));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.StatisticsController = StatisticsController;
//# sourceMappingURL=StatisticsController.js.map