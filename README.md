# AI Interview Web App

A React 18 + TypeScript + TailwindCSS frontend application for AI-powered technical interview practice.

## 🚀 Features

- **AI-Powered Interview Practice**: Practice technical interviews with intelligent questions
- **Multiple Topics**: JavaScript, React, Python, Node.js, TypeScript, SQL
- **Difficulty Levels**: Easy, Medium, Hard questions to match your skill level
- **Voice Recording**: Record your answers with simulated audio functionality
- **Real-time Feedback**: Get instant scoring and detailed feedback
- **Progress Tracking**: Monitor your improvement over time
- **Mobile-Responsive**: Works seamlessly on all devices

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: TailwindCSS with custom design system
- **Build Tool**: Vite
- **UI Components**: Shadcn/ui
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📦 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── interview/          # Interview-specific components
│   ├── Navbar.tsx         # Navigation component
│   ├── Footer.tsx         # Footer component
│   └── ProtectedRoute.tsx # Route protection
├── contexts/
│   ├── AuthContext.tsx    # Authentication state
│   └── InterviewContext.tsx # Interview state
├── data/
│   └── mockData.ts        # Mock data for users, questions, interviews
├── pages/
│   ├── Landing.tsx        # Landing page
│   ├── Login.tsx          # Login page
│   ├── Signup.tsx         # Signup page
│   ├── Dashboard.tsx      # User dashboard
│   ├── InterviewSetup.tsx # Interview configuration
│   ├── InterviewLive.tsx  # Live interview session
│   └── InterviewResult.tsx # Results and feedback
└── hooks/                 # Custom React hooks
```

## 🎨 Design System

The app features a modern AI-themed design with:
- Dark theme with blue and teal accents
- Gradient backgrounds and glowing effects
- Smooth animations and transitions
- Mobile-first responsive design
- Semantic color tokens for consistency

## 🔐 Authentication

- Mock authentication system using local storage
- Protected routes for interview functionality
- Demo credentials:
  - Email: `john@example.com`
  - Password: `password123`

## 📱 Pages

### Landing Page (`/`)
- Hero section with app introduction
- Feature highlights
- Call-to-action buttons for signup/login

### Authentication Pages
- **Login** (`/login`): User authentication
- **Signup** (`/signup`): New user registration

### Protected Pages
- **Dashboard** (`/dashboard`): Overview of past interviews and quick stats
- **Interview Setup** (`/interview/setup`): Topic and difficulty selection
- **Interview Live** (`/interview/live`): Active interview session
- **Interview Result** (`/interview/result`): Scores and feedback

## 🎯 Interview Flow

1. **Setup**: Choose topic (JavaScript, React, Python, etc.) and difficulty
2. **Live Session**: Answer 5 questions with time limits
3. **Recording**: Use voice recording or text input for answers
4. **Results**: Get AI-generated scores and feedback

## 🧪 Mock Data

The app includes comprehensive mock data:
- **Users**: Demo accounts with profiles
- **Questions**: 50+ technical questions across topics and difficulties
- **Interviews**: Sample completed interviews with scores and feedback

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-interview-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Customization

### Design System
The design system is defined in:
- `src/index.css` - CSS custom properties and component styles
- `tailwind.config.ts` - Tailwind configuration and theme

### Mock Data
Modify `src/data/mockData.ts` to:
- Add new interview questions
- Change difficulty levels
- Update user profiles
- Customize feedback messages

### UI Components
All UI components are built with Shadcn/ui and can be customized in:
- `src/components/ui/` - Base UI components
- Custom variants defined in the design system

## 🔧 Configuration

### Environment
The app runs entirely on the frontend with no backend dependencies. All data is mocked and stored in localStorage for persistence.

### Responsive Design
The app is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🌟 Key Features Explained

### Voice Recording Simulation
- Visual recording interface with start/stop controls
- Timer display during recording
- Playback simulation
- Fallback to text input

### AI Scoring System
- Mock scoring algorithm with random but realistic scores
- Detailed feedback based on score ranges
- Question-by-question breakdown

### Progress Tracking
- Interview history with dates and scores
- Average score calculation
- Visual progress indicators

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues, please check the documentation or create an issue in the repository.

---

Built with ❤️ using React, TypeScript, and TailwindCSS