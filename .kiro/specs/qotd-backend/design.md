# Design Document: QOTD Backend

## Overview

The QOTD Backend is a RESTful API service built with Node.js and Express that delivers daily coding challenges to users. The system uses in-memory storage with JSON file persistence for simplicity and rapid deployment. The architecture follows a modular, layered design with clear separation between routes, controllers, services, and data access layers.

**Key Design Decisions:**
- In-memory storage with JSON file persistence for easy deployment without database setup
- Mock evaluation logic that compares output strings for immediate feedback
- Stateless API design for horizontal scalability
- Comprehensive error handling with consistent response format
- Modular structure enabling easy feature additions

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Express Server                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Route Handlers                          │  │
│  │  /api/questions, /api/submissions, /api/stats, etc  │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Controllers                             │  │
│  │  Handle request validation and response formatting  │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Services                                │  │
│  │  Business logic: evaluation, statistics, ranking    │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Data Access Layer                       │  │
│  │  In-memory store with JSON file persistence         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Question Service
Manages question retrieval and storage.

**Interface:**
```typescript
interface Question {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  problemStatement: string;
  sampleInput: string;
  sampleOutput: string;
  createdAt: string;
}

class QuestionService {
  getTodayQuestion(): Question
  getQuestionById(id: string): Question | null
  getAllQuestions(): Question[]
}
```

### 2. Submission Service
Handles submission evaluation and storage.

**Interface:**
```typescript
interface Submission {
  submissionId: string;
  userId: string;
  questionId: string;
  userCode: string;
  status: 'correct' | 'incorrect' | 'partially_correct';
  message: string;
  timestamp: string;
}

class SubmissionService {
  evaluateSubmission(questionId: string, userCode: string): EvaluationResult
  saveSubmission(submission: Submission): void
  getSubmissionsByUser(userId: string): Submission[]
}
```

**Evaluation Logic:**
- Compare user output with expected output character-by-character
- Return "correct" if exact match
- Return "incorrect" if no match
- Return "partially_correct" if output contains expected output or matches first N lines

### 3. Statistics Service
Tracks user performance metrics.

**Interface:**
```typescript
interface UserStatistics {
  userId: string;
  totalAttempts: number;
  successfulAttempts: number;
  successRate: number;
  lastAttemptAt: string;
}

class StatisticsService {
  getStatistics(userId: string): UserStatistics
  updateStatistics(userId: string, submission: Submission): void
  getAllStatistics(): UserStatistics[]
}
```

### 4. Hint Service
Manages hints for questions.

**Interface:**
```typescript
interface Hint {
  hintId: string;
  questionId: string;
  hintText: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
}

class HintService {
  getHintsByQuestion(questionId: string): Hint[]
  getAllHints(): Hint[]
}
```

### 5. Leaderboard Service
Generates ranked user lists.

**Interface:**
```typescript
interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  totalScore: number;
  fastestSubmissionTime: number;
  successRate: number;
}

class LeaderboardService {
  getLeaderboard(limit?: number, sortBy?: 'score' | 'speed'): LeaderboardEntry[]
}
```

### 6. Data Store
In-memory storage with JSON file persistence.

**Interface:**
```typescript
class DataStore {
  loadData(): void
  saveData(): void
  getQuestions(): Question[]
  getSubmissions(): Submission[]
  getStatistics(): UserStatistics[]
  getHints(): Hint[]
  addSubmission(submission: Submission): void
  updateStatistics(stats: UserStatistics): void
}
```

## Data Models

### Question Data
```json
{
  "id": "q1",
  "title": "Two Sum",
  "difficulty": "easy",
  "problemStatement": "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.",
  "sampleInput": "[2, 7, 11, 15]\ntarget = 9",
  "sampleOutput": "[0, 1]",
  "createdAt": "2024-01-15T00:00:00Z"
}
```

### Submission Data
```json
{
  "submissionId": "sub_123",
  "userId": "user_456",
  "questionId": "q1",
  "userCode": "function twoSum(nums, target) { ... }",
  "status": "correct",
  "message": "Output matches expected result",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Statistics Data
```json
{
  "userId": "user_456",
  "totalAttempts": 5,
  "successfulAttempts": 3,
  "successRate": 60,
  "lastAttemptAt": "2024-01-15T10:30:00Z"
}
```

### Hint Data
```json
{
  "hintId": "hint_1",
  "questionId": "q1",
  "hintText": "Consider using a hash map to store seen numbers",
  "difficulty": "basic"
}
```

### Leaderboard Entry
```json
{
  "rank": 1,
  "userId": "user_123",
  "username": "alice",
  "totalScore": 450,
  "fastestSubmissionTime": 120,
  "successRate": 95
}
```

## API Endpoints

### Questions
- `GET /api/questions/today` - Get today's question
- `GET /api/questions/:id` - Get question by ID
- `GET /api/questions` - Get all questions

### Submissions
- `POST /api/submissions` - Submit and evaluate code
- `GET /api/submissions/:userId` - Get user's submissions

### Statistics
- `GET /api/statistics/:userId` - Get user statistics
- `GET /api/statistics` - Get all statistics

### Hints
- `GET /api/hints/:questionId` - Get hints for a question

### Leaderboard
- `GET /api/leaderboard` - Get leaderboard (with optional limit and sortBy params)

## Error Handling

**Error Response Format:**
```json
{
  "success": false,
  "data": null,
  "error": {
    "errorCode": "INVALID_REQUEST",
    "message": "Missing required field: questionId",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

**Error Codes:**
- `INVALID_REQUEST` - HTTP 400: Missing or invalid fields
- `NOT_FOUND` - HTTP 404: Resource not found
- `INTERNAL_ERROR` - HTTP 500: Server error
- `VALIDATION_ERROR` - HTTP 400: Data validation failed

**Error Handling Strategy:**
- Validate all inputs at controller level
- Catch exceptions in service layer and convert to appropriate error codes
- Log all errors with context for debugging
- Return generic error messages to client for security

## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property-Based Testing Overview

Property-based testing validates software correctness by testing universal properties across many generated inputs. Each property is a formal specification that should hold for all valid inputs.

### Correctness Properties

Property 1: Question Retrieval Completeness
*For any* question request, the returned question object SHALL contain all required fields: id, title, difficulty, problemStatement, sampleInput, sampleOutput, and createdAt
**Validates: Requirements 1.4**

Property 2: Question Idempotence
*For any* question ID, requesting the same question multiple times within a day SHALL return identical question objects
**Validates: Requirements 1.5**

Property 3: Submission Evaluation Consistency
*For any* submission with the same questionId and userCode, evaluating it multiple times SHALL produce the same status result
**Validates: Requirements 2.1**

Property 4: Submission Response Completeness
*For any* submission response, it SHALL contain all required fields: submissionId, status, message, and timestamp
**Validates: Requirements 2.8**

Property 5: Submission Input Validation
*For any* submission request missing required fields (questionId or userCode), the API SHALL reject it with HTTP 400 status
**Validates: Requirements 2.5**

Property 6: Statistics Accuracy
*For any* user with N total submissions and M successful submissions, the successRate SHALL equal (M / N) * 100
**Validates: Requirements 3.1**

Property 7: Statistics Completeness
*For any* statistics response, it SHALL contain all required fields: userId, totalAttempts, successfulAttempts, successRate, and lastAttemptAt
**Validates: Requirements 3.4**

Property 8: Hint Retrieval Completeness
*For any* question, all hints associated with that question SHALL be retrievable via the hints endpoint
**Validates: Requirements 4.1, 4.4**

Property 9: Hint Object Structure
*For any* hint object returned, it SHALL contain all required fields: hintId, questionId, hintText, and difficulty
**Validates: Requirements 4.4**

Property 10: Leaderboard Ordering
*For any* leaderboard sorted by score, entries SHALL be ordered in descending order by totalScore
**Validates: Requirements 5.1, 5.5**

Property 11: Leaderboard Limit Enforcement
*For any* leaderboard request with limit parameter N (where N ≤ 100), the returned list SHALL contain at most N entries
**Validates: Requirements 5.4**

Property 12: Leaderboard Entry Completeness
*For any* leaderboard entry, it SHALL contain all required fields: rank, userId, username, totalScore, fastestSubmissionTime, and successRate
**Validates: Requirements 5.3**

Property 13: Error Response Format
*For any* error response, it SHALL contain all required fields: errorCode, message, and timestamp
**Validates: Requirements 6.4**

Property 14: API Response Format Consistency
*For any* API response (success or failure), it SHALL be valid JSON and contain fields: success (boolean), data, error, and timestamp
**Validates: Requirements 7.1, 7.4**

Property 15: Success Flag Accuracy
*For any* successful API response, the success flag SHALL be true; for any failed response, it SHALL be false
**Validates: Requirements 7.2, 7.3**

Property 16: Data Persistence Round-trip
*For any* submission or statistics data written to storage, reading it back SHALL produce equivalent data
**Validates: Requirements 8.1, 8.2, 8.3**

## Testing Strategy

### Property-Based Testing

Property-based tests validate universal correctness properties across many generated inputs using a PBT library (fast-check for Node.js):

- Minimum 100 iterations per property test
- Each test references its corresponding design property
- Tag format: **Feature: qotd-backend, Property {number}: {property_text}**

### Unit Testing

Unit tests validate specific examples and edge cases:

1. **Question Retrieval**: Test fetching today's question returns correct structure
2. **Submission Validation**: Test invalid submissions are rejected with proper error codes
3. **Empty Statistics**: Test users with no attempts return zero statistics
4. **Leaderboard Limits**: Test leaderboard respects limit parameter (max 100)
5. **Error Responses**: Test all error scenarios return correct HTTP status codes
6. **Empty Hints**: Test questions with no hints return empty array
7. **Empty Leaderboard**: Test empty leaderboard returns empty array

### Integration Testing

Integration tests validate end-to-end flows:

1. **Complete Submission Flow**: Submit code, verify evaluation, check statistics updated
2. **Leaderboard Updates**: Submit multiple solutions, verify leaderboard reflects changes
3. **Data Persistence**: Restart server, verify data is loaded correctly

