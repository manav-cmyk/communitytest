import { Channel, Post, Comment, User, TrustLevel, NotificationLevel } from '@/types/community';

export const currentUser: User = {
  id: 'user-1',
  name: 'Priya Sharma',
  username: 'priya_sharma',
  avatar: undefined,
  gender: 'female',
  trustLevel: 2,
  joinedAt: new Date('2024-10-15'),
  lastSeenAt: new Date(),
  topicsCreated: 3,
  postsCount: 12,
  likesReceived: 45,
  likesGiven: 78,
  daysVisited: 42,
  groups: ['month-2', 'female-members'],
};

export const channels: Channel[] = [
  // Cohort Channels (Discourse Groups)
  {
    id: 'month-1',
    name: 'Month 1 Warriors',
    description: 'Your first month journey - usage tips, expectations & support',
    type: 'cohort',
    icon: '🌱',
    memberCount: 284,
    topicCount: 156,
    unreadCount: 5,
    orderRange: [1, 1],
  },
  {
    id: 'month-2',
    name: 'Month 2 Cohort',
    description: 'Building consistency and seeing early signs',
    type: 'cohort',
    icon: '🌿',
    memberCount: 312,
    topicCount: 203,
    unreadCount: 3,
    orderRange: [2, 2],
  },
  {
    id: 'month-3',
    name: 'Month 3 Cohort',
    description: 'Halfway there! Celebrating progress',
    type: 'cohort',
    icon: '🌳',
    memberCount: 198,
    topicCount: 134,
    orderRange: [3, 3],
  },
  {
    id: 'month-4',
    name: 'Month 4 Cohort',
    description: 'Visible changes starting to show',
    type: 'cohort',
    icon: '💪',
    memberCount: 156,
    topicCount: 98,
    orderRange: [4, 4],
  },
  {
    id: 'advanced',
    name: 'Advanced Warriors',
    description: 'Month 5-8: Transformation phase',
    type: 'cohort',
    icon: '⭐',
    memberCount: 423,
    topicCount: 287,
    orderRange: [5, 8],
  },
  {
    id: 'lifetime',
    name: 'Lifetime Champions',
    description: 'Our success stories and mentors',
    type: 'cohort',
    icon: '👑',
    memberCount: 89,
    topicCount: 456,
    orderRange: [8, 100],
  },
  // Topic Channels (Discourse Categories)
  {
    id: 'minoxidil',
    name: 'Minoxidil Support',
    description: 'Everything about Minoxidil usage & queries',
    type: 'topic',
    icon: '💧',
    memberCount: 1243,
    topicCount: 892,
  },
  {
    id: 'hormones-pcos',
    name: 'Hormones & PCOS',
    description: 'Managing hormonal hairfall',
    type: 'topic',
    icon: '🔬',
    memberCount: 567,
    topicCount: 234,
    gender: 'female',
  },
  {
    id: 'nutrition',
    name: 'Nutrition & Diet',
    description: 'Food tips for healthy hair',
    type: 'topic',
    icon: '🥗',
    memberCount: 892,
    topicCount: 445,
  },
  {
    id: 'progress',
    name: 'Progress Updates',
    description: 'Share your journey milestones',
    type: 'topic',
    icon: '📈',
    memberCount: 1567,
    topicCount: 1203,
  },
  {
    id: 'results',
    name: 'Results Gallery',
    description: 'Before & after transformations',
    type: 'topic',
    icon: '🎉',
    memberCount: 2134,
    topicCount: 678,
    isAdminOnly: true,
  },
  {
    id: 'yoga-exercise',
    name: 'Yoga & Exercise',
    description: 'Fitness tips for hair health',
    type: 'topic',
    icon: '🧘',
    memberCount: 445,
    topicCount: 167,
  },
];

export const posts: Post[] = [
  {
    id: 'post-1',
    channelId: 'month-2',
    author: {
      id: 'admin-1',
      name: 'Dr. Meera',
      role: 'admin',
      badge: 'Hair Expert',
      trustLevel: 4,
    },
    content: '📌 Week 5-8 Expectations\n\nHello warriors! By now, you might notice:\n\n✨ Reduced hairfall during wash\n✨ Less hair on pillow/comb\n✨ Scalp feels healthier\n\nRemember: Visible regrowth starts month 4-5. Stay consistent with your rituals! 💚\n\nDrop a 🙌 if you\'re seeing any positive changes!',
    topicTag: 'usage',
    typeTag: 'admin-posts',
    likeCount: 89,
    commentCount: 34,
    viewCount: 412,
    isLiked: true,
    isBookmarked: false,
    isPinned: true,
    createdAt: new Date('2024-12-12T10:00:00'),
  },
  {
    id: 'post-2',
    channelId: 'month-2',
    author: {
      id: 'user-2',
      name: 'Ananya K',
      role: 'customer',
      trustLevel: 1,
    },
    content: 'Quick question - should I apply Minoxidil on wet or dry scalp? I\'ve been doing it on damp hair but not sure if that\'s reducing effectiveness.',
    topicTag: 'usage',
    typeTag: 'qna',
    likeCount: 12,
    commentCount: 8,
    viewCount: 156,
    isLiked: false,
    isBookmarked: false,
    createdAt: new Date('2024-12-12T14:30:00'),
  },
  {
    id: 'post-3',
    channelId: 'month-2',
    author: {
      id: 'user-3',
      name: 'Deepika M',
      role: 'customer',
      trustLevel: 2,
    },
    content: 'Completed 6 weeks today! 🎉 The shedding has definitely reduced. Was losing 150+ strands initially, now down to about 60-70. Still waiting for new growth but feeling hopeful!\n\nKeep going everyone! 💚',
    topicTag: 'wins',
    typeTag: 'updates',
    likeCount: 67,
    commentCount: 15,
    viewCount: 289,
    isLiked: true,
    isBookmarked: true,
    createdAt: new Date('2024-12-11T18:45:00'),
  },
  {
    id: 'post-4',
    channelId: 'month-2',
    author: {
      id: 'user-4',
      name: 'Ritu S',
      role: 'customer',
      trustLevel: 1,
    },
    content: 'Is it normal to experience more shedding in week 4? I was doing okay and suddenly it increased again. Feeling worried 😟',
    topicTag: 'shedding',
    typeTag: 'qna',
    likeCount: 23,
    commentCount: 19,
    viewCount: 234,
    isLiked: false,
    isBookmarked: false,
    createdAt: new Date('2024-12-11T09:20:00'),
  },
  {
    id: 'post-5',
    channelId: 'progress',
    author: {
      id: 'user-5',
      name: 'Kavitha R',
      role: 'customer',
      trustLevel: 3,
    },
    content: 'Month 3 update! 📸\n\nFinally seeing baby hairs around my hairline. The patience is paying off. Started with severe thinning at the crown, and while it\'s not fully recovered, there\'s visible improvement.\n\nMy routine:\n• Minoxidil 2x daily\n• Scalp oil 2x week\n• Never skip supplements',
    images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400'],
    topicTag: 'wins',
    typeTag: 'results',
    likeCount: 156,
    commentCount: 42,
    viewCount: 1234,
    isLiked: true,
    isBookmarked: true,
    isFeatured: true,
    createdAt: new Date('2024-12-10T16:00:00'),
  },
];

export const comments: Comment[] = [
  {
    id: 'comment-1',
    postId: 'post-2',
    author: {
      id: 'admin-1',
      name: 'Dr. Meera',
      role: 'admin',
      badge: 'Hair Expert',
      trustLevel: 4,
    },
    content: 'Great question! Always apply Minoxidil on a clean, completely dry scalp. Wet or damp hair can dilute the solution and reduce absorption. Wait at least 10-15 minutes after washing before applying. 💚',
    likeCount: 24,
    createdAt: new Date('2024-12-12T14:45:00'),
  },
  {
    id: 'comment-2',
    postId: 'post-2',
    author: {
      id: 'user-6',
      name: 'Sneha P',
      role: 'customer',
      trustLevel: 2,
    },
    content: 'I had the same doubt! Been applying on dry scalp for 2 weeks now and can definitely feel better absorption.',
    likeCount: 5,
    createdAt: new Date('2024-12-12T15:10:00'),
  },
  {
    id: 'comment-3',
    postId: 'post-4',
    author: {
      id: 'admin-2',
      name: 'Coach Priya',
      role: 'admin',
      badge: 'Community Manager',
      trustLevel: 4,
    },
    content: 'Hi Ritu! This is completely normal and nothing to worry about. Week 3-5 can see fluctuations as your scalp adjusts. This is often called "shedding phase" where weak hairs make way for stronger ones. Keep following your routine consistently. If it continues beyond week 8, let\'s arrange a call with our doctor. You\'re doing great! 💪',
    likeCount: 18,
    createdAt: new Date('2024-12-11T10:00:00'),
  },
];

export const topicTagLabels: Record<string, { label: string; color: string }> = {
  usage: { label: 'Usage', color: 'bg-primary/10 text-primary' },
  shedding: { label: 'Shedding', color: 'bg-warning/10 text-warning' },
  wins: { label: 'Wins', color: 'bg-success/10 text-success' },
  lifestyle: { label: 'Lifestyle', color: 'bg-accent text-accent-foreground' },
  ops: { label: 'Ops', color: 'bg-muted text-muted-foreground' },
  announcement: { label: 'Announcement', color: 'bg-primary text-primary-foreground' },
};

export const typeTagLabels: Record<string, { label: string; color: string }> = {
  results: { label: 'Results', color: 'bg-success/10 text-success' },
  qna: { label: 'Q&A', color: 'bg-primary/10 text-primary' },
  updates: { label: 'Updates', color: 'bg-accent text-accent-foreground' },
  'admin-posts': { label: 'Admin', color: 'bg-primary text-primary-foreground' },
};

// Channel members mock data
export interface ChannelMember {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  role: 'admin' | 'customer';
  badge?: string;
  trustLevel: TrustLevel;
  isModerator?: boolean;
  joinedAt: Date;
}

export const channelMembers: Record<string, ChannelMember[]> = {
  'month-2': [
    { id: 'admin-1', name: 'Dr. Meera', username: 'dr_meera', role: 'admin', badge: 'Hair Expert', trustLevel: 4, isModerator: true, joinedAt: new Date('2024-01-01') },
    { id: 'admin-2', name: 'Coach Priya', username: 'coach_priya', role: 'admin', badge: 'Community Manager', trustLevel: 4, isModerator: true, joinedAt: new Date('2024-01-15') },
    { id: 'user-2', name: 'Ananya K', username: 'ananya_k', role: 'customer', trustLevel: 1, joinedAt: new Date('2024-11-10') },
    { id: 'user-3', name: 'Deepika M', username: 'deepika_m', role: 'customer', trustLevel: 2, joinedAt: new Date('2024-11-05') },
    { id: 'user-4', name: 'Ritu S', username: 'ritu_s', role: 'customer', trustLevel: 1, joinedAt: new Date('2024-11-20') },
    { id: 'user-1', name: 'Priya Sharma', username: 'priya_sharma', role: 'customer', trustLevel: 2, joinedAt: new Date('2024-10-15') },
  ],
  'minoxidil': [
    { id: 'admin-1', name: 'Dr. Meera', username: 'dr_meera', role: 'admin', badge: 'Hair Expert', trustLevel: 4, isModerator: true, joinedAt: new Date('2024-01-01') },
    { id: 'user-7', name: 'Neha R', username: 'neha_r', role: 'customer', trustLevel: 2, joinedAt: new Date('2024-09-01') },
    { id: 'user-8', name: 'Pooja T', username: 'pooja_t', role: 'customer', trustLevel: 1, joinedAt: new Date('2024-10-05') },
  ],
  'hormones-pcos': [
    { id: 'admin-3', name: 'Dr. Sneha', username: 'dr_sneha', role: 'admin', badge: 'PCOS Specialist', trustLevel: 4, isModerator: true, joinedAt: new Date('2024-02-01') },
    { id: 'user-9', name: 'Meghna S', username: 'meghna_s', role: 'customer', trustLevel: 2, joinedAt: new Date('2024-08-15') },
  ],
  'nutrition': [
    { id: 'admin-4', name: 'Nutritionist Ria', username: 'nutritionist_ria', role: 'admin', badge: 'Diet Expert', trustLevel: 4, isModerator: true, joinedAt: new Date('2024-03-01') },
    { id: 'user-10', name: 'Aditi V', username: 'aditi_v', role: 'customer', trustLevel: 1, joinedAt: new Date('2024-07-20') },
  ],
  'progress': [
    { id: 'admin-2', name: 'Coach Priya', username: 'coach_priya', role: 'admin', badge: 'Community Manager', trustLevel: 4, isModerator: true, joinedAt: new Date('2024-01-15') },
    { id: 'user-5', name: 'Kavitha R', username: 'kavitha_r', role: 'customer', trustLevel: 3, joinedAt: new Date('2024-06-10') },
  ],
  'results': [
    { id: 'admin-1', name: 'Dr. Meera', username: 'dr_meera', role: 'admin', badge: 'Hair Expert', trustLevel: 4, isModerator: true, joinedAt: new Date('2024-01-01') },
  ],
  'yoga-exercise': [
    { id: 'admin-5', name: 'Coach Arun', username: 'coach_arun', role: 'admin', badge: 'Fitness Expert', trustLevel: 4, isModerator: true, joinedAt: new Date('2024-04-01') },
    { id: 'user-11', name: 'Simran K', username: 'simran_k', role: 'customer', trustLevel: 1, joinedAt: new Date('2024-09-25') },
  ],
};

// User's notification level for each channel (Discourse-style)
export const userChannelSettings: Record<string, NotificationLevel> = {
  'month-2': 'watching',
  'minoxidil': 'tracking',
  'progress': 'normal',
};
