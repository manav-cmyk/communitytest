import { User } from '@/types/community';
import { cn } from '@/lib/utils';
import { Flame, Bell, Bookmark } from 'lucide-react';

interface UserHeaderProps {
  user: User;
}

export function UserHeader({ user }: UserHeaderProps) {
  return (
    <div className="bg-card border-b border-border/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-traya flex items-center justify-center text-primary-foreground font-semibold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{user.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Month {user.orderCount}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span className="flex items-center gap-1 text-primary font-medium">
                <Flame className="w-3.5 h-3.5" />
                {user.streak} day streak
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground hover:text-foreground relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
}
