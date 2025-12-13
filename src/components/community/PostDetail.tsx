import { useState } from 'react';
import { Post, Comment } from '@/types/community';
import { topicTagLabels, typeTagLabels } from '@/data/mockData';
import { CommentCard } from './CommentCard';
import { cn } from '@/lib/utils';
import { Heart, MessageCircle, Bookmark, Pin, Sparkles, ArrowLeft, Send, Image } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostDetailProps {
  post: Post;
  comments: Comment[];
  onBack: () => void;
  onLike: () => void;
  onBookmark: () => void;
  onComment: (content: string) => void;
}

export function PostDetail({
  post,
  comments,
  onBack,
  onLike,
  onBookmark,
  onComment,
}: PostDetailProps) {
  const [newComment, setNewComment] = useState('');
  
  const topicTag = topicTagLabels[post.topicTag];
  const typeTag = typeTagLabels[post.typeTag];
  const isAdmin = post.author.role === 'admin' || post.author.role === 'superadmin';
  
  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    onComment(newComment);
    setNewComment('');
  };
  
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
          <h1 className="font-semibold text-foreground">Post</h1>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <article className="p-4 border-b border-border/50">
          {/* Post Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold',
              isAdmin 
                ? 'gradient-traya text-primary-foreground' 
                : 'bg-accent text-accent-foreground'
            )}>
              {post.author.name.charAt(0)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{post.author.name}</span>
                {isAdmin && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                    {post.author.badge || 'Admin'}
                  </span>
                )}
              </div>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </span>
            </div>
            
            {/* Badges */}
            <div className="flex items-center gap-1">
              {post.isPinned && (
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <Pin className="w-4 h-4 text-primary" />
                </div>
              )}
              {post.isFeatured && (
                <div className="p-1.5 rounded-lg bg-warning/10">
                  <Sparkles className="w-4 h-4 text-warning" />
                </div>
              )}
            </div>
          </div>
          
          {/* Post Content */}
          <div className="mb-4">
            <p className="text-foreground whitespace-pre-line text-[15px] leading-relaxed">
              {post.content}
            </p>
          </div>
          
          {/* Images */}
          {post.images && post.images.length > 0 && (
            <div className="mb-4 rounded-2xl overflow-hidden">
              {post.images.map((img, idx) => (
                <img 
                  key={idx}
                  src={img} 
                  alt={`Post image ${idx + 1}`}
                  className="w-full object-cover"
                />
              ))}
            </div>
          )}
          
          {/* Tags */}
          <div className="flex items-center gap-2 mb-4">
            <span className={cn('px-3 py-1.5 text-sm font-medium rounded-full', topicTag.color)}>
              {topicTag.label}
            </span>
            <span className={cn('px-3 py-1.5 text-sm font-medium rounded-full', typeTag.color)}>
              {typeTag.label}
            </span>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-6 py-3 border-t border-border/50">
            <button 
              onClick={onLike}
              className={cn(
                'flex items-center gap-2 text-sm font-medium transition-all',
                post.isLiked 
                  ? 'text-like' 
                  : 'text-muted-foreground hover:text-like'
              )}
            >
              <Heart className={cn('w-5 h-5', post.isLiked && 'fill-current animate-bounce-subtle')} />
              <span>{post.likeCount}</span>
            </button>
            
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <MessageCircle className="w-5 h-5" />
              <span>{post.commentCount}</span>
            </div>
            
            <button 
              onClick={onBookmark}
              className={cn(
                'ml-auto transition-all',
                post.isBookmarked 
                  ? 'text-bookmark' 
                  : 'text-muted-foreground hover:text-bookmark'
              )}
            >
              <Bookmark className={cn('w-5 h-5', post.isBookmarked && 'fill-current')} />
            </button>
          </div>
        </article>
        
        {/* Comments */}
        <div className="p-4 space-y-4">
          <h3 className="font-semibold text-foreground">
            Comments ({comments.length})
          </h3>
          
          {comments.map(comment => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
          
          {comments.length === 0 && (
            <p className="text-center py-8 text-muted-foreground">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
      
      {/* Comment Input */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-md border-t border-border/50 p-4">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground">
            <Image className="w-5 h-5" />
          </button>
          
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitComment()}
            className="flex-1 px-4 py-2.5 bg-secondary/50 border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          
          <button
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className={cn(
              'p-2.5 rounded-xl transition-all',
              newComment.trim()
                ? 'gradient-traya text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
