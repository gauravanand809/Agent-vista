// Mock data for AI Interview App

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface Question {
  id: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  expectedAnswer: string;
  timeLimit: number; // in seconds
  type?: 'normal' | 'coding';
  problemStatement?: string;
  inputFormat?: string;
  outputFormat?: string;
  sampleInput?: string;
  sampleOutput?: string;
  constraints?: string;
}

export interface Interview {
  id: string;
  userId: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  answers: {
    questionId: string;
    answer: string;
    score: number;
  }[];
  totalScore: number;
  feedback: string;
  completedAt: string;
  status: 'completed' | 'in-progress' | 'abandoned';
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    createdAt: '2024-01-10T14:20:00Z'
  }
];

// Mock Questions
export const mockQuestions: Question[] = [
  // JavaScript Questions
  {
    id: 'js-1',
    topic: 'JavaScript',
    difficulty: 'easy',
    question: 'What is the difference between let, const, and var in JavaScript?',
    expectedAnswer: 'let and const are block-scoped, var is function-scoped. const cannot be reassigned.',
    timeLimit: 180
  },
  {
    id: 'js-2',
    topic: 'JavaScript',
    difficulty: 'medium',
    question: 'Explain event bubbling and event capturing in JavaScript.',
    expectedAnswer: 'Event bubbling is when events propagate from child to parent elements. Event capturing is the opposite.',
    timeLimit: 240
  },
  {
    id: 'js-3',
    topic: 'JavaScript',
    difficulty: 'hard',
    question: 'What are closures in JavaScript and why are they useful?',
    expectedAnswer: 'Closures allow inner functions to access outer function variables even after outer function returns.',
    timeLimit: 300
  },
  // React Questions
  {
    id: 'react-1',
    topic: 'React',
    difficulty: 'easy',
    question: 'What is JSX and why do we use it in React?',
    expectedAnswer: 'JSX is a syntax extension that allows writing HTML-like code in JavaScript components.',
    timeLimit: 180
  },
  {
    id: 'react-2',
    topic: 'React',
    difficulty: 'medium',
    question: 'Explain the difference between state and props in React.',
    expectedAnswer: 'State is internal component data that can change. Props are external data passed from parent components.',
    timeLimit: 240
  },
  {
    id: 'react-3',
    topic: 'React',
    difficulty: 'hard',
    question: 'What are React hooks and how do they change the way we write components?',
    expectedAnswer: 'Hooks allow functional components to use state and lifecycle methods previously only available in class components.',
    timeLimit: 300
  },
  // Python Questions
  {
    id: 'python-1',
    topic: 'Python',
    difficulty: 'easy',
    question: 'What is the difference between lists and tuples in Python?',
    expectedAnswer: 'Lists are mutable and use square brackets. Tuples are immutable and use parentheses.',
    timeLimit: 180
  },
  {
    id: 'python-2',
    topic: 'Python',
    difficulty: 'medium',
    question: 'Explain list comprehensions in Python with an example.',
    expectedAnswer: 'List comprehensions provide a concise way to create lists: [x**2 for x in range(10)]',
    timeLimit: 240
  },
  {
    id: 'python-3',
    topic: 'Python',
    difficulty: 'hard',
    question: 'What are decorators in Python and how do you use them?',
    expectedAnswer: 'Decorators modify or extend function behavior without changing the function itself using @decorator syntax.',
    timeLimit: 300
  },
  // Coding Questions
  {
    id: 'js-coding-1',
    topic: 'JavaScript',
    difficulty: 'easy',
    type: 'coding',
    question: 'Two Sum',
    problemStatement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    inputFormat: 'First line contains the array of integers, second line contains the target integer.',
    outputFormat: 'Return an array of two indices.',
    sampleInput: '[2,7,11,15]\n9',
    sampleOutput: '[0,1]',
    constraints: '2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9',
    expectedAnswer: 'function twoSum(nums, target) { const map = new Map(); for (let i = 0; i < nums.length; i++) { const complement = target - nums[i]; if (map.has(complement)) { return [map.get(complement), i]; } map.set(nums[i], i); } }',
    timeLimit: 900
  },
  {
    id: 'python-coding-1',
    topic: 'Python',
    difficulty: 'medium',
    type: 'coding',
    question: 'Valid Parentheses',
    problemStatement: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    inputFormat: 'A string containing only parentheses characters.',
    outputFormat: 'Return True if valid, False otherwise.',
    sampleInput: '()[]{}',
    sampleOutput: 'True',
    constraints: '1 <= s.length <= 10^4',
    expectedAnswer: 'def isValid(s): stack = []; mapping = {")": "(", "}": "{", "]": "["}; for char in s: if char in mapping: if not stack or stack.pop() != mapping[char]: return False; else: stack.append(char); return not stack',
    timeLimit: 900
  }
];

// Mock Past Interviews
export const mockInterviews: Interview[] = [
  {
    id: 'interview-1',
    userId: '1',
    topic: 'JavaScript',
    difficulty: 'medium',
    questions: [mockQuestions[0], mockQuestions[1], mockQuestions[2]],
    answers: [
      { questionId: 'js-1', answer: 'let and const are block scoped...', score: 85 },
      { questionId: 'js-2', answer: 'Event bubbling means...', score: 78 },
      { questionId: 'js-3', answer: 'Closures are...', score: 82 }
    ],
    totalScore: 82,
    feedback: 'Great understanding of JavaScript fundamentals. Focus on explaining event handling in more detail.',
    completedAt: '2024-01-20T15:45:00Z',
    status: 'completed'
  },
  {
    id: 'interview-2',
    userId: '1',
    topic: 'React',
    difficulty: 'easy',
    questions: [mockQuestions[3], mockQuestions[4]],
    answers: [
      { questionId: 'react-1', answer: 'JSX allows us to write...', score: 90 },
      { questionId: 'react-2', answer: 'State is for internal data...', score: 88 }
    ],
    totalScore: 89,
    feedback: 'Excellent grasp of React basics. Ready to move to intermediate topics.',
    completedAt: '2024-01-18T11:30:00Z',
    status: 'completed'
  },
  {
    id: 'interview-3',
    userId: '1',
    topic: 'Python',
    difficulty: 'hard',
    questions: [mockQuestions[6], mockQuestions[7], mockQuestions[8]],
    answers: [
      { questionId: 'python-1', answer: 'Lists can be changed...', score: 92 },
      { questionId: 'python-2', answer: 'List comprehensions are...', score: 75 },
      { questionId: 'python-3', answer: 'Decorators modify functions...', score: 70 }
    ],
    totalScore: 79,
    feedback: 'Strong Python knowledge. Work on advanced concepts like decorators.',
    completedAt: '2024-01-15T09:15:00Z',
    status: 'completed'
  }
];

export const languages = ['JavaScript', 'Python', 'Java', 'C++', 'TypeScript', 'Go', 'Rust', 'C#'];
export const difficulties = ['easy', 'medium', 'hard'] as const;

// Helper functions
export const getQuestionsByTopic = (topic: string, difficulty: string): Question[] => {
  return mockQuestions
    .filter(q => q.topic === topic && q.difficulty === difficulty)
    .slice(0, 5); // Limit to 5 questions per interview
};

export const getUserInterviews = (userId: string): Interview[] => {
  return mockInterviews.filter(interview => interview.userId === userId);
};

export const authenticateUser = (email: string, password: string): User | null => {
  return mockUsers.find(user => user.email === email && user.password === password) || null;
};

export const createUser = (name: string, email: string, password: string): User => {
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    password,
    createdAt: new Date().toISOString()
  };
  mockUsers.push(newUser);
  return newUser;
};