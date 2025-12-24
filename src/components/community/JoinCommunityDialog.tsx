import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Users, Heart, MessageCircle, Sparkles } from 'lucide-react';

interface JoinCommunityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJoin: () => void;
}

export function JoinCommunityDialog({ open, onOpenChange, onJoin }: JoinCommunityDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-16 h-16 rounded-2xl gradient-traya flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-primary-foreground" />
          </div>
          <DialogTitle className="text-center text-xl">Join Traya Community</DialogTitle>
          <DialogDescription className="text-center">
            Connect with thousands of hair warriors on their journey
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Get Support</h4>
              <p className="text-sm text-muted-foreground">Connect with others who understand your journey</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Share & Learn</h4>
              <p className="text-sm text-muted-foreground">Exchange tips, ask questions, celebrate wins</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Expert Guidance</h4>
              <p className="text-sm text-muted-foreground">Access advice from Traya doctors and coaches</p>
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
      </DialogContent>
    </Dialog>
  );
}
