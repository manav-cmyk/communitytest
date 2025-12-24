import { Comment } from '@/types/community';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface CommentCardProps {
  comment: Comment;
  onAuthorClick?: (authorId: string) => void;
}

export function CommentCard({ comment, onAuthorClick }: CommentCardProps) {
  const isAdmin = comment.author.role === 'admin' || comment.author.role === 'superadmin';

  const handleAuthorClick = () => {
    onAuthorClick?.(comment.author.id);
  };
  
  return (
    <div className="flex gap-3 animate-slide-up">
      <button
        onClick={handleAuthorClick}
        className={cn(
          'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 hover:opacity-80 transition-opacity',
          isAdmin 
            ? 'gradient-traya text-primary-foreground' 
            : 'bg-accent text-accent-foreground'
        )}
      >
        {comment.author.name.charAt(0)}
      </button>
      
      <div className="flex-1 min-w-0">
        <div className="bg-secondary/50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <button 
              onClick={handleAuthorClick}
              className="font-medium text-sm text-foreground hover:underline"
            >
              {comment.author.name}
            </button>
            {isAdmin && (
              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-primary/10 text-primary rounded-full">
                {comment.author.badge || 'Admin'}
              </span>
            )}
          </div>
          <p className="text-sm text-foreground/90">{comment.content}</p>
          
          {comment.image && (
            <img 
              src={comment.image} 
              alt="Comment attachment"
              className="mt-2 rounded-lg max-h-32 object-cover"
            />
          )}
        </div>
        
        <span className="text-xs text-muted-foreground mt-1 block pl-1">
          {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
        </span>
      </div>
    </div>
  );
}
