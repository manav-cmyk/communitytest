import { Home, Search, Library } from 'lucide-react';
import { cn } from '@/lib/utils';

export type MobileTab = 'home' | 'search' | 'library';

interface BottomNavProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home' as MobileTab, icon: Home, label: 'Home' },
    { id: 'search' as MobileTab, icon: Search, label: 'Search' },
    { id: 'library' as MobileTab, icon: Library, label: 'Library' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border lg:hidden">
      <div className="flex items-center justify-around h-16 px-4">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              'flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all',
              activeTab === id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className={cn('w-5 h-5', activeTab === id && 'text-primary')} />
            <span className={cn(
              'text-xs font-medium',
              activeTab === id && 'text-primary'
            )}>
              {label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
