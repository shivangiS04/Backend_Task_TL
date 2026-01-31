# QOTD Backend API

A RESTful API service for delivering daily coding challenges to users. The system manages question distribution, submission evaluation, user statistics, and leaderboard rankings.

## Features

- **Daily Questions**: Fetch today's coding challenge with problem statement and sample I/O
- **Submission Evaluation**: Submit code and receive immediate feedback on correctness
- **User Statistics**: Track attempt count and success rate
- **Hints**: Get guidance for questions without spoiling solutions
- **Leaderboard**: View top performers ranked by score or speed
- **Data Persistence**: All data is persisted to JSON files

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Testing**: Jest with fast-check for property-based testing
- **Storage**: JSON file persistence

## Project Structure

```
src/
├── controllers/        # Request handlers
├── services/          # Business logic
├── data/              # Data persistence layer
├── middleware/        # Express middleware
├── types/             # TypeScript interfaces
├── utils/             # Utilities (errors, response formatting)
└── index.ts           # Express app setup
```

## Installation

```bash
npm install
```

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

The server will start on port 3000 (configurable via PORT environment variable).

## API Endpoints

### Questions

#### Get Today's Question
```
GET /api/questions/today
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "q1",
    "title": "Two Sum",
    "difficulty": "easy",
    "problemStatement": "Given an array of integers...",
    "sampleInput": "[2, 7, 11, 15]\ntarget = 9",
    "sampleOutput": "[0, 1]",
    "createdAt": "2024-01-15T00:00:00Z"
  },
  "error": null,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### Get Question by ID
```
GET /api/questions/:id
```

#### Get All Questions
```
GET /api/questions
```

### Submissions

#### Submit Code
```
POST /api/submissions
Content-Type: application/json

{
  "userId": "user_123",
  "questionId": "q1",
  "userCode": "[0, 1]"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "submissionId": "sub_abc123",
    "userId": "user_123",
    "questionId": "q1",
    "userCode": "[0, 1]",
    "status": "correct",
    "message": "Output matches expected result",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "error": null,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

Submission status values:
- `correct`: Output exactly matches expected output
- `incorrect`: Output does not match expected output
- `partially_correct`: Output partially matches expected output

#### Get User Submissions
```
GET /api/submissions/:userId
```

### Statistics

#### Get User Statistics
```
GET /api/statistics/:userId
```

Response:
```json
{
  "success": true,
  "data": {
    "userId": "user_123",
    "totalAttempts": 5,
    "successfulAttempts": 3,
    "successRate": 60,
    "lastAttemptAt": "2024-01-15T10:30:00Z"
  },
  "error": null,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### Get All Statistics
```
GET /api/statistics
```

### Hints

#### Get Hints for a Question
```
GET /api/hints/:questionId
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "hintId": "h1",
      "questionId": "q1",
      "hintText": "Consider using a hash map to store seen numbers",
      "difficulty": "basic"
    }
  ],
  "error": null,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Leaderboard

#### Get Leaderboard
```
GET /api/leaderboard?limit=10&sortBy=score
```

Query Parameters:
- `limit` (optional): Number of entries to return (default: 10, max: 100)
- `sortBy` (optional): Sort by 'score' (default) or 'speed'

Response:
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "userId": "user_123",
      "username": "user_123",
      "totalScore": 450,
      "fastestSubmissionTime": 120,
      "successRate": 95
    }
  ],
  "error": null,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "data": null,
  "error": {
    "errorCode": "VALIDATION_ERROR",
    "message": "Missing required field: questionId",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Codes

- `VALIDATION_ERROR` (HTTP 400): Missing or invalid fields
- `NOT_FOUND` (HTTP 404): Resource not found
- `INTERNAL_ERROR` (HTTP 500): Server error

## Testing

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Test Coverage

The project includes:
- **Unit Tests**: Specific examples and edge cases
- **Property-Based Tests**: Universal properties across many generated inputs using fast-check

All tests validate:
- Question retrieval completeness and idempotence
- Submission evaluation consistency and validation
- Statistics accuracy and completeness
- Hint retrieval and structure
- Leaderboard ordering and limits
- Error response format
- API response format consistency
- Data persistence round-trip

## Data Persistence

Data is stored in JSON files in the `data/` directory:
- `questions.json`: Question definitions
- `submissions.json`: User submissions
- `statistics.json`: User statistics
- `hints.json`: Question hints

The data directory is created automatically on first run.

## Environment Variables

Create a `.env` file (or use `.env.example` as template):

```
PORT=3000
DATA_DIR=./data
```

## Sample Data

The system initializes with sample data including:
- 5 sample questions (easy, medium, hard)
- 6 sample hints
- 5 sample submissions
- 3 sample users with statistics

This allows immediate testing without manual data setup.

## Architecture

The system follows a layered architecture:

```
Express Routes
    ↓
Controllers (Request validation & response formatting)
    ↓
Services (Business logic)
    ↓
Data Store (In-memory with JSON persistence)
```

### Key Design Decisions

1. **In-memory storage with JSON persistence**: Simple deployment without database setup
2. **Mock evaluation**: Compares output strings for immediate feedback
3. **Stateless API**: Enables horizontal scalability
4. **Modular structure**: Easy feature additions and testing

## Deployment

### Docker

Build the Docker image:
```bash
docker build -t qotd-backend .
```

Run the container:
```bash
docker run -p 3000:3000 qotd-backend
```

### Environment Setup

For production deployment:
1. Set `NODE_ENV=production`
2. Configure `PORT` environment variable
3. Ensure `DATA_DIR` is writable
4. Use a process manager (PM2, systemd, etc.)

## Development

### Building TypeScript
```bash
npm run build
```

Output is in the `dist/` directory.

### Code Style

The project uses TypeScript with strict type checking. All code should:
- Be properly typed
- Include JSDoc comments for public APIs
- Follow consistent naming conventions
- Pass all tests

## License

MIT
