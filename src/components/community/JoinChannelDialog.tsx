import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Channel } from '@/types/community';
import { Users } from 'lucide-react';

interface JoinChannelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channel: Channel | null;
  onJoin: () => void;
}

export function JoinChannelDialog({ open, onOpenChange, channel, onJoin }: JoinChannelDialogProps) {
  if (!channel) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">{channel.icon}</span>
          </div>
          <DialogTitle className="text-center text-xl">Join {channel.name}</DialogTitle>
          <DialogDescription className="text-center">
            {channel.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
            <Users className="w-4 h-4" />
            <span>{channel.memberCount.toLocaleString()} members</span>
          </div>
          
          <p className="text-sm text-center text-muted-foreground">
            By joining this channel, you'll be able to:
          </p>
          <ul className="text-sm text-muted-foreground mt-2 space-y-1">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              See all posts and discussions
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Share your own experiences
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Connect with other members
            </li>
          </ul>
        </div>
        
        <Button 
          onClick={onJoin}
          className="w-full gradient-traya text-primary-foreground hover:opacity-90"
          size="lg"
        >
          Join Channel
        </Button>
      </DialogContent>
    </Dialog>
  );
}
