export type UserRole = 'customer' | 'admin' | 'superadmin';

// Discourse trust levels (0-4)
export type TrustLevel = 0 | 1 | 2 | 3 | 4;

export const trustLevelLabels: Record<TrustLevel, string> = {
  0: 'New',
  1: 'Basic',
  2: 'Member',
  3: 'Regular',
  4: 'Leader',
};

export type TopicTag = 
  | 'usage' 
  | 'shedding' 
  | 'wins' 
  | 'lifestyle' 
  | 'ops' 
  | 'announcement';

export type TypeTag = 
  | 'results' 
  | 'qna' 
  | 'updates' 
  | 'admin-posts';

export type ChannelType = 'cohort' | 'topic';

// Discourse notification levels for categories
export type NotificationLevel = 'watching' | 'tracking' | 'normal' | 'muted';

export interface Channel {
  id: string;
  name: string;
  description: string;
  type: ChannelType;
  icon: string;
  memberCount: number;
  unreadCount?: number;
  topicCount?: number;
  isAdminOnly?: boolean;
  gender?: 'male' | 'female' | 'all';
  orderRange?: [number, number]; // For cohort channels (group-based)
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  role: UserRole;
  badge?: string;
  trustLevel?: TrustLevel;
}

export interface Post {
  id: string;
  channelId: string;
  author: Author;
  content: string;
  images?: string[];
  topicTag: TopicTag;
  typeTag: TypeTag;
  likeCount: number;
  commentCount: number;
  viewCount?: number;
  isLiked: boolean;
  isBookmarked: boolean;
  isPinned?: boolean;
  isFeatured?: boolean;
  createdAt: Date;
}

export interface Comment {
  id: string;
  postId: string;
  author: Author;
  content: string;
  image?: string;
  likeCount?: number;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  gender: 'male' | 'female';
  trustLevel: TrustLevel;
  joinedAt: Date;
  lastSeenAt?: Date;
  // Discourse stats
  topicsCreated: number;
  postsCount: number;
  likesReceived: number;
  likesGiven: number;
  daysVisited: number;
  // Group membership for cohort filtering
  groups: string[];
}
