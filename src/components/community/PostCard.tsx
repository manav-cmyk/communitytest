import { Post } from '@/types/community';
import { topicTagLabels, typeTagLabels } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, Bookmark, Pin, Sparkles } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  onClick: () => void;
  onLike: () => void;
  onBookmark: () => void;
}

export function PostCard({ post, onClick, onLike, onBookmark }: PostCardProps) {
  const topicTag = topicTagLabels[post.topicTag];
  const typeTag = typeTagLabels[post.typeTag];
  
  const isAdmin = post.author.role === 'admin' || post.author.role === 'superadmin';
  
  return (
    <article 
      className="bg-card rounded-2xl p-4 shadow-sm border border-border/50 animate-fade-in hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold',
          isAdmin 
            ? 'gradient-traya text-primary-foreground' 
            : 'bg-accent text-accent-foreground'
        )}>
          {post.author.name.charAt(0)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">{post.author.name}</span>
            {isAdmin && (
              <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                {post.author.badge || 'Admin'}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(post.createdAt, { addSuffix: true })}
          </span>
        </div>
        
        {/* Featured/Pinned badges */}
        <div className="flex items-center gap-1">
          {post.isPinned && (
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Pin className="w-3.5 h-3.5 text-primary" />
            </div>
          )}
          {post.isFeatured && (
            <div className="p-1.5 rounded-lg bg-warning/10">
              <Sparkles className="w-3.5 h-3.5 text-warning" />
            </div>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="mb-3">
        <p className="text-foreground whitespace-pre-line line-clamp-4">
          {post.content}
        </p>
      </div>
      
      {/* Image thumbnail */}
      {post.images && post.images.length > 0 && (
        <div className="mb-3 rounded-xl overflow-hidden">
          <img 
            src={post.images[0]} 
            alt="Post image"
            className="w-full h-40 object-cover"
          />
        </div>
      )}
      
      {/* Tags */}
      <div className="flex items-center gap-2 mb-3">
        <span className={cn('px-2.5 py-1 text-xs font-medium rounded-full', topicTag.color)}>
          {topicTag.label}
        </span>
        <span className={cn('px-2.5 py-1 text-xs font-medium rounded-full', typeTag.color)}>
          {typeTag.label}
        </span>
      </div>
      
      {/* Actions */}
      <div className="flex items-center gap-4 pt-3 border-t border-border/50">
        <button 
          onClick={(e) => { e.stopPropagation(); onLike(); }}
          className={cn(
            'flex items-center gap-1.5 text-sm transition-all',
            post.isLiked 
              ? 'text-like' 
              : 'text-muted-foreground hover:text-like'
          )}
        >
          <Heart className={cn('w-4.5 h-4.5', post.isLiked && 'fill-current')} />
          <span>{post.likeCount}</span>
        </button>
        
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
          <MessageCircle className="w-4.5 h-4.5" />
          <span>{post.commentCount}</span>
        </button>
        
        <button 
          onClick={(e) => { e.stopPropagation(); onBookmark(); }}
          className={cn(
            'ml-auto transition-all',
            post.isBookmarked 
              ? 'text-bookmark' 
              : 'text-muted-foreground hover:text-bookmark'
          )}
        >
          <Bookmark className={cn('w-4.5 h-4.5', post.isBookmarked && 'fill-current')} />
        </button>
      </div>
    </article>
  );
}
