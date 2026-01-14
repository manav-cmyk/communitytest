import { Channel } from '@/types/community';
import { ChannelCard } from './ChannelCard';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface ChannelSidebarProps {
  channels: Channel[];
  activeChannelId?: string;
  onChannelSelect: (channel: Channel) => void;
  userGroups: string[]; // Discourse-style group membership
  joinedChannels: Set<string>;
}

export function ChannelSidebar({ 
  channels, 
  activeChannelId, 
  onChannelSelect,
  userGroups,
  joinedChannels 
}: ChannelSidebarProps) {
  const [topicExpanded, setTopicExpanded] = useState(true);
  
  // Filter to only show user's current cohort channel (based on group membership)
  const cohortChannels = channels.filter(c => c.type === 'cohort');
  const topicChannels = channels.filter(c => c.type === 'topic');
  
  // Find user's current cohort based on group membership
  const currentCohort = cohortChannels.find(c => userGroups.includes(c.id));
  
  return (
    <div className="h-full bg-sidebar overflow-y-auto flex flex-col">
      
      {/* User's Current Cohort - Only show their cohort */}
      {currentCohort && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Your Journey Stage
            </span>
          </div>
          <ChannelCard
            channel={currentCohort}
            isActive={activeChannelId === currentCohort.id}
            isJoined={true}
            isCohort={true}
            onClick={() => onChannelSelect(currentCohort)}
          />
        </div>
      )}
      
      {/* Topic Channels */}
      <div className="p-4 flex-1">
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
                isJoined={joinedChannels.has(channel.id)}
                onClick={() => onChannelSelect(channel)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
