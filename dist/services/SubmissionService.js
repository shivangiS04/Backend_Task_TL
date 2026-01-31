"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionService = void 0;
const uuid_1 = require("uuid");
const errors_1 = require("../utils/errors");
class SubmissionService {
    constructor(store) {
        this.store = store;
    }
    evaluateSubmission(questionId, userCode) {
        const questions = this.store.getQuestions();
        const question = questions.find(q => q.id === questionId);
        if (!question) {
            throw new errors_1.NotFoundError(`Question with id ${questionId} not found`);
        }
        const expectedOutput = question.sampleOutput.trim();
        const userOutput = userCode.trim();
        if (userOutput === expectedOutput) {
            return {
                status: 'correct',
                message: 'Output matches expected result'
            };
        }
        if (userOutput.includes(expectedOutput) || expectedOutput.includes(userOutput)) {
            return {
                status: 'partially_correct',
                message: 'Output partially matches expected result'
            };
        }
        return {
            status: 'incorrect',
            message: 'Output does not match expected result'
        };
    }
    saveSubmission(submission) {
        this.store.addSubmission(submission);
        this.store.saveData();
    }
    getSubmissionsByUser(userId) {
        const submissions = this.store.getSubmissions();
        return submissions.filter(s => s.userId === userId);
    }
    createSubmission(userId, questionId, userCode, status, message) {
        return {
            submissionId: (0, uuid_1.v4)(),
            userId,
            questionId,
            userCode,
            status: status,
            message,
            timestamp: new Date().toISOString()
        };
    }
}
exports.SubmissionService = SubmissionService;
//# sourceMappingURL=SubmissionService.js.map