# Implementation Plan: QOTD Backend

## Overview

This implementation plan breaks down the QOTD Backend design into discrete coding tasks. The system will be built incrementally with modular components, starting with core infrastructure, then implementing each service layer, followed by API endpoints, and finally testing and deployment preparation.

## Tasks

- [x] 1. Set up project structure and core infrastructure
  - Initialize Node.js project with Express and required dependencies
  - Create directory structure: src/routes, src/controllers, src/services, src/data, src/utils
  - Set up environment configuration and error handling middleware
  - Create base response formatter for consistent API responses
  - _Requirements: 7.1, 7.4_

- [x] 2. Implement data persistence layer
  - [x] 2.1 Create DataStore class with in-memory storage and JSON file persistence
    - Implement loadData() to read from JSON files on startup
    - Implement saveData() to persist data to JSON files
    - Initialize empty data structures for questions, submissions, statistics, hints
    - _Requirements: 8.1, 8.2, 8.3_
  
  - [x] 2.2 Write property test for data persistence round-trip
    - **Property 16: Data Persistence Round-trip**
    - **Validates: Requirements 8.1, 8.2, 8.3**

- [x] 3. Implement Question Service
  - [x] 3.1 Create QuestionService with getTodayQuestion() and getQuestionById() methods
    - Load sample questions into data store
    - Implement logic to return today's question based on date
    - _Requirements: 1.1, 1.4, 1.5_
  
  - [x] 3.2 Write property tests for question retrieval
    - **Property 1: Question Retrieval Completeness**
    - **Property 2: Question Idempotence**
    - **Validates: Requirements 1.4, 1.5**

- [x] 4. Implement Question API endpoints
  - [x] 4.1 Create GET /api/questions/today endpoint
    - Call QuestionService.getTodayQuestion()
    - Return question with HTTP 200 on success
    - Handle errors with HTTP 500
    - _Requirements: 1.1, 1.2, 1.3_
  
  - [x] 4.2 Create GET /api/questions/:id endpoint
    - Call QuestionService.getQuestionById()
    - Return question with HTTP 200 on success
    - Return HTTP 404 if question not found
    - _Requirements: 1.1, 1.4_

- [x] 5. Implement Submission Service
  - [x] 5.1 Create SubmissionService with evaluateSubmission() method
    - Implement mock evaluation logic: compare user output with expected output
    - Return "correct" for exact match, "incorrect" for no match, "partially_correct" for partial match
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  
  - [x] 5.2 Create saveSubmission() method to persist submissions
    - Store submission with unique submissionId and timestamp
    - _Requirements: 2.8, 8.1_
  
  - [x] 5.3 Write property tests for submission evaluation
    - **Property 3: Submission Evaluation Consistency**
    - **Property 4: Submission Response Completeness**
    - **Validates: Requirements 2.1, 2.8**

- [x] 6. Implement Submission API endpoint
  - [x] 6.1 Create POST /api/submissions endpoint
    - Validate required fields: questionId, userCode
    - Return HTTP 400 if validation fails
    - Call SubmissionService.evaluateSubmission()
    - Save submission and update statistics
    - Return submission response with HTTP 200
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.8_
  
  - [x] 6.2 Write property test for submission input validation
    - **Property 5: Submission Input Validation**
    - **Validates: Requirements 2.5**

- [x] 7. Implement Statistics Service
  - [x] 7.1 Create StatisticsService with getStatistics() method
    - Calculate totalAttempts, successfulAttempts, and successRate
    - Return statistics with HTTP 200 on success
    - _Requirements: 3.1, 3.4_
  
  - [x] 7.2 Create updateStatistics() method
    - Update statistics after each submission
    - Persist updated statistics to storage
    - _Requirements: 3.1, 8.2_
  
  - [x] 7.3 Write property tests for statistics accuracy
    - **Property 6: Statistics Accuracy**
    - **Property 7: Statistics Completeness**
    - **Validates: Requirements 3.1, 3.4**

- [x] 8. Implement Statistics API endpoints
  - [x] 8.1 Create GET /api/statistics/:userId endpoint
    - Call StatisticsService.getStatistics()
    - Return statistics with HTTP 200 on success
    - Return HTTP 404 if user not found
    - Handle zero attempts case (return zero values)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 9. Implement Hint Service
  - [x] 9.1 Create HintService with getHintsByQuestion() method
    - Load sample hints into data store
    - Return array of hints for a question
    - Return empty array if no hints exist
    - _Requirements: 4.1, 4.4, 4.5_
  
  - [x] 9.2 Write property tests for hint retrieval
    - **Property 8: Hint Retrieval Completeness**
    - **Property 9: Hint Object Structure**
    - **Validates: Requirements 4.1, 4.4**

- [x] 10. Implement Hint API endpoint
  - [x] 10.1 Create GET /api/hints/:questionId endpoint
    - Call HintService.getHintsByQuestion()
    - Return hints array with HTTP 200 on success
    - Return HTTP 404 if question not found
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 11. Implement Leaderboard Service
  - [x] 11.1 Create LeaderboardService with getLeaderboard() method
    - Calculate scores and fastest submission times from submissions
    - Support sorting by score (default) or speed
    - Enforce limit parameter (default 10, max 100)
    - Return ranked list with rank numbers
    - _Requirements: 5.1, 5.3, 5.4, 5.5_
  
  - [x] 11.2 Write property tests for leaderboard
    - **Property 10: Leaderboard Ordering**
    - **Property 11: Leaderboard Limit Enforcement**
    - **Property 12: Leaderboard Entry Completeness**
    - **Validates: Requirements 5.1, 5.3, 5.4, 5.5**

- [x] 12. Implement Leaderboard API endpoint
  - [x] 12.1 Create GET /api/leaderboard endpoint
    - Accept optional query parameters: limit (default 10, max 100), sortBy (score or speed)
    - Call LeaderboardService.getLeaderboard()
    - Return leaderboard with HTTP 200 on success
    - Return empty array if no users exist
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 13. Implement error handling and validation
  - [x] 13.1 Create error handling middleware
    - Catch all errors and convert to appropriate HTTP status codes
    - Return consistent error response format with errorCode, message, timestamp
    - Log errors with context for debugging
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
  
  - [x] 13.2 Write property tests for error handling
    - **Property 13: Error Response Format**
    - **Validates: Requirements 6.4**

- [x] 14. Implement response format consistency
  - [x] 14.1 Ensure all endpoints return consistent response format
    - All responses include: success (boolean), data, error, timestamp
    - Success responses have success=true, data populated, error=null
    - Error responses have success=false, data=null, error populated
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [x] 14.2 Write property tests for response format
    - **Property 14: API Response Format Consistency**
    - **Property 15: Success Flag Accuracy**
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

- [x] 15. Checkpoint - Ensure all tests pass
  - Run all property-based tests and unit tests
  - Verify all endpoints return correct status codes
  - Ensure all responses follow the consistent format
  - Ask the user if questions arise

- [x] 16. Create sample data and seed database
  - [x] 16.1 Create sample questions with various difficulties
    - Add 5-10 sample questions to seed data
    - Include problem statements, sample I/O, and hints
    - _Requirements: 1.1, 1.4_
  
  - [x] 16.2 Create sample users and submissions
    - Add mock user submissions to generate leaderboard data
    - Create varied statistics for testing
    - _Requirements: 3.1, 5.1_

- [x] 17. Add API documentation
  - [x] 17.1 Create comprehensive README with API documentation
    - Document all endpoints with request/response examples
    - Include error codes and status codes
    - Add local setup instructions
    - Document tech stack and architecture
    - _Requirements: All_

- [x] 18. Prepare for deployment
  - [x] 18.1 Set up environment variables and configuration
    - Create .env.example file
    - Configure port and data directory paths
    - _Requirements: All_
  
  - [x] 18.2 Create Dockerfile and deployment configuration
    - Set up Docker for containerization
    - Create deployment scripts for Render/Railway/Fly.io
    - _Requirements: All_

- [x] 19. Final checkpoint - Ensure all tests pass and system is ready
  - Run complete test suite
  - Verify all endpoints work correctly
  - Test data persistence across restarts
  - Ask the user if questions arise

