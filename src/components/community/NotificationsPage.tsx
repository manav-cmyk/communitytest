import { ArrowLeft, MessageCircle, Heart, AtSign, Bell, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'reply' | 'like' | 'mention';
  message: string;
  from: string;
  time: string;
  isRead: boolean;
}

interface NotificationsPageProps {
  onBack: () => void;
  onClose?: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'reply',
    message: 'replied to your post about hair regrowth',
    from: 'Dr. Shailendra',
    time: '2 hours ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'like',
    message: 'liked your progress update',
    from: 'Rahul M.',
    time: '5 hours ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'mention',
    message: 'mentioned you in Month 2 Warriors',
    from: 'Priya S.',
    time: '1 day ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'reply',
    message: 'answered your question about minoxidil usage',
    from: 'Coach Neha',
    time: '2 days ago',
    isRead: true,
  },
  {
    id: '5',
    type: 'like',
    message: 'and 3 others liked your before/after photos',
    from: 'Amit K.',
    time: '3 days ago',
    isRead: true,
  },
];

const notificationIcons = {
  reply: MessageCircle,
  like: Heart,
  mention: AtSign,
};

export function NotificationsPage({ onBack, onClose }: NotificationsPageProps) {
  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

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
      
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border/50">
        <div className="p-4 pr-10 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold text-lg text-foreground">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
            )}
          </div>
          <button className="text-sm text-primary font-medium hover:underline">
            Mark all read
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
        {mockNotifications.length > 0 ? (
          <div className="divide-y divide-border/50">
            {mockNotifications.map((notification) => {
              const Icon = notificationIcons[notification.type];
              return (
                <button
                  key={notification.id}
                  className={cn(
                    'w-full p-4 flex items-start gap-3 text-left hover:bg-muted/50 transition-colors',
                    !notification.isRead && 'bg-primary/5'
                  )}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    notification.type === 'reply' && 'bg-blue-100 text-blue-600',
                    notification.type === 'like' && 'bg-red-100 text-red-500',
                    notification.type === 'mention' && 'bg-purple-100 text-purple-600'
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">{notification.from}</span>{' '}
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notification.time}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}