export type UserRole = 'customer' | 'admin' | 'superadmin';

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

export interface Channel {
  id: string;
  name: string;
  description: string;
  type: ChannelType;
  icon: string;
  memberCount: number;
  unreadCount?: number;
  isAdminOnly?: boolean;
  gender?: 'male' | 'female' | 'all';
  orderRange?: [number, number]; // For cohort channels
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  role: UserRole;
  badge?: string;
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
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
  gender: 'male' | 'female';
  orderCount: number;
  joinedAt: Date;
  streak: number;
}
