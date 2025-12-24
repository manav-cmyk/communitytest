import { ArrowLeft, Shield, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChannelMember } from '@/data/mockData';

interface ChannelMembersProps {
  channelName: string;
  channelIcon: string;
  members: ChannelMember[];
  onBack: () => void;
  onMemberClick: (memberId: string) => void;
}

export function ChannelMembers({
  channelName,
  channelIcon,
  members,
  onBack,
  onMemberClick,
}: ChannelMembersProps) {
  const moderators = members.filter(m => m.isModerator);
  const regularMembers = members.filter(m => !m.isModerator);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">{channelIcon}</span>
              <h1 className="font-bold text-lg text-foreground">{channelName}</h1>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span>{members.length} members</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Moderators Section */}
        {moderators.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Moderators ({moderators.length})
              </h2>
            </div>
            <div className="space-y-2">
              {moderators.map(member => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onClick={() => onMemberClick(member.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Members Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Members ({regularMembers.length})
            </h2>
          </div>
          <div className="space-y-2">
            {regularMembers.map(member => (
              <MemberCard
                key={member.id}
                member={member}
                onClick={() => onMemberClick(member.id)}
              />
            ))}
          </div>
          {regularMembers.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No other members yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

interface MemberCardProps {
  member: ChannelMember;
  onClick: () => void;
}

function MemberCard({ member, onClick }: MemberCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200',
        'hover:bg-accent/50 active:scale-[0.98] text-left'
      )}
    >
      <Avatar className="w-10 h-10">
        <AvatarImage src={member.avatar} />
        <AvatarFallback className={cn(
          'text-sm font-medium',
          member.role === 'admin' 
            ? 'bg-primary/10 text-primary' 
            : 'bg-secondary text-secondary-foreground'
        )}>
          {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-foreground truncate">{member.name}</span>
          {member.isModerator && (
            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
              <Shield className="w-3 h-3 mr-1" />
              Mod
            </Badge>
          )}
        </div>
        {member.badge && (
          <p className="text-xs text-muted-foreground">{member.badge}</p>
        )}
      </div>
    </button>
  );
}
