import express from 'express';
import { DataStore } from './data/store';
import { errorHandler } from './middleware/errorHandler';
import { QuestionService } from './services/QuestionService';
import { SubmissionService } from './services/SubmissionService';
import { StatisticsService } from './services/StatisticsService';
import { HintService } from './services/HintService';
import { LeaderboardService } from './services/LeaderboardService';
import { QuestionController } from './controllers/QuestionController';
import { SubmissionController } from './controllers/SubmissionController';
import { StatisticsController } from './controllers/StatisticsController';
import { HintController } from './controllers/HintController';
import { LeaderboardController } from './controllers/LeaderboardController';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const store = new DataStore('./data');
const questionService = new QuestionService(store);
const submissionService = new SubmissionService(store);
const statisticsService = new StatisticsService(store);
const hintService = new HintService(store);
const leaderboardService = new LeaderboardService(store);

const questionController = new QuestionController(questionService);
const submissionController = new SubmissionController(submissionService, statisticsService);
const statisticsController = new StatisticsController(statisticsService);
const hintController = new HintController(hintService);
const leaderboardController = new LeaderboardController(leaderboardService);

app.get('/api/questions/today', (req, res, next) => questionController.getTodayQuestion(req, res, next));
app.get('/api/questions/:id', (req, res, next) => questionController.getQuestionById(req, res, next));
app.get('/api/questions', (req, res, next) => questionController.getAllQuestions(req, res, next));

app.post('/api/submissions', (req, res, next) => submissionController.submitCode(req, res, next));
app.get('/api/submissions/:userId', (req, res, next) => submissionController.getSubmissionsByUser(req, res, next));

app.get('/api/statistics/:userId', (req, res, next) => statisticsController.getStatistics(req, res, next));
app.get('/api/statistics', (req, res, next) => statisticsController.getAllStatistics(req, res, next));

app.get('/api/hints/:questionId', (req, res, next) => hintController.getHints(req, res, next));

app.get('/api/leaderboard', (req, res, next) => leaderboardController.getLeaderboard(req, res, next));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
