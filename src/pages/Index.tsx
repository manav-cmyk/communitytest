import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, TrendingUp, Heart, ArrowRight, Sparkles } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: Users,
      title: 'Cohort-Based Journey',
      description: 'Connect with warriors at the same stage of their hair recovery journey',
    },
    {
      icon: MessageCircle,
      title: 'Expert Guidance',
      description: 'Get answers from hair experts and community managers',
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Share milestones, celebrate wins, and stay motivated',
    },
    {
      icon: Heart,
      title: 'Peer Support',
      description: 'Find encouragement from people who understand your journey',
    },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mint opacity-50" />
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-accent/30 blur-3xl" />
        
        <div className="relative container mx-auto px-4 pt-20 pb-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 text-primary text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Join 10,000+ Hair Warriors</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-slide-up">
              Your Hair Recovery Journey,{' '}
              <span className="text-primary">Together</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Join Traya's supportive community to get expert guidance, share your progress, 
              and stay motivated throughout your transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button 
                size="lg" 
                onClick={() => navigate('/community')}
                className="gap-2 px-8 h-14 text-base gradient-traya border-0 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                Enter Community
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our community is designed to support you at every step of your hair recovery journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="bg-background rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl gradient-traya flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-8">
              Join a Thriving Community
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '10K+', label: 'Active Members' },
                { value: '50K+', label: 'Posts Shared' },
                { value: '85%', label: 'See Results' },
                { value: '4.8', label: 'Community Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-primary-foreground/70 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Connect with fellow warriors, get expert advice, and transform your hair health together.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/community')}
            className="gap-2 px-8 h-14 text-base gradient-traya border-0 shadow-lg shadow-primary/20"
          >
            Join the Community
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-traya flex items-center justify-center">
                <span className="text-lg">💚</span>
              </div>
              <span className="font-bold text-foreground">Traya Community</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Traya Health. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
