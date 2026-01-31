"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HintService = void 0;
class HintService {
    constructor(store) {
        this.store = store;
    }
    getHintsByQuestion(questionId) {
        const hints = this.store.getHints();
        return hints.filter(h => h.questionId === questionId);
    }
    getAllHints() {
        return this.store.getHints();
    }
}
exports.HintService = HintService;
//# sourceMappingURL=HintService.js.map