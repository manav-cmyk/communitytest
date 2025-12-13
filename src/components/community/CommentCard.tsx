import { Comment } from '@/types/community';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface CommentCardProps {
  comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
  const isAdmin = comment.author.role === 'admin' || comment.author.role === 'superadmin';
  
  return (
    <div className="flex gap-3 animate-slide-up">
      <div className={cn(
        'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0',
        isAdmin 
          ? 'gradient-traya text-primary-foreground' 
          : 'bg-accent text-accent-foreground'
      )}>
        {comment.author.name.charAt(0)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="bg-secondary/50 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm text-foreground">
              {comment.author.name}
            </span>
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
