import { Author, User, Post } from '@/types/community';
import { cn } from '@/lib/utils';
import { ArrowLeft, Flame, Calendar, FileText, Shield, Users } from 'lucide-react';
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
  
  const userPosts = posts.filter(p => 
    (user && p.author.id === user.id) || 
    (author && p.author.id === author.id)
  );
  const postCount = userPosts.length;
  
  const displayMemberSince = user?.joinedAt || memberSince || new Date();
  const streak = user?.streak || 0;
  const orderCount = user?.orderCount || 0;
  
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
            
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {isAdmin && (
                <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                  {badge || 'Admin'}
                </span>
              )}
              {isModerator && !isAdmin && (
                <span className="px-3 py-1 text-sm font-medium bg-warning/10 text-warning rounded-full flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
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
              <p className="text-xs text-muted-foreground mb-1">Traya Member Since</p>
              <p className="font-semibold text-foreground">
                {format(displayMemberSince, 'MMM yyyy')}
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-4 border border-border/50 text-center">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center mx-auto mb-2">
                <FileText className="w-5 h-5 text-success" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Posts</p>
              <p className="font-semibold text-foreground">{postCount}</p>
            </div>
            
            {isCurrentUser && (
              <>
                <div className="bg-card rounded-2xl p-4 border border-border/50 text-center">
                  <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center mx-auto mb-2">
                    <Flame className="w-5 h-5 text-warning" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Current Streak</p>
                  <p className="font-semibold text-foreground">{streak} days</p>
                </div>
                
                <div className="bg-card rounded-2xl p-4 border border-border/50 text-center">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mx-auto mb-2">
                    <Users className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">Order Month</p>
                  <p className="font-semibold text-foreground">Month {orderCount}</p>
                </div>
              </>
            )}
          </div>
          
          {/* Recent Posts Section */}
          {userPosts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Recent Posts
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
                      <span>{post.likeCount} likes</span>
                      <span>{post.commentCount} comments</span>
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
