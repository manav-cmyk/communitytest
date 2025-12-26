import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Channel, NotificationLevel } from '@/types/community';
import { Users, Bell, BellRing, BellOff } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface JoinChannelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channel: Channel | null;
  onJoin: (level: NotificationLevel) => void;
}

const notificationOptions: { level: NotificationLevel; icon: typeof Bell; label: string; description: string }[] = [
  {
    level: 'watching',
    icon: BellRing,
    label: 'Watching',
    description: 'Notified of all new topics and replies',
  },
  {
    level: 'tracking',
    icon: Bell,
    label: 'Tracking',
    description: 'Notified if someone mentions you or replies to you',
  },
  {
    level: 'normal',
    icon: Bell,
    label: 'Normal',
    description: 'Notified only if someone mentions you',
  },
];

export function JoinChannelDialog({ open, onOpenChange, channel, onJoin }: JoinChannelDialogProps) {
  const [selectedLevel, setSelectedLevel] = useState<NotificationLevel>('tracking');

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
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {channel.memberCount.toLocaleString()} members
            </span>
            {channel.topicCount && (
              <span>{channel.topicCount.toLocaleString()} topics</span>
            )}
          </div>
          
          <p className="text-sm font-medium text-foreground mb-3">
            Choose notification level:
          </p>
          
          <div className="space-y-2">
            {notificationOptions.map((option) => (
              <button
                key={option.level}
                onClick={() => setSelectedLevel(option.level)}
                className={cn(
                  'w-full flex items-start gap-3 p-3 rounded-xl border transition-colors text-left',
                  selectedLevel === option.level
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <option.icon className={cn(
                  'w-5 h-5 mt-0.5',
                  selectedLevel === option.level ? 'text-primary' : 'text-muted-foreground'
                )} />
                <div>
                  <p className={cn(
                    'font-medium',
                    selectedLevel === option.level ? 'text-primary' : 'text-foreground'
                  )}>
                    {option.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{option.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <Button 
          onClick={() => onJoin(selectedLevel)}
          className="w-full gradient-traya text-primary-foreground hover:opacity-90"
          size="lg"
        >
          Join Channel
        </Button>
      </DialogContent>
    </Dialog>
  );
}
