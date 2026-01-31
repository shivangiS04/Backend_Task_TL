import * as fs from 'fs';
import * as path from 'path';
import { Question, Submission, UserStatistics, Hint } from '../types';
import { sampleQuestions, sampleHints, sampleSubmissions, sampleStatistics } from './seed';

export class DataStore {
  private questions: Question[] = [];
  private submissions: Submission[] = [];
  private statistics: Map<string, UserStatistics> = new Map();
  private hints: Hint[] = [];
  private dataDir: string;

  constructor(dataDir: string = './data') {
    this.dataDir = dataDir;
    this.ensureDataDir();
    this.loadData();
    this.initializeSeedData();
  }

  private ensureDataDir(): void {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  private initializeSeedData(): void {
    if (this.questions.length === 0) {
      this.questions = sampleQuestions;
      this.saveQuestions();
    }
    if (this.hints.length === 0) {
      this.hints = sampleHints;
      this.saveHints();
    }
    if (this.submissions.length === 0) {
      this.submissions = sampleSubmissions;
      this.saveSubmissions();
    }
    if (this.statistics.size === 0) {
      sampleStatistics.forEach(stat => this.statistics.set(stat.userId, stat));
      this.saveStatistics();
    }
  }

  loadData(): void {
    this.loadQuestions();
    this.loadSubmissions();
    this.loadStatistics();
    this.loadHints();
  }

  saveData(): void {
    this.saveQuestions();
    this.saveSubmissions();
    this.saveStatistics();
    this.saveHints();
  }

  private getFilePath(filename: string): string {
    return path.join(this.dataDir, filename);
  }

  private loadQuestions(): void {
    const filePath = this.getFilePath('questions.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      if (data.trim()) {
        this.questions = JSON.parse(data);
      }
    }
  }

  private saveQuestions(): void {
    const filePath = this.getFilePath('questions.json');
    fs.writeFileSync(filePath, JSON.stringify(this.questions, null, 2));
  }

  private loadSubmissions(): void {
    const filePath = this.getFilePath('submissions.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      if (data.trim()) {
        this.submissions = JSON.parse(data);
      }
    }
  }

  private saveSubmissions(): void {
    const filePath = this.getFilePath('submissions.json');
    fs.writeFileSync(filePath, JSON.stringify(this.submissions, null, 2));
  }

  private loadStatistics(): void {
    const filePath = this.getFilePath('statistics.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      if (data.trim()) {
        const statsArray = JSON.parse(data);
        this.statistics = new Map(statsArray.map((s: UserStatistics) => [s.userId, s]));
      }
    }
  }

  private saveStatistics(): void {
    const filePath = this.getFilePath('statistics.json');
    const statsArray = Array.from(this.statistics.values());
    fs.writeFileSync(filePath, JSON.stringify(statsArray, null, 2));
  }

  private loadHints(): void {
    const filePath = this.getFilePath('hints.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      if (data.trim()) {
        this.hints = JSON.parse(data);
      }
    }
  }

  private saveHints(): void {
    const filePath = this.getFilePath('hints.json');
    fs.writeFileSync(filePath, JSON.stringify(this.hints, null, 2));
  }

  getQuestions(): Question[] {
    return this.questions;
  }

  setQuestions(questions: Question[]): void {
    this.questions = questions;
  }

  getSubmissions(): Submission[] {
    return this.submissions;
  }

  addSubmission(submission: Submission): void {
    this.submissions.push(submission);
  }

  getStatistics(): UserStatistics[] {
    return Array.from(this.statistics.values());
  }

  getStatisticsByUserId(userId: string): UserStatistics | undefined {
    return this.statistics.get(userId);
  }

  updateStatistics(stats: UserStatistics): void {
    this.statistics.set(stats.userId, stats);
  }

  getHints(): Hint[] {
    return this.hints;
  }

  setHints(hints: Hint[]): void {
    this.hints = hints;
  }
}
