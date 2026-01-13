import { Channel } from '@/types/community';
import { cn } from '@/lib/utils';
import { ChevronRight, Users } from 'lucide-react';

interface ChannelCardProps {
  channel: Channel;
  isActive?: boolean;
  isJoined?: boolean;
  isCohort?: boolean;
  onClick: () => void;
}

export function ChannelCard({ channel, isActive, isJoined, isCohort, onClick }: ChannelCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 rounded-xl transition-all duration-200',
        'hover:bg-accent/50 active:scale-[0.98]',
        isActive && 'bg-accent shadow-sm',
        isCohort ? 'p-4' : 'p-3'
      )}
    >
      <div className={cn(
        'rounded-xl flex items-center justify-center text-xl',
        'bg-gradient-to-br from-primary/10 to-accent',
        isActive && 'from-primary/20 to-primary/10',
        isCohort ? 'w-14 h-14' : 'w-12 h-12'
      )}>
        {channel.icon}
      </div>
      
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <span className={cn(
            'font-semibold text-foreground',
            isCohort && 'text-base'
          )}>{channel.name}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users className="w-3.5 h-3.5" />
          <span>{channel.memberCount.toLocaleString()} members</span>
        </div>
      </div>
      
      <ChevronRight className="w-5 h-5 text-muted-foreground" />
    </button>
  );
}
