import { Brain, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold gradient-primary bg-clip-text text-transparent">
                AI Interview
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              Master your technical interviews with AI-powered practice sessions. 
              Get real-time feedback and improve your coding skills.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Connect</h3>
            <div className="flex space-x-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 AI Interview. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;