import { Question, Hint, Submission, UserStatistics } from '../types';

export const sampleQuestions: Question[] = [
  {
    id: 'q1',
    title: 'Two Sum',
    difficulty: 'easy',
    problemStatement: 'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.',
    sampleInput: '[2, 7, 11, 15]\ntarget = 9',
    sampleOutput: '[0, 1]',
    createdAt: new Date().toISOString()
  },
  {
    id: 'q2',
    title: 'Reverse String',
    difficulty: 'easy',
    problemStatement: 'Write a function that reverses a string.',
    sampleInput: 'hello',
    sampleOutput: 'olleh',
    createdAt: new Date().toISOString()
  },
  {
    id: 'q3',
    title: 'Palindrome Check',
    difficulty: 'medium',
    problemStatement: 'Given a string, determine if it is a palindrome.',
    sampleInput: 'racecar',
    sampleOutput: 'true',
    createdAt: new Date().toISOString()
  },
  {
    id: 'q4',
    title: 'Fibonacci Sequence',
    difficulty: 'medium',
    problemStatement: 'Generate the first N numbers in the Fibonacci sequence.',
    sampleInput: '5',
    sampleOutput: '[0, 1, 1, 2, 3]',
    createdAt: new Date().toISOString()
  },
  {
    id: 'q5',
    title: 'Binary Search',
    difficulty: 'hard',
    problemStatement: 'Implement binary search on a sorted array.',
    sampleInput: '[1, 3, 5, 7, 9]\ntarget = 5',
    sampleOutput: '2',
    createdAt: new Date().toISOString()
  }
];

export const sampleHints: Hint[] = [
  {
    hintId: 'h1',
    questionId: 'q1',
    hintText: 'Consider using a hash map to store seen numbers',
    difficulty: 'basic'
  },
  {
    hintId: 'h2',
    questionId: 'q1',
    hintText: 'For each number, check if target - number exists in the map',
    difficulty: 'intermediate'
  },
  {
    hintId: 'h3',
    questionId: 'q2',
    hintText: 'Use array methods or string manipulation',
    difficulty: 'basic'
  },
  {
    hintId: 'h4',
    questionId: 'q3',
    hintText: 'Compare the string with its reverse',
    difficulty: 'basic'
  },
  {
    hintId: 'h5',
    questionId: 'q4',
    hintText: 'Each number is the sum of the previous two',
    difficulty: 'basic'
  },
  {
    hintId: 'h6',
    questionId: 'q5',
    hintText: 'Divide the search space in half each iteration',
    difficulty: 'intermediate'
  }
];

export const sampleSubmissions: Submission[] = [
  {
    submissionId: 'sub_1',
    userId: 'user_1',
    questionId: 'q1',
    userCode: '[0, 1]',
    status: 'correct',
    message: 'Output matches expected result',
    timestamp: new Date(Date.now() - 86400000).toISOString()
  },
  {
    submissionId: 'sub_2',
    userId: 'user_1',
    questionId: 'q2',
    userCode: 'olleh',
    status: 'correct',
    message: 'Output matches expected result',
    timestamp: new Date(Date.now() - 72000000).toISOString()
  },
  {
    submissionId: 'sub_3',
    userId: 'user_2',
    questionId: 'q1',
    userCode: '[1, 0]',
    status: 'incorrect',
    message: 'Output does not match expected result',
    timestamp: new Date(Date.now() - 86400000).toISOString()
  },
  {
    submissionId: 'sub_4',
    userId: 'user_2',
    questionId: 'q1',
    userCode: '[0, 1]',
    status: 'correct',
    message: 'Output matches expected result',
    timestamp: new Date(Date.now() - 82800000).toISOString()
  },
  {
    submissionId: 'sub_5',
    userId: 'user_3',
    questionId: 'q3',
    userCode: 'true',
    status: 'correct',
    message: 'Output matches expected result',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  }
];

export const sampleStatistics: UserStatistics[] = [
  {
    userId: 'user_1',
    totalAttempts: 2,
    successfulAttempts: 2,
    successRate: 100,
    lastAttemptAt: new Date(Date.now() - 72000000).toISOString()
  },
  {
    userId: 'user_2',
    totalAttempts: 2,
    successfulAttempts: 1,
    successRate: 50,
    lastAttemptAt: new Date(Date.now() - 82800000).toISOString()
  },
  {
    userId: 'user_3',
    totalAttempts: 1,
    successfulAttempts: 1,
    successRate: 100,
    lastAttemptAt: new Date(Date.now() - 3600000).toISOString()
  }
];
