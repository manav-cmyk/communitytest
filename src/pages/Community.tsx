import { useState, useCallback, useMemo } from 'react';
import { Channel, Post, TopicTag, TypeTag, Author } from '@/types/community';
import { channels, posts as initialPosts, comments, currentUser as initialCurrentUser, channelMembers } from '@/data/mockData';
import { ChannelSidebar } from '@/components/community/ChannelSidebar';
import { ChannelFeed } from '@/components/community/ChannelFeed';
import { PostDetail } from '@/components/community/PostDetail';
import { UserHeader } from '@/components/community/UserHeader';
import { SavedPosts } from '@/components/community/SavedPosts';
import { UserProfile } from '@/components/community/UserProfile';
import { CommunityWelcome } from '@/components/community/CommunityWelcome';
import { JoinCommunityDialog } from '@/components/community/JoinCommunityDialog';
import { ExitCommunityDialog } from '@/components/community/ExitCommunityDialog';
import { JoinChannelDialog } from '@/components/community/JoinChannelDialog';
import { ChannelMembers } from '@/components/community/ChannelMembers';
import { CommunityNameDialog } from '@/components/community/CommunityNameDialog';
import { BottomNav, MobileTab } from '@/components/community/BottomNav';
import { GlobalSearch } from '@/components/community/GlobalSearch';
import { LibraryPage } from '@/components/community/LibraryPage';
import { NotificationsPage } from '@/components/community/NotificationsPage';
import { cn } from '@/lib/utils';

type View = 'channels' | 'feed' | 'post' | 'saved' | 'profile' | 'members' | 'notifications';
type OnboardingStep = 'welcome' | 'join-dialog' | 'name-dialog' | 'complete';

export default function Community() {
  const [view, setView] = useState<View>('channels');
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [posts, setPosts] = useState(initialPosts);
  const [previousView, setPreviousView] = useState<View>('channels');
  const [viewingAuthor, setViewingAuthor] = useState<Author | null>(null);
  const [isViewingOwnProfile, setIsViewingOwnProfile] = useState(false);
  
  // Community membership and onboarding state
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>('welcome');
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialCurrentUser);
  
  // Per-channel join state (topic channels only)
  const [joinedChannels, setJoinedChannels] = useState<Set<string>>(new Set());
  const [showJoinChannelDialog, setShowJoinChannelDialog] = useState(false);
  const [pendingJoinChannel, setPendingJoinChannel] = useState<Channel | null>(null);
  
  // Track visited cohort channels for first-time welcome popup
  const [visitedCohorts, setVisitedCohorts] = useState<Set<string>>(new Set());
  
  // Mobile bottom nav tab
  const [mobileTab, setMobileTab] = useState<MobileTab>('home');
  
  const handleMobileTabChange = useCallback((tab: MobileTab) => {
    setMobileTab(tab);
    // Reset view when switching tabs
    if (tab === 'home') {
      setView('channels');
      setActiveChannel(null);
      setActivePost(null);
    }
  }, []);
  
  const handleCohortVisited = useCallback((channelId: string) => {
    setVisitedCohorts(prev => new Set([...prev, channelId]));
  }, []);
  
  const handleWelcomeJoin = useCallback(() => {
    // Skip join-dialog, go directly to name dialog
    setOnboardingStep('name-dialog');
  }, []);

  const handleNameSubmit = useCallback((name: string) => {
    setCurrentUser(prev => ({ ...prev, name }));
    setOnboardingStep('complete');
  }, []);
  
  const handleExitCommunity = useCallback(() => {
    setOnboardingStep('welcome');
    setShowExitDialog(false);
    setActiveChannel(null);
    setActivePost(null);
    setView('channels');
    setJoinedChannels(new Set());
  }, []);

  const handleJoinChannel = useCallback((channel: Channel) => {
    setJoinedChannels(prev => new Set([...prev, channel.id]));
    setShowJoinChannelDialog(false);
    setPendingJoinChannel(null);
  }, []);

  const handleLeaveChannel = useCallback((channelId: string) => {
    setJoinedChannels(prev => {
      const newSet = new Set(prev);
      newSet.delete(channelId);
      return newSet;
    });
  }, []);

  const isChannelJoined = useCallback((channel: Channel) => {
    // Cohort channels are auto-joined
    if (channel.type === 'cohort') return true;
    return joinedChannels.has(channel.id);
  }, [joinedChannels]);
  
  const handleChannelSelect = useCallback((channel: Channel) => {
    if (onboardingStep !== 'complete') {
      setOnboardingStep('join-dialog');
      return;
    }
    
    // Auto-join topic channels when selected
    if (channel.type === 'topic' && !joinedChannels.has(channel.id)) {
      setJoinedChannels(prev => new Set([...prev, channel.id]));
    }
    
    setActiveChannel(channel);
    setView('feed');
  }, [onboardingStep, joinedChannels]);

  const handleMembersClick = useCallback(() => {
    setPreviousView(view);
    setView('members');
  }, [view]);
  
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
      setView(previousView === 'post' ? 'post' : previousView === 'feed' ? 'feed' : previousView === 'members' ? 'members' : 'channels');
    } else if (view === 'members') {
      setView('feed');
    } else if (view === 'notifications') {
      setView('channels');
    }
  }, [view, previousView]);

  const handleNotificationsClick = useCallback(() => {
    setPreviousView(view);
    setView('notifications');
  }, [view]);

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
    
    // Find author from posts, comments, or channel members
    const foundPost = posts.find(p => p.author.id === authorId);
    const foundComment = comments.find(c => c.author.id === authorId);
    let author = foundPost?.author || foundComment?.author;
    
    // Also check channel members
    if (!author && activeChannel) {
      const members = channelMembers[activeChannel.id] || [];
      const member = members.find(m => m.id === authorId);
      if (member) {
        author = {
          id: member.id,
          name: member.name,
          avatar: member.avatar,
          role: member.role,
          badge: member.badge,
        };
      }
    }
    
    if (author) {
      setPreviousView(view);
      setViewingAuthor(author);
      setIsViewingOwnProfile(false);
      setView('profile');
    }
  }, [view, posts, handleProfileClick, activeChannel]);

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

  const activeChannelMembers = activeChannel 
    ? channelMembers[activeChannel.id] || []
    : [];

  // Show welcome/onboarding screens if not complete
  if (onboardingStep !== 'complete') {
    return (
      <>
        <CommunityWelcome onJoin={handleWelcomeJoin} />
        <CommunityNameDialog
          open={onboardingStep === 'name-dialog'}
          onOpenChange={(open) => !open && setOnboardingStep('welcome')}
          onSubmit={handleNameSubmit}
        />
      </>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      {/* Dialogs */}
      <ExitCommunityDialog 
        open={showExitDialog} 
        onOpenChange={setShowExitDialog}
        onExit={handleExitCommunity}
      />
      <JoinChannelDialog
        open={showJoinChannelDialog}
        onOpenChange={setShowJoinChannelDialog}
        channel={pendingJoinChannel}
        onJoin={() => {
          if (pendingJoinChannel) {
            handleJoinChannel(pendingJoinChannel);
            setActiveChannel(pendingJoinChannel);
            setView('feed');
          }
        }}
      />

      {/* Mobile Layout */}
      <div className="lg:hidden pb-16">
        {/* Home Tab */}
        {mobileTab === 'home' && (
          <>
            {view === 'channels' && (
              <>
                <UserHeader 
                  user={currentUser} 
                  onSavedPostsClick={handleSavedPostsClick}
                  onProfileClick={handleProfileClick}
                  onNotificationsClick={handleNotificationsClick}
                  savedPostsCount={savedPostsCount}
                />
                <ChannelSidebar
                  channels={channels}
                  activeChannelId={activeChannel?.id}
                  onChannelSelect={handleChannelSelect}
                  userGroups={currentUser.groups}
                  joinedChannels={joinedChannels}
                />
              </>
            )}
            
            {view === 'feed' && activeChannel && (
              <ChannelFeed
                channel={activeChannel}
                posts={posts}
                isJoined={isChannelJoined(activeChannel)}
                onPostClick={handlePostClick}
                onPostLike={handlePostLike}
                onPostBookmark={handlePostBookmark}
                onNewPost={handleNewPost}
                onBack={handleBack}
                onAuthorClick={handleAuthorClick}
                onMembersClick={handleMembersClick}
                onJoinChannel={() => handleJoinChannel(activeChannel)}
                onLeaveChannel={() => handleLeaveChannel(activeChannel.id)}
                visitedCohorts={visitedCohorts}
                onCohortVisited={handleCohortVisited}
              />
            )}

            {view === 'members' && activeChannel && (
              <ChannelMembers
                channelName={activeChannel.name}
                channelIcon={activeChannel.icon}
                members={activeChannelMembers}
                onBack={handleBack}
                onMemberClick={handleAuthorClick}
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
                onExitCommunity={() => setShowExitDialog(true)}
              />
            )}

            {view === 'notifications' && (
              <NotificationsPage onBack={handleBack} />
            )}
          </>
        )}
        
        {/* Search Tab */}
        {mobileTab === 'search' && (
          <GlobalSearch
            posts={posts}
            onPostClick={(post) => {
              setMobileTab('home');
              handlePostClick(post);
            }}
            onPostLike={handlePostLike}
            onPostBookmark={handlePostBookmark}
            onAuthorClick={handleAuthorClick}
          />
        )}
        
        {/* Library Tab */}
        {mobileTab === 'library' && (
          <LibraryPage />
        )}
        
        {/* Bottom Navigation */}
        <BottomNav activeTab={mobileTab} onTabChange={handleMobileTabChange} />
      </div>
      
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Sidebar */}
        <div className="w-80 border-r border-border/50 flex flex-col">
          <UserHeader 
            user={currentUser} 
            onSavedPostsClick={handleSavedPostsClick}
            onProfileClick={handleProfileClick}
            onNotificationsClick={handleNotificationsClick}
            savedPostsCount={savedPostsCount}
          />
          <div className="flex-1 overflow-hidden">
            <ChannelSidebar
              channels={channels}
              activeChannelId={activeChannel?.id}
              onChannelSelect={handleChannelSelect}
              userGroups={currentUser.groups}
              joinedChannels={joinedChannels}
            />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Feed, Members, Saved Posts, or Profile */}
          <div className={cn(
            'flex-1 border-r border-border/50',
            view === 'post' ? 'hidden xl:block' : ''
          )}>
            {view === 'members' && activeChannel ? (
              <ChannelMembers
                channelName={activeChannel.name}
                channelIcon={activeChannel.icon}
                members={activeChannelMembers}
                onBack={handleBack}
                onMemberClick={handleAuthorClick}
              />
            ) : view === 'profile' ? (
              <UserProfile
                user={isViewingOwnProfile ? currentUser : undefined}
                author={viewingAuthor || undefined}
                posts={posts}
                isCurrentUser={isViewingOwnProfile}
                onBack={handleBack}
                onExitCommunity={() => setShowExitDialog(true)}
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
                isJoined={isChannelJoined(activeChannel)}
                onPostClick={handlePostClick}
                onPostLike={handlePostLike}
                onPostBookmark={handlePostBookmark}
                onNewPost={handleNewPost}
                onBack={handleBack}
                onAuthorClick={handleAuthorClick}
                onMembersClick={handleMembersClick}
                onJoinChannel={() => handleJoinChannel(activeChannel)}
                onLeaveChannel={() => handleLeaveChannel(activeChannel.id)}
                visitedCohorts={visitedCohorts}
                onCohortVisited={handleCohortVisited}
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