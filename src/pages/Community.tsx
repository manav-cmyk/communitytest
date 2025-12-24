import { useState, useCallback, useMemo } from 'react';
import { Channel, Post, TopicTag, TypeTag } from '@/types/community';
import { channels, posts as initialPosts, comments, currentUser } from '@/data/mockData';
import { ChannelSidebar } from '@/components/community/ChannelSidebar';
import { ChannelFeed } from '@/components/community/ChannelFeed';
import { PostDetail } from '@/components/community/PostDetail';
import { UserHeader } from '@/components/community/UserHeader';
import { SavedPosts } from '@/components/community/SavedPosts';
import { cn } from '@/lib/utils';

type View = 'channels' | 'feed' | 'post' | 'saved';

export default function Community() {
  const [view, setView] = useState<View>('channels');
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [posts, setPosts] = useState(initialPosts);
  const [previousView, setPreviousView] = useState<View>('channels');
  
  const handleChannelSelect = useCallback((channel: Channel) => {
    setActiveChannel(channel);
    setView('feed');
  }, []);
  
  const handlePostClick = useCallback((post: Post) => {
    setActivePost(post);
    setView('post');
  }, []);
  
  const handleBack = useCallback(() => {
    if (view === 'post') {
      setActivePost(null);
      setView(previousView === 'saved' ? 'saved' : 'feed');
    } else if (view === 'feed') {
      setActiveChannel(null);
      setView('channels');
    } else if (view === 'saved') {
      setView('channels');
    }
  }, [view, previousView]);

  const handleSavedPostsClick = useCallback(() => {
    setPreviousView(view);
    setView('saved');
  }, [view]);

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
  
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <UserHeader 
          user={currentUser} 
          onSavedPostsClick={handleSavedPostsClick}
          savedPostsCount={savedPostsCount}
        />
        
        {view === 'channels' && (
          <ChannelSidebar
            channels={channels}
            activeChannelId={activeChannel?.id}
            onChannelSelect={handleChannelSelect}
            userOrderCount={currentUser.orderCount}
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
            savedPostsCount={savedPostsCount}
          />
          <div className="flex-1 overflow-hidden">
            <ChannelSidebar
              channels={channels}
              activeChannelId={activeChannel?.id}
              onChannelSelect={handleChannelSelect}
              userOrderCount={currentUser.orderCount}
            />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Feed or Saved Posts */}
          <div className={cn(
            'flex-1 border-r border-border/50',
            view === 'post' ? 'hidden xl:block' : ''
          )}>
            {view === 'saved' ? (
              <SavedPosts
                posts={posts}
                onPostClick={(post) => {
                  setPreviousView('saved');
                  handlePostClick(post);
                }}
                onPostLike={handlePostLike}
                onPostBookmark={handlePostBookmark}
                onBack={handleBack}
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
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
