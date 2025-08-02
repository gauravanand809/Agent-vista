import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Brain, Zap, Target, Trophy, ArrowRight, CheckCircle } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center justify-center p-2 mb-6 rounded-full bg-primary/10 border border-primary/20">
              <Brain className="h-6 w-6 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">AI-Powered Interview Practice</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Master Your
              <span className="gradient-primary bg-clip-text text-transparent block">
                Tech Interviews
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Practice with AI, get real-time feedback, and land your dream job. 
              Our intelligent interview system adapts to your skill level.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Practicing Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  I Have an Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose AI Interview?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of interview preparation with our advanced AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg gradient-primary mb-4">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Questions</h3>
              <p className="text-muted-foreground">
                Get personalized questions based on your skill level and target role.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg gradient-accent mb-4">
                <Zap className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Feedback</h3>
              <p className="text-muted-foreground">
                Receive instant feedback on your answers to improve quickly.
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm border-border/50">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-success text-white mb-4">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your improvement over time with detailed analytics.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Practice Makes Perfect
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our AI interview system simulates real interview conditions, 
                helping you build confidence and improve your technical communication skills.
              </p>
              
              <div className="space-y-4">
                {[
                  'Multiple programming languages supported',
                  'Difficulty levels from beginner to expert',
                  'Voice recording and playback',
                  'Comprehensive feedback reports',
                  'Progress tracking and analytics'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Trophy className="h-6 w-6 text-primary" />
                  <span className="font-semibold">Success Story</span>
                </div>
                <blockquote className="text-lg italic mb-4">
                  "AI Interview helped me land my dream job at a top tech company. 
                  The realistic practice sessions boosted my confidence tremendously!"
                </blockquote>
                <cite className="text-sm text-muted-foreground">- Sarah Chen, Software Engineer</cite>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have improved their interview skills with AI Interview.
          </p>
          <Link to="/signup">
            <Button variant="hero" size="xl" className="animate-pulse-glow">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;