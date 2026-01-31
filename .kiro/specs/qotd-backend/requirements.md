# Requirements Document: QOTD Backend

## Introduction

The QOTD (Question of the Day) Backend is a RESTful API service for an edtech platform that delivers daily coding challenges to users. The system manages question distribution, submission evaluation, user statistics, and leaderboard rankings. This backend enables users to practice coding problems with immediate feedback and track their progress.

## Glossary

- **QOTD**: Question of the Day - a daily coding challenge
- **Question**: A coding problem with title, difficulty, problem statement, and sample I/O
- **Submission**: A user's code submission attempting to solve a question
- **Evaluation**: The process of comparing submission output against expected output
- **Hint**: A clue provided to help users solve a question
- **Statistics**: Aggregated data about user attempts and success rates
- **Leaderboard**: Ranked list of top performers based on scores and submission speed
- **Mock Evaluation**: Simplified evaluation logic that compares output strings without actual code execution
- **Status Code**: HTTP response code indicating request success or failure

## Requirements

### Requirement 1: Fetch Today's Question

**User Story:** As a user, I want to fetch today's question, so that I can see the daily coding challenge with all necessary details.

#### Acceptance Criteria

1. WHEN a user requests the daily question via GET endpoint, THE API SHALL return a question object containing title, difficulty, problem statement, and sample input/output
2. WHEN a question is requested, THE API SHALL return HTTP 200 status code on success
3. WHEN the question data is unavailable, THE API SHALL return HTTP 500 status code with an error message
4. THE Question object SHALL contain fields: id, title, difficulty (easy/medium/hard), problemStatement, sampleInput, sampleOutput, and createdAt timestamp
5. WHEN a user requests the question multiple times in a day, THE API SHALL return the same question object

### Requirement 2: Submit and Evaluate Answers

**User Story:** As a user, I want to submit my code solution and receive immediate feedback, so that I can verify if my answer is correct.

#### Acceptance Criteria

1. WHEN a user submits code via POST endpoint with questionId and userCode, THE API SHALL evaluate the submission against expected output
2. WHEN the submission output matches expected output exactly, THE API SHALL return status "correct" with HTTP 200
3. WHEN the submission output does not match expected output, THE API SHALL return status "incorrect" with HTTP 200
4. WHEN the submission output partially matches (e.g., correct for some test cases), THE API SHALL return status "partially_correct" with HTTP 200
5. WHEN required fields are missing from submission, THE API SHALL return HTTP 400 with validation error message
6. WHEN an invalid questionId is provided, THE API SHALL return HTTP 404 with error message
7. WHEN submission evaluation fails, THE API SHALL return HTTP 500 with error message
8. THE Submission response SHALL include: submissionId, status, message, and timestamp

### Requirement 3: Retrieve User Statistics

**User Story:** As a user, I want to view my attempt statistics, so that I can track my progress and performance.

#### Acceptance Criteria

1. WHEN a user requests statistics via GET endpoint with userId, THE API SHALL return attempt count and success rate
2. WHEN statistics are requested, THE API SHALL return HTTP 200 status code on success
3. WHEN userId is invalid or not found, THE API SHALL return HTTP 404 with error message
4. THE Statistics object SHALL contain: userId, totalAttempts, successfulAttempts, successRate (percentage), and lastAttemptAt timestamp
5. WHEN a user has no attempts, THE API SHALL return statistics with zero values

### Requirement 4: Retrieve Hints for a Question

**User Story:** As a user, I want to retrieve hints for a question, so that I can get guidance without spoiling the solution.

#### Acceptance Criteria

1. WHEN a user requests hints via GET endpoint with questionId, THE API SHALL return an array of hint objects
2. WHEN hints are requested, THE API SHALL return HTTP 200 status code on success
3. WHEN an invalid questionId is provided, THE API SHALL return HTTP 404 with error message
4. THE Hint object SHALL contain: hintId, questionId, hintText, and difficulty level (basic/intermediate/advanced)
5. WHEN a question has no hints, THE API SHALL return an empty array

### Requirement 5: Retrieve Leaderboard

**User Story:** As a user, I want to view the leaderboard, so that I can see top performers and compare my performance.

#### Acceptance Criteria

1. WHEN a user requests the leaderboard via GET endpoint, THE API SHALL return a ranked list of top users
2. WHEN leaderboard is requested, THE API SHALL return HTTP 200 status code on success
3. THE Leaderboard entry SHALL contain: rank, userId, username, totalScore, fastestSubmissionTime, and successRate
4. WHEN leaderboard is requested with limit parameter, THE API SHALL return top N users (default 10, max 100)
5. WHEN leaderboard is requested with sortBy parameter, THE API SHALL support sorting by score or speed
6. WHEN no users exist, THE API SHALL return an empty array

### Requirement 6: Error Handling and Validation

**User Story:** As a developer, I want consistent error responses, so that I can handle errors reliably in client applications.

#### Acceptance Criteria

1. WHEN an invalid request is made, THE API SHALL return HTTP 400 with error message and error code
2. WHEN a resource is not found, THE API SHALL return HTTP 404 with error message
3. WHEN a server error occurs, THE API SHALL return HTTP 500 with error message
4. THE Error response SHALL contain: errorCode, message, and timestamp
5. WHEN an unexpected error occurs, THE API SHALL log the error and return a generic error message to client

### Requirement 7: API Response Format

**User Story:** As a developer, I want consistent API response format, so that I can parse responses reliably.

#### Acceptance Criteria

1. THE API SHALL return all responses in JSON format
2. WHEN a request succeeds, THE API SHALL return response with success flag set to true
3. WHEN a request fails, THE API SHALL return response with success flag set to false
4. THE Response object SHALL contain: success (boolean), data (object or null), error (object or null), and timestamp
5. WHEN data is not applicable, THE API SHALL return data as null instead of omitting the field

### Requirement 8: Data Persistence

**User Story:** As a system, I want to persist data reliably, so that user submissions and statistics are retained.

#### Acceptance Criteria

1. WHEN a submission is created, THE System SHALL persist it to storage immediately
2. WHEN statistics are updated, THE System SHALL persist changes to storage immediately
3. WHEN the system restarts, THE System SHALL load all persisted data from storage
4. WHEN data is corrupted, THE System SHALL handle gracefully and return appropriate error

