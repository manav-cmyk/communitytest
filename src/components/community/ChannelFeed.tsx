import { useState, useMemo, useEffect } from 'react';
import { Channel, Post, TopicTag, TypeTag } from '@/types/community';
import { PostCard } from './PostCard';
import { PostComposer } from './PostComposer';
import { FilterBar } from './FilterBar';
import { CohortWelcomeDialog } from './CohortWelcomeDialog';
import { FAQDialog } from './FAQDialog';
import { cn } from '@/lib/utils';
import { ArrowLeft, Users, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
  visitedCohorts: Set<string>;
  onCohortVisited: (channelId: string) => void;
  onClose?: () => void;
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
  visitedCohorts,
  onCohortVisited,
  onClose,
}: ChannelFeedProps) {
  const [showComposer, setShowComposer] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<TopicTag>();
  const [selectedType, setSelectedType] = useState<TypeTag>();
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const [showFAQDialog, setShowFAQDialog] = useState(false);
  
  const handleNewPost = (content: string, topicTag: TopicTag, typeTag: TypeTag, images?: string[]) => {
    onNewPost(content, topicTag, typeTag, images);
    toast.success('Post sent for review', {
      description: 'Your post will be visible once approved by admin',
    });
  };
  
  // Show welcome dialog for first-time cohort visits - only once
  useEffect(() => {
    if (channel.type === 'cohort' && !visitedCohorts.has(channel.id)) {
      // Small delay to ensure the component is fully mounted before showing dialog
      const timer = setTimeout(() => {
        setShowWelcomeDialog(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [channel.id, channel.type, visitedCohorts]);

  // Mark cohort as visited when dialog is closed (not when opened)
  const handleWelcomeDialogClose = (open: boolean) => {
    setShowWelcomeDialog(open);
    if (!open && channel.type === 'cohort') {
      onCohortVisited(channel.id);
    }
  };
  
  const filteredPosts = useMemo(() => {
    return posts
      .filter(post => post.channelId === channel.id)
      .filter(post => {
        if (selectedTopic) return post.topicTag === selectedTopic;
        return true;
      })
      .filter(post => {
        if (selectedType) return post.typeTag === selectedType;
        return true;
      })
      .sort((a, b) => {
        // Pinned posts first
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        // Then by date
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
  }, [posts, channel.id, selectedTopic, selectedType]);
  
  return (
    <div className="h-full flex flex-col bg-background relative">
      {/* Global close button - top right corner, smaller */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 p-1.5 rounded-lg hover:bg-muted/80 transition-colors text-muted-foreground"
          title="Close"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      
      {/* FAQ Dialog */}
      <FAQDialog open={showFAQDialog} onOpenChange={setShowFAQDialog} />
      
      {/* Welcome Dialog for Cohort Channels */}
      <CohortWelcomeDialog
        open={showWelcomeDialog}
        onOpenChange={handleWelcomeDialogClose}
        channelName={channel.name}
        channelIcon={channel.icon}
      />
      
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="p-4 pr-10">
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

            {/* Info & Members buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowFAQDialog(true)}
                className="p-2 rounded-xl hover:bg-muted text-muted-foreground transition-colors"
                title="Info"
              >
                <Info className="w-5 h-5" />
              </button>
              
              <button
                onClick={onMembersClick}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
                title="View members"
              >
                <Users className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
          
          {/* Filters */}
          <FilterBar
            selectedTopic={selectedTopic}
            selectedType={selectedType}
            onTopicChange={setSelectedTopic}
            onTypeChange={setSelectedType}
            onCreatePost={() => setShowComposer(true)}
            canCreatePost={!channel.isAdminOnly && isJoined}
          />
        </div>
      </div>
      
      
      {/* Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {showComposer && (
          <PostComposer
            onSubmit={handleNewPost}
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
    </div>
  );
}
