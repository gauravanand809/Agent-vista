import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Play, Clock, Trophy, TrendingUp, Calendar, Target } from 'lucide-react';
import { getUserInterviews } from '@/features/interview/data/interviewQuestions';
import { format } from 'date-fns';

const Dashboard = () => {
  const { user } = useAuth();
  const pastInterviews = user ? getUserInterviews(user.id) : [];
  
  const averageScore = pastInterviews.length > 0 
    ? Math.round(pastInterviews.reduce((sum, interview) => sum + interview.totalScore, 0) / pastInterviews.length)
    : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success text-white';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    if (score >= 70) return 'text-info';
    return 'text-destructive';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-xl text-muted-foreground">
          Ready to ace your next technical interview?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pastInterviews.length}</p>
              <p className="text-muted-foreground">Interviews Completed</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-accent/10">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{averageScore}%</p>
              <p className="text-muted-foreground">Average Score</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-success/10">
              <Target className="h-6 w-6 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {pastInterviews.filter(i => i.totalScore >= 80).length}
              </p>
              <p className="text-muted-foreground">High Score Interviews</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="mb-8">
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-semibold mb-2">Ready for Your Next Challenge?</h2>
              <p className="text-muted-foreground">
                Choose from various topics and difficulty levels to practice.
              </p>
            </div>
            <Link to="/interview/setup">
              <Button variant="hero" size="lg" className="w-full md:w-auto">
                <Play className="mr-2 h-5 w-5" />
                Start New Interview
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Past Interviews */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Interview History</h2>
          {pastInterviews.length > 0 && (
            <Badge variant="secondary">
              {pastInterviews.length} interview{pastInterviews.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        {pastInterviews.length > 0 ? (
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Topic</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pastInterviews.map((interview) => (
                  <TableRow key={interview.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="font-medium">{interview.role}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getDifficultyColor(interview.difficulty)}>
                        {interview.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={`font-semibold ${getScoreColor(interview.totalScore)}`}>
                        {interview.totalScore}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{format(new Date(interview.completedAt), 'MMM dd, yyyy')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{interview.questions.length * 3} min</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        ) : (
          <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-border/50">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
              <Play className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Interviews Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start your first AI-powered interview to see your progress and get personalized feedback.
            </p>
            <Link to="/interview/setup">
              <Button variant="hero">
                <Play className="mr-2 h-4 w-4" />
                Start Your First Interview
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
