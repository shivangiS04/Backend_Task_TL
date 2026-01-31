"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const errors_1 = require("../utils/errors");
class QuestionService {
    constructor(store) {
        this.store = store;
    }
    getTodayQuestion() {
        const questions = this.store.getQuestions();
        if (questions.length === 0) {
            throw new errors_1.NotFoundError('No questions available');
        }
        const today = new Date();
        const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
        const index = dayOfYear % questions.length;
        return questions[index];
    }
    getQuestionById(id) {
        const questions = this.store.getQuestions();
        return questions.find(q => q.id === id) || null;
    }
    getAllQuestions() {
        return this.store.getQuestions();
    }
}
exports.QuestionService = QuestionService;
//# sourceMappingURL=QuestionService.js.map