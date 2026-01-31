"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HintController = void 0;
const response_1 = require("../utils/response");
class HintController {
    constructor(hintService) {
        this.hintService = hintService;
    }
    getHints(req, res, next) {
        try {
            const { questionId } = req.params;
            const hints = this.hintService.getHintsByQuestion(questionId);
            res.status(200).json((0, response_1.successResponse)(hints));
        }
        catch (error) {
            next(error);
        }
    }
}
exports.HintController = HintController;
//# sourceMappingURL=HintController.js.map