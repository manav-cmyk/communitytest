import { Channel } from '@/types/community';
import { cn } from '@/lib/utils';
import { ChevronRight, Users, Check } from 'lucide-react';

interface ChannelCardProps {
  channel: Channel;
  isActive?: boolean;
  isJoined?: boolean;
  onClick: () => void;
}

export function ChannelCard({ channel, isActive, isJoined, onClick }: ChannelCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200',
        'hover:bg-accent/50 active:scale-[0.98]',
        isActive && 'bg-accent shadow-sm'
      )}
    >
      <div className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center text-xl',
        'bg-gradient-to-br from-primary/10 to-accent',
        isActive && 'from-primary/20 to-primary/10'
      )}>
        {channel.icon}
      </div>
      
      <div className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{channel.name}</span>
          {channel.unreadCount && channel.unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
              {channel.unreadCount}
            </span>
          )}
          {isJoined && (
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
              <Check className="w-3 h-3" />
            </span>
          )}
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
