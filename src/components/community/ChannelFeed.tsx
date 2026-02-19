import { useState, useMemo, useEffect } from 'react';
import { Channel, Post, TopicTag, TypeTag } from '@/types/community';
import { PostCard } from './PostCard';
import { PostComposer } from './PostComposer';
import { FilterBar } from './FilterBar';
import { CohortWelcomeDialog } from './CohortWelcomeDialog';
import { FAQDialog } from './FAQDialog';
import { cn } from '@/lib/utils';
import { ArrowLeft, X, PenLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
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
      {/* Global Close Button - Top Right */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 z-20 p-1.5 rounded-lg hover:bg-muted/80 transition-colors"
          title="Close"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      )}
      
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
      
      {/* Facebook-style post prompt bar */}
      {!channel.isAdminOnly && isJoined && (
        <div className="px-4 pt-3 pb-1">
          <button
            onClick={() => setShowComposer(true)}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-background border-2 border-border hover:border-primary/50 hover:bg-secondary/20 transition-all shadow-sm text-left group"
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <PenLine className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Type your questions & doubts here...</span>
          </button>
        </div>
      )}

      {/* Bottom sheet composer */}
      <Drawer open={showComposer} onOpenChange={setShowComposer}>
        <DrawerContent className="px-4 pb-8 pt-2 max-h-[90vh]">
          <PostComposer
            onSubmit={handleNewPost}
            onClose={() => setShowComposer(false)}
          />
        </DrawerContent>
      </Drawer>
      
      {/* Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
