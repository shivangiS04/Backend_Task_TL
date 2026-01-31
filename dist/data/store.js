"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStore = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const seed_1 = require("./seed");
class DataStore {
    constructor(dataDir = './data') {
        this.questions = [];
        this.submissions = [];
        this.statistics = new Map();
        this.hints = [];
        this.dataDir = dataDir;
        this.ensureDataDir();
        this.loadData();
        this.initializeSeedData();
    }
    ensureDataDir() {
        if (!fs.existsSync(this.dataDir)) {
            fs.mkdirSync(this.dataDir, { recursive: true });
        }
    }
    initializeSeedData() {
        if (this.questions.length === 0) {
            this.questions = seed_1.sampleQuestions;
            this.saveQuestions();
        }
        if (this.hints.length === 0) {
            this.hints = seed_1.sampleHints;
            this.saveHints();
        }
        if (this.submissions.length === 0) {
            this.submissions = seed_1.sampleSubmissions;
            this.saveSubmissions();
        }
        if (this.statistics.size === 0) {
            seed_1.sampleStatistics.forEach(stat => this.statistics.set(stat.userId, stat));
            this.saveStatistics();
        }
    }
    loadData() {
        this.loadQuestions();
        this.loadSubmissions();
        this.loadStatistics();
        this.loadHints();
    }
    saveData() {
        this.saveQuestions();
        this.saveSubmissions();
        this.saveStatistics();
        this.saveHints();
    }
    getFilePath(filename) {
        return path.join(this.dataDir, filename);
    }
    loadQuestions() {
        const filePath = this.getFilePath('questions.json');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            if (data.trim()) {
                this.questions = JSON.parse(data);
            }
        }
    }
    saveQuestions() {
        const filePath = this.getFilePath('questions.json');
        fs.writeFileSync(filePath, JSON.stringify(this.questions, null, 2));
    }
    loadSubmissions() {
        const filePath = this.getFilePath('submissions.json');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            if (data.trim()) {
                this.submissions = JSON.parse(data);
            }
        }
    }
    saveSubmissions() {
        const filePath = this.getFilePath('submissions.json');
        fs.writeFileSync(filePath, JSON.stringify(this.submissions, null, 2));
    }
    loadStatistics() {
        const filePath = this.getFilePath('statistics.json');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            if (data.trim()) {
                const statsArray = JSON.parse(data);
                this.statistics = new Map(statsArray.map((s) => [s.userId, s]));
            }
        }
    }
    saveStatistics() {
        const filePath = this.getFilePath('statistics.json');
        const statsArray = Array.from(this.statistics.values());
        fs.writeFileSync(filePath, JSON.stringify(statsArray, null, 2));
    }
    loadHints() {
        const filePath = this.getFilePath('hints.json');
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf-8');
            if (data.trim()) {
                this.hints = JSON.parse(data);
            }
        }
    }
    saveHints() {
        const filePath = this.getFilePath('hints.json');
        fs.writeFileSync(filePath, JSON.stringify(this.hints, null, 2));
    }
    getQuestions() {
        return this.questions;
    }
    setQuestions(questions) {
        this.questions = questions;
    }
    getSubmissions() {
        return this.submissions;
    }
    addSubmission(submission) {
        this.submissions.push(submission);
    }
    getStatistics() {
        return Array.from(this.statistics.values());
    }
    getStatisticsByUserId(userId) {
        return this.statistics.get(userId);
    }
    updateStatistics(stats) {
        this.statistics.set(stats.userId, stats);
    }
    getHints() {
        return this.hints;
    }
    setHints(hints) {
        this.hints = hints;
    }
}
exports.DataStore = DataStore;
//# sourceMappingURL=store.js.map