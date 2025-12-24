import { Post } from '@/types/community';
import { PostCard } from './PostCard';
import { ArrowLeft, Bookmark } from 'lucide-react';

interface SavedPostsProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  onPostLike: (postId: string) => void;
  onPostBookmark: (postId: string) => void;
  onBack: () => void;
}

export function SavedPosts({
  posts,
  onPostClick,
  onPostLike,
  onPostBookmark,
  onBack,
}: SavedPostsProps) {
  const savedPosts = posts.filter(p => p.isBookmarked);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-card border-b border-border/50 p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Saved Posts</h2>
          </div>
          <span className="text-sm text-muted-foreground">
            ({savedPosts.length})
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {savedPosts.length > 0 ? (
          <div className="divide-y divide-border/50">
            {savedPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => onPostClick(post)}
                onLike={() => onPostLike(post.id)}
                onBookmark={() => onPostBookmark(post.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center p-6">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
              <Bookmark className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">No saved posts yet</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Bookmark posts you want to revisit later by tapping the bookmark icon
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
