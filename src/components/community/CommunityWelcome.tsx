import { Button } from '@/components/ui/button';
import { Users, Heart, MessageCircle, Sparkles } from 'lucide-react';

interface CommunityWelcomeProps {
  onJoin: () => void;
}

export function CommunityWelcome({ onJoin }: CommunityWelcomeProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 rounded-2xl gradient-traya flex items-center justify-center mx-auto mb-6">
          <Users className="w-10 h-10 text-primary-foreground" />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-3">
          Welcome to Traya Community
        </h1>
        <p className="text-muted-foreground mb-8">
          Join thousands of hair warriors supporting each other on their transformation journey
        </p>
        
        <div className="space-y-4 mb-8 text-left">
          <div className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border/50">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Real Support</h4>
              <p className="text-sm text-muted-foreground">Connect with others who truly understand</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border/50">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Share Your Journey</h4>
              <p className="text-sm text-muted-foreground">Exchange tips and celebrate progress together</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 bg-card rounded-xl p-4 border border-border/50">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Expert Access</h4>
              <p className="text-sm text-muted-foreground">Get advice from Traya doctors and coaches</p>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={onJoin}
          className="w-full gradient-traya text-primary-foreground hover:opacity-90"
          size="lg"
        >
          Join Community
        </Button>
      </div>
    </div>
  );
}
