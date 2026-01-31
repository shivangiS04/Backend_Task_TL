"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionController = void 0;
const response_1 = require("../utils/response");
const errors_1 = require("../utils/errors");
class SubmissionController {
    constructor(submissionService, statisticsService) {
        this.submissionService = submissionService;
        this.statisticsService = statisticsService;
    }
    submitCode(req, res, next) {
        try {
            const { questionId, userCode, userId } = req.body;
            if (!questionId || !userCode || !userId) {
                throw new errors_1.ValidationError('Missing required fields: questionId, userCode, userId');
            }
            const evaluation = this.submissionService.evaluateSubmission(questionId, userCode);
            const submission = this.submissionService.createSubmission(userId, questionId, userCode, evaluation.status, evaluation.message);
            this.submissionService.saveSubmission(submission);
            this.statisticsService.updateStatistics(userId, submission);
            res.status(200).json((0, response_1.successResponse)(submission));
        }
        catch (error) {
            next(error);
        }
    }
    getSubmissionsByUser(req, res, next) {
        try {
            const { userId } = req.params;
            const submissions = this.submissionService.getSubmissionsByUser(userId);
            res.status(200).json((0, response_1.successResponse)(submissions));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.SubmissionController = SubmissionController;
//# sourceMappingURL=SubmissionController.js.map