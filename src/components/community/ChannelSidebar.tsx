import { Channel } from '@/types/community';
import { ChannelCard } from './ChannelCard';
import { cn } from '@/lib/utils';
import { Flame, Hash, Users, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface ChannelSidebarProps {
  channels: Channel[];
  activeChannelId?: string;
  onChannelSelect: (channel: Channel) => void;
  userOrderCount: number;
}

export function ChannelSidebar({ 
  channels, 
  activeChannelId, 
  onChannelSelect,
  userOrderCount 
}: ChannelSidebarProps) {
  const [cohortExpanded, setCohortExpanded] = useState(true);
  const [topicExpanded, setTopicExpanded] = useState(true);
  
  const cohortChannels = channels.filter(c => c.type === 'cohort');
  const topicChannels = channels.filter(c => c.type === 'topic');
  
  // Find user's current cohort based on order count
  const getCurrentCohort = () => {
    return cohortChannels.find(c => {
      if (!c.orderRange) return false;
      return userOrderCount >= c.orderRange[0] && userOrderCount <= c.orderRange[1];
    });
  };
  
  const currentCohort = getCurrentCohort();
  
  return (
    <div className="h-full bg-sidebar overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-traya flex items-center justify-center">
            <Users className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-foreground">Traya Community</h2>
            <p className="text-xs text-muted-foreground">Support & motivation</p>
          </div>
        </div>
      </div>
      
      {/* User's Current Cohort Highlight */}
      {currentCohort && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="bg-accent/50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-sm font-medium text-primary mb-1">
              <Flame className="w-4 h-4" />
              <span>Your Cohort</span>
            </div>
            <button
              onClick={() => onChannelSelect(currentCohort)}
              className="w-full text-left"
            >
              <span className="font-semibold text-foreground">{currentCohort.icon} {currentCohort.name}</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Cohort Channels */}
      <div className="p-4 pb-2">
        <button
          onClick={() => setCohortExpanded(!cohortExpanded)}
          className="flex items-center justify-between w-full mb-2 group"
        >
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Journey Stages
          </span>
          <ChevronDown className={cn(
            'w-4 h-4 text-muted-foreground transition-transform',
            !cohortExpanded && '-rotate-90'
          )} />
        </button>
        
        {cohortExpanded && (
          <div className="space-y-1">
            {cohortChannels.map(channel => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                isActive={activeChannelId === channel.id}
                onClick={() => onChannelSelect(channel)}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Topic Channels */}
      <div className="p-4 pt-2">
        <button
          onClick={() => setTopicExpanded(!topicExpanded)}
          className="flex items-center justify-between w-full mb-2 group"
        >
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Topics
          </span>
          <ChevronDown className={cn(
            'w-4 h-4 text-muted-foreground transition-transform',
            !topicExpanded && '-rotate-90'
          )} />
        </button>
        
        {topicExpanded && (
          <div className="space-y-1">
            {topicChannels.map(channel => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                isActive={activeChannelId === channel.id}
                onClick={() => onChannelSelect(channel)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
