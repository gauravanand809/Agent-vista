// Interview Questions Data for AI Interview App

export interface Question {
  id: string;
  topic: string;
  role: string; // Changed from 'topic' to 'role'
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
  role: string; // Changed from 'topic' to 'role'
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

// Mock Questions
export const mockQuestions: Question[] = [
  // Frontend Developer Questions
  {
    id: 'frontend-1',
    role: 'Frontend Developer',
    topic: 'JavaScript',
    difficulty: 'easy',
    question: 'What is the difference between let, const, and var in JavaScript?',
    expectedAnswer: 'let and const are block-scoped, var is function-scoped. const cannot be reassigned.',
    timeLimit: 180
  },
  {
    id: 'frontend-2',
    role: 'Frontend Developer',
    topic: 'JavaScript',
    difficulty: 'medium',
    question: 'Explain event bubbling and event capturing in JavaScript.',
    expectedAnswer: 'Event bubbling is when events propagate from child to parent elements. Event capturing is the opposite.',
    timeLimit: 240
  },
  {
    id: 'frontend-3',
    role: 'Frontend Developer',
    topic: 'React',
    difficulty: 'hard',
    question: 'What are React hooks and how do they change the way we write components?',
    expectedAnswer: 'Hooks allow functional components to use state and lifecycle methods previously only available in class components.',
    timeLimit: 300
  },
  // Backend Developer Questions
  {
    id: 'backend-1',
    role: 'Backend Developer',
    topic: 'Python',
    difficulty: 'easy',
    question: 'What is the difference between lists and tuples in Python?',
    expectedAnswer: 'Lists are mutable and use square brackets. Tuples are immutable and use parentheses.',
    timeLimit: 180
  },
  {
    id: 'backend-2',
    role: 'Backend Developer',
    topic: 'Python',
    difficulty: 'medium',
    question: 'Explain list comprehensions in Python with an example.',
    expectedAnswer: 'List comprehensions provide a concise way to create lists: [x**2 for x in range(10)]',
    timeLimit: 240
  },
  {
    id: 'backend-3',
    role: 'Backend Developer',
    topic: 'Databases',
    difficulty: 'hard',
    question: 'Explain ACID properties in the context of database transactions.',
    expectedAnswer: 'ACID stands for Atomicity, Consistency, Isolation, Durability. These properties ensure database transactions are reliable.',
    timeLimit: 300
  },
  // Full Stack Developer Questions
  {
    id: 'fullstack-1',
    role: 'Full Stack Developer',
    topic: 'JavaScript',
    difficulty: 'easy',
    question: 'What is REST and what are its key principles?',
    expectedAnswer: 'REST is an architectural style for networked applications. Key principles include statelessness, client-server, cacheable, uniform interface.',
    timeLimit: 180
  },
  {
    id: 'fullstack-2',
    role: 'Full Stack Developer',
    topic: 'Node.js',
    difficulty: 'medium',
    question: 'What is the event loop in Node.js?',
    expectedAnswer: 'The event loop is what allows Node.js to perform non-blocking I/O operations despite being single-threaded.',
    timeLimit: 240
  },
  {
    id: 'fullstack-3',
    role: 'Full Stack Developer',
    topic: 'Docker',
    difficulty: 'hard',
    question: 'Explain the difference between a Docker image and a Docker container.',
    expectedAnswer: 'A Docker image is a read-only template with instructions for creating a Docker container. A container is a runnable instance of an image.',
    timeLimit: 300
  },
  // Coding Questions
  {
    id: 'coding-frontend-1',
    role: 'Frontend Developer',
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
    id: 'coding-backend-1',
    role: 'Backend Developer',
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
    role: 'Frontend Developer',
    difficulty: 'medium',
    questions: [mockQuestions[0], mockQuestions[1], mockQuestions[2]],
    answers: [
      { questionId: 'frontend-1', answer: 'let and const are block scoped...', score: 85 },
      { questionId: 'frontend-2', answer: 'Event bubbling means...', score: 78 },
      { questionId: 'frontend-3', answer: 'Hooks allow functional components...', score: 82 }
    ],
    totalScore: 82,
    feedback: 'Great understanding of JavaScript fundamentals. Focus on explaining event handling in more detail.',
    completedAt: '2024-01-20T15:45:00Z',
    status: 'completed'
  },
  {
    id: 'interview-2',
    userId: '1',
    role: 'Backend Developer',
    difficulty: 'easy',
    questions: [mockQuestions[3], mockQuestions[4]],
    answers: [
      { questionId: 'backend-1', answer: 'Lists can be changed...', score: 90 },
      { questionId: 'backend-2', answer: 'List comprehensions are...', score: 88 }
    ],
    totalScore: 89,
    feedback: 'Excellent grasp of Python basics. Ready to move to intermediate topics.',
    completedAt: '2024-01-18T11:30:00Z',
    status: 'completed'
  },
  {
    id: 'interview-3',
    userId: '1',
    role: 'Full Stack Developer',
    difficulty: 'hard',
    questions: [mockQuestions[6], mockQuestions[7], mockQuestions[8]],
    answers: [
      { questionId: 'fullstack-1', answer: 'REST is an architectural style...', score: 92 },
      { questionId: 'fullstack-2', answer: 'The event loop is what allows...', score: 75 },
      { questionId: 'fullstack-3', answer: 'A Docker image is a read-only template...', score: 70 }
    ],
    totalScore: 79,
    feedback: 'Strong knowledge across the stack. Work on advanced concepts like Docker.',
    completedAt: '2024-01-15T09:15:00Z',
    status: 'completed'
  }
];

export const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Mobile App Developer",
  "Data Engineer",
  "Machine Learning Engineer",
  "Embedded Systems Developer",
  "Game Developer",
  "Cloud Engineer",
  "Site Reliability Engineer",
  "Security Engineer",
  "QA Engineer",
  "Software Architect",
  "AR/VR Developer",
  "Others"
];

export const difficulties = ['easy', 'medium', 'hard'] as const;

// Helper functions
export const getQuestionsByRole = (role: string, difficulty: string): Question[] => {
  return mockQuestions
    .filter(q => q.role === role && q.difficulty === difficulty)
    .slice(0, 5); // Limit to 5 questions per interview
};

export const getUserInterviews = (userId: string): Interview[] => {
  return mockInterviews.filter(interview => interview.userId === userId);
};
