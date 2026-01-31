"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const response_1 = require("../utils/response");
const errors_1 = require("../utils/errors");
class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    getTodayQuestion(req, res, next) {
        try {
            const question = this.questionService.getTodayQuestion();
            res.status(200).json((0, response_1.successResponse)(question));
        }
        catch (error) {
            next(error);
        }
    }
    getQuestionById(req, res, next) {
        try {
            const { id } = req.params;
            const question = this.questionService.getQuestionById(id);
            if (!question) {
                throw new errors_1.NotFoundError(`Question with id ${id} not found`);
            }
            res.status(200).json((0, response_1.successResponse)(question));
        }
        catch (error) {
            next(error);
        }
    }
    getAllQuestions(req, res, next) {
        try {
            const questions = this.questionService.getAllQuestions();
            res.status(200).json((0, response_1.successResponse)(questions));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.QuestionController = QuestionController;
//# sourceMappingURL=QuestionController.js.map