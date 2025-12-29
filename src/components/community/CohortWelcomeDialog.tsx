import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface CohortWelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channelName: string;
  channelIcon: string;
}

export function CohortWelcomeDialog({
  open,
  onOpenChange,
  channelName,
  channelIcon,
}: CohortWelcomeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 rounded-2xl gradient-traya flex items-center justify-center">
            <span className="text-4xl">{channelIcon}</span>
          </div>
          <DialogTitle className="text-2xl font-bold">
            Welcome to {channelName}! 🎉
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-center text-muted-foreground">
            You've made it to a new milestone in your hair journey. This is your dedicated space to connect with warriors at the same stage.
          </p>
          
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-primary font-medium">
              <Sparkles className="w-4 h-4" />
              <span>What's special here:</span>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Connect with members at your exact journey stage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Get stage-specific tips & expectations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Share wins & ask questions freely</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Button 
          onClick={() => onOpenChange(false)} 
          className="w-full gradient-traya text-primary-foreground"
        >
          Let's Go! 💚
        </Button>
      </DialogContent>
    </Dialog>
  );
}
