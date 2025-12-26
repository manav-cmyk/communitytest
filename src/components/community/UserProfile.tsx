import { Author, User, Post, trustLevelLabels, TrustLevel } from '@/types/community';
import { cn } from '@/lib/utils';
import { ArrowLeft, Calendar, FileText, Shield, MessageSquare, Heart, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface UserProfileProps {
  user?: User;
  author?: Author;
  posts: Post[];
  isCurrentUser?: boolean;
  isModerator?: boolean;
  memberSince?: Date;
  onBack: () => void;
}

export function UserProfile({ 
  user, 
  author, 
  posts, 
  isCurrentUser = false,
  isModerator = false,
  memberSince,
  onBack 
}: UserProfileProps) {
  const name = user?.name || author?.name || 'User';
  const role = author?.role || 'customer';
  const badge = author?.badge;
  const isAdmin = role === 'admin' || role === 'superadmin';
  const trustLevel: TrustLevel = user?.trustLevel ?? author?.trustLevel ?? 1;
  
  const userPosts = posts.filter(p => 
    (user && p.author.id === user.id) || 
    (author && p.author.id === author.id)
  );
  const postCount = userPosts.length;
  
  const displayMemberSince = user?.joinedAt || memberSince || new Date();
  const topicsCreated = user?.topicsCreated || postCount;
  const likesReceived = user?.likesReceived || 0;
  const daysVisited = user?.daysVisited || 0;
  
  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border/50 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">
            {isCurrentUser ? 'My Profile' : 'Profile'}
          </h1>
        </div>
      </div>
      
      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Avatar and Name Section */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className={cn(
              'w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mb-4',
              isAdmin 
                ? 'gradient-traya text-primary-foreground' 
                : 'bg-accent text-accent-foreground'
            )}>
              {name.charAt(0)}
            </div>
            
            <h2 className="text-xl font-bold text-foreground mb-1">{name}</h2>
            {user?.username && (
              <p className="text-sm text-muted-foreground mb-2">@{user.username}</p>
            )}
            
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {/* Trust Level Badge */}
              <span className={cn(
                'px-3 py-1 text-sm font-medium rounded-full flex items-center gap-1',
                trustLevel >= 3 ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
              )}>
                <Shield className="w-3.5 h-3.5" />
                {trustLevelLabels[trustLevel]}
              </span>
              
              {isAdmin && (
                <span className="px-3 py-1 text-sm font-medium bg-primary text-primary-foreground rounded-full">
                  {badge || 'Staff'}
                </span>
              )}
              {isModerator && !isAdmin && (
                <span className="px-3 py-1 text-sm font-medium bg-warning/10 text-warning rounded-full">
                  Moderator
                </span>
              )}
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-card rounded-2xl p-4 border border-border/50 text-center">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Member Since</p>
              <p className="font-semibold text-foreground">
                {format(displayMemberSince, 'MMM yyyy')}
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-4 border border-border/50 text-center">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center mx-auto mb-2">
                <FileText className="w-5 h-5 text-success" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Topics Created</p>
              <p className="font-semibold text-foreground">{topicsCreated}</p>
            </div>
            
            {isCurrentUser && user && (
              <>
                <div className="bg-card rounded-2xl p-4 border border-border/50 text-center">
                  <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-5 h-5 text-warning" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Likes Received</p>
                  <p className="font-semibold text-foreground">{likesReceived}</p>
                </div>
                
                <div className="bg-card rounded-2xl p-4 border border-border/50 text-center">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mx-auto mb-2">
                    <Eye className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Days Visited</p>
                  <p className="font-semibold text-foreground">{daysVisited}</p>
                </div>
              </>
            )}
          </div>
          
          {/* Recent Posts Section */}
          {userPosts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Recent Topics
              </h3>
              <div className="space-y-3">
                {userPosts.slice(0, 5).map(post => (
                  <div 
                    key={post.id}
                    className="bg-card rounded-xl p-4 border border-border/50"
                  >
                    <p className="text-sm text-foreground line-clamp-2 mb-2">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {post.likeCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {post.commentCount}
                      </span>
                      {post.viewCount && (
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.viewCount}
                        </span>
                      )}
                      <span>{format(post.createdAt, 'MMM d')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
