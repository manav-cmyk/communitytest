import { useState, useCallback, useMemo } from 'react';
import { Channel, Post, TopicTag, TypeTag, Author } from '@/types/community';
import { channels, posts as initialPosts, comments, currentUser } from '@/data/mockData';
import { ChannelSidebar } from '@/components/community/ChannelSidebar';
import { ChannelFeed } from '@/components/community/ChannelFeed';
import { PostDetail } from '@/components/community/PostDetail';
import { UserHeader } from '@/components/community/UserHeader';
import { SavedPosts } from '@/components/community/SavedPosts';
import { UserProfile } from '@/components/community/UserProfile';
import { CommunityWelcome } from '@/components/community/CommunityWelcome';
import { JoinCommunityDialog } from '@/components/community/JoinCommunityDialog';
import { ExitCommunityDialog } from '@/components/community/ExitCommunityDialog';
import { cn } from '@/lib/utils';

type View = 'channels' | 'feed' | 'post' | 'saved' | 'profile';

export default function Community() {
  const [view, setView] = useState<View>('channels');
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [posts, setPosts] = useState(initialPosts);
  const [previousView, setPreviousView] = useState<View>('channels');
  const [viewingAuthor, setViewingAuthor] = useState<Author | null>(null);
  const [isViewingOwnProfile, setIsViewingOwnProfile] = useState(false);
  
  // Community membership state
  const [isMember, setIsMember] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  
  const handleJoinCommunity = useCallback(() => {
    setIsMember(true);
    setShowJoinDialog(false);
  }, []);
  
  const handleExitCommunity = useCallback(() => {
    setIsMember(false);
    setShowExitDialog(false);
    setActiveChannel(null);
    setActivePost(null);
    setView('channels');
  }, []);
  
  const handleChannelSelect = useCallback((channel: Channel) => {
    if (!isMember) {
      setShowJoinDialog(true);
      return;
    }
    setActiveChannel(channel);
    setView('feed');
  }, [isMember]);
  
  const handlePostClick = useCallback((post: Post) => {
    setActivePost(post);
    setPreviousView(view);
    setView('post');
  }, [view]);
  
  const handleBack = useCallback(() => {
    if (view === 'post') {
      setActivePost(null);
      setView(previousView === 'saved' ? 'saved' : previousView === 'profile' ? 'profile' : 'feed');
    } else if (view === 'feed') {
      setActiveChannel(null);
      setView('channels');
    } else if (view === 'saved') {
      setView('channels');
    } else if (view === 'profile') {
      setViewingAuthor(null);
      setIsViewingOwnProfile(false);
      setView(previousView === 'post' ? 'post' : previousView === 'feed' ? 'feed' : 'channels');
    }
  }, [view, previousView]);

  const handleSavedPostsClick = useCallback(() => {
    setPreviousView(view);
    setView('saved');
  }, [view]);

  const handleProfileClick = useCallback(() => {
    setPreviousView(view);
    setIsViewingOwnProfile(true);
    setViewingAuthor(null);
    setView('profile');
  }, [view]);

  const handleAuthorClick = useCallback((authorId: string) => {
    // Check if clicking own profile
    if (authorId === currentUser.id) {
      handleProfileClick();
      return;
    }
    
    // Find author from posts or comments
    const foundPost = posts.find(p => p.author.id === authorId);
    const foundComment = comments.find(c => c.author.id === authorId);
    const author = foundPost?.author || foundComment?.author;
    
    if (author) {
      setPreviousView(view);
      setViewingAuthor(author);
      setIsViewingOwnProfile(false);
      setView('profile');
    }
  }, [view, posts, handleProfileClick]);

  const savedPostsCount = useMemo(() => posts.filter(p => p.isBookmarked).length, [posts]);
  
  const handlePostLike = useCallback((postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isLiked: !p.isLiked,
          likeCount: p.isLiked ? p.likeCount - 1 : p.likeCount + 1,
        };
      }
      return p;
    }));
  }, []);
  
  const handlePostBookmark = useCallback((postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isBookmarked: !p.isBookmarked,
        };
      }
      return p;
    }));
  }, []);
  
  const handleNewPost = useCallback((
    content: string,
    topicTag: TopicTag,
    typeTag: TypeTag,
    images?: string[]
  ) => {
    if (!activeChannel) return;
    
    const newPost: Post = {
      id: `post-${Date.now()}`,
      channelId: activeChannel.id,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        role: 'customer',
      },
      content,
      images,
      topicTag,
      typeTag,
      likeCount: 0,
      commentCount: 0,
      isLiked: false,
      isBookmarked: false,
      createdAt: new Date(),
    };
    
    setPosts(prev => [newPost, ...prev]);
  }, [activeChannel]);
  
  const handleNewComment = useCallback((content: string) => {
    // In a real app, this would add to the comments state
    console.log('New comment:', content);
  }, []);
  
  const postComments = activePost 
    ? comments.filter(c => c.postId === activePost.id)
    : [];

  // Show welcome screen if not a member
  if (!isMember) {
    return (
      <>
        <CommunityWelcome onJoin={handleJoinCommunity} />
        <JoinCommunityDialog 
          open={showJoinDialog} 
          onOpenChange={setShowJoinDialog}
          onJoin={handleJoinCommunity}
        />
      </>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Dialogs */}
      <JoinCommunityDialog 
        open={showJoinDialog} 
        onOpenChange={setShowJoinDialog}
        onJoin={handleJoinCommunity}
      />
      <ExitCommunityDialog 
        open={showExitDialog} 
        onOpenChange={setShowExitDialog}
        onExit={handleExitCommunity}
      />

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <UserHeader 
          user={currentUser} 
          onSavedPostsClick={handleSavedPostsClick}
          onProfileClick={handleProfileClick}
          savedPostsCount={savedPostsCount}
        />
        
        {view === 'channels' && (
          <ChannelSidebar
            channels={channels}
            activeChannelId={activeChannel?.id}
            onChannelSelect={handleChannelSelect}
            userOrderCount={currentUser.orderCount}
            onExitCommunity={() => setShowExitDialog(true)}
          />
        )}
        
        {view === 'feed' && activeChannel && (
          <ChannelFeed
            channel={activeChannel}
            posts={posts}
            onPostClick={handlePostClick}
            onPostLike={handlePostLike}
            onPostBookmark={handlePostBookmark}
            onNewPost={handleNewPost}
            onBack={handleBack}
            onAuthorClick={handleAuthorClick}
          />
        )}
        
        {view === 'post' && activePost && (
          <PostDetail
            post={activePost}
            comments={postComments}
            onBack={handleBack}
            onLike={() => handlePostLike(activePost.id)}
            onBookmark={() => handlePostBookmark(activePost.id)}
            onComment={handleNewComment}
            onAuthorClick={handleAuthorClick}
          />
        )}

        {view === 'saved' && (
          <SavedPosts
            posts={posts}
            onPostClick={(post) => {
              setPreviousView('saved');
              handlePostClick(post);
            }}
            onPostLike={handlePostLike}
            onPostBookmark={handlePostBookmark}
            onBack={handleBack}
            onAuthorClick={handleAuthorClick}
          />
        )}

        {view === 'profile' && (
          <UserProfile
            user={isViewingOwnProfile ? currentUser : undefined}
            author={viewingAuthor || undefined}
            posts={posts}
            isCurrentUser={isViewingOwnProfile}
            onBack={handleBack}
          />
        )}
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Sidebar */}
        <div className="w-80 border-r border-border/50 flex flex-col">
          <UserHeader 
            user={currentUser} 
            onSavedPostsClick={handleSavedPostsClick}
            onProfileClick={handleProfileClick}
            savedPostsCount={savedPostsCount}
          />
          <div className="flex-1 overflow-hidden">
            <ChannelSidebar
              channels={channels}
              activeChannelId={activeChannel?.id}
              onChannelSelect={handleChannelSelect}
              userOrderCount={currentUser.orderCount}
              onExitCommunity={() => setShowExitDialog(true)}
            />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Feed, Saved Posts, or Profile */}
          <div className={cn(
            'flex-1 border-r border-border/50',
            view === 'post' ? 'hidden xl:block' : ''
          )}>
            {view === 'profile' ? (
              <UserProfile
                user={isViewingOwnProfile ? currentUser : undefined}
                author={viewingAuthor || undefined}
                posts={posts}
                isCurrentUser={isViewingOwnProfile}
                onBack={handleBack}
              />
            ) : view === 'saved' ? (
              <SavedPosts
                posts={posts}
                onPostClick={(post) => {
                  setPreviousView('saved');
                  handlePostClick(post);
                }}
                onPostLike={handlePostLike}
                onPostBookmark={handlePostBookmark}
                onBack={handleBack}
                onAuthorClick={handleAuthorClick}
              />
            ) : activeChannel ? (
              <ChannelFeed
                channel={activeChannel}
                posts={posts}
                onPostClick={handlePostClick}
                onPostLike={handlePostLike}
                onPostBookmark={handlePostBookmark}
                onNewPost={handleNewPost}
                onBack={handleBack}
                onAuthorClick={handleAuthorClick}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl gradient-traya flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">💚</span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    Welcome to Traya Community
                  </h2>
                  <p className="text-muted-foreground max-w-xs">
                    Select a channel to start connecting with fellow warriors
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Post Detail (Desktop) */}
          {view === 'post' && activePost && (
            <div className="w-[480px] xl:w-[520px]">
              <PostDetail
                post={activePost}
                comments={postComments}
                onBack={handleBack}
                onLike={() => handlePostLike(activePost.id)}
                onBookmark={() => handlePostBookmark(activePost.id)}
                onComment={handleNewComment}
                onAuthorClick={handleAuthorClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}