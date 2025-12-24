import { useState, useMemo } from 'react';
import { Channel, Post, TopicTag, TypeTag } from '@/types/community';
import { PostCard } from './PostCard';
import { PostComposer } from './PostComposer';
import { FilterBar } from './FilterBar';
import { cn } from '@/lib/utils';
import { Plus, Search, ArrowLeft, Users, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChannelFeedProps {
  channel: Channel;
  posts: Post[];
  isJoined: boolean;
  onPostClick: (post: Post) => void;
  onPostLike: (postId: string) => void;
  onPostBookmark: (postId: string) => void;
  onNewPost: (content: string, topicTag: TopicTag, typeTag: TypeTag, images?: string[]) => void;
  onBack: () => void;
  onAuthorClick?: (authorId: string) => void;
  onMembersClick: () => void;
  onJoinChannel: () => void;
  onLeaveChannel: () => void;
}

export function ChannelFeed({
  channel,
  posts,
  isJoined,
  onPostClick,
  onPostLike,
  onPostBookmark,
  onNewPost,
  onBack,
  onAuthorClick,
  onMembersClick,
  onJoinChannel,
  onLeaveChannel,
}: ChannelFeedProps) {
  const [showComposer, setShowComposer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<TopicTag>();
  const [selectedType, setSelectedType] = useState<TypeTag>();
  const [adminOnly, setAdminOnly] = useState(false);
  
  const filteredPosts = useMemo(() => {
    return posts
      .filter(post => post.channelId === channel.id)
      .filter(post => {
        if (searchQuery) {
          return post.content.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
      })
      .filter(post => {
        if (selectedTopic) return post.topicTag === selectedTopic;
        return true;
      })
      .filter(post => {
        if (selectedType) return post.typeTag === selectedType;
        return true;
      })
      .filter(post => {
        if (adminOnly) {
          return post.author.role === 'admin' || post.author.role === 'superadmin';
        }
        return true;
      })
      .sort((a, b) => {
        // Pinned posts first
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        // Then by date
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
  }, [posts, channel.id, searchQuery, selectedTopic, selectedType, adminOnly]);
  
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors lg:hidden"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">{channel.icon}</span>
                <h1 className="font-bold text-lg text-foreground">{channel.name}</h1>
              </div>
              <p className="text-sm text-muted-foreground">{channel.description}</p>
            </div>

            {/* Members & Join/Leave buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={onMembersClick}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
                title="View members"
              >
                <Users className="w-5 h-5 text-muted-foreground" />
              </button>
              
              {channel.type === 'topic' && (
                isJoined ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onLeaveChannel}
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Leave
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={onJoinChannel}
                    className="gradient-traya text-primary-foreground"
                  >
                    Join
                  </Button>
                )
              )}
            </div>
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border-0 rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          {/* Filters */}
          <FilterBar
            selectedTopic={selectedTopic}
            selectedType={selectedType}
            adminOnly={adminOnly}
            onTopicChange={setSelectedTopic}
            onTypeChange={setSelectedType}
            onAdminOnlyChange={setAdminOnly}
          />
        </div>
      </div>
      
      {/* Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showComposer && (
          <PostComposer
            onSubmit={onNewPost}
            onClose={() => setShowComposer(false)}
          />
        )}
        
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
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts found</p>
          </div>
        )}
      </div>
      
      {/* FAB */}
      {!channel.isAdminOnly && isJoined && (
        <button
          onClick={() => setShowComposer(true)}
          className={cn(
            'fixed bottom-6 right-6 w-14 h-14 rounded-2xl gradient-traya shadow-lg shadow-primary/30',
            'flex items-center justify-center text-primary-foreground',
            'hover:scale-105 active:scale-95 transition-transform'
          )}
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
