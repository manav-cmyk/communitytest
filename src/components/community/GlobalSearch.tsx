import { useState, useMemo } from 'react';
import { Post } from '@/types/community';
import { PostCard } from './PostCard';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GlobalSearchProps {
  posts: Post[];
  onPostClick: (post: Post) => void;
  onPostLike: (postId: string) => void;
  onPostBookmark: (postId: string) => void;
  onAuthorClick?: (authorId: string) => void;
}

export function GlobalSearch({
  posts,
  onPostClick,
  onPostLike,
  onPostBookmark,
  onAuthorClick,
}: GlobalSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return posts
      .filter(post => 
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [posts, searchQuery]);

  return (
    <div className="h-full flex flex-col bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50 p-4">
        <h1 className="font-bold text-xl text-foreground mb-4">Search</h1>
        
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search all posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-secondary/50 border-0 rounded-xl text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!searchQuery.trim() ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              Search for posts across all channels
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No posts found for "{searchQuery}"</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-2">
              {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} found
            </p>
            {filteredPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => onPostClick(post)}
                onLike={() => onPostLike(post.id)}
                onBookmark={() => onPostBookmark(post.id)}
                onAuthorClick={onAuthorClick}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
