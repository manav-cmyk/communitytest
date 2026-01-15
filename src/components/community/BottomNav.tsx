import { Home, Search, HelpCircle, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type MobileTab = 'home' | 'search' | 'faq';

interface BottomNavProps {
  activeTab: MobileTab;
  onTabChange: (tab: MobileTab) => void;
  onBackToApp?: () => void;
}

export function BottomNav({ activeTab, onTabChange, onBackToApp }: BottomNavProps) {
  const tabs = [
    { id: 'home' as MobileTab, icon: Home, label: 'Home' },
    { id: 'search' as MobileTab, icon: Search, label: 'Search' },
    { id: 'faq' as MobileTab, icon: HelpCircle, label: 'FAQ' },
  ];

  const handleBackToApp = () => {
    if (onBackToApp) {
      onBackToApp();
    } else {
      // Default behavior - could navigate to main app URL
      console.log('Navigate back to Traya App');
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border lg:hidden">
      <div className="flex items-center justify-around h-16 px-4">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all',
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
        
        {/* Back to Traya App Button - Prominent */}
        <button
          onClick={handleBackToApp}
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
        >
          <ArrowUpRight className="w-4 h-4" />
          <span className="text-sm font-semibold">Traya App</span>
        </button>
      </div>
    </nav>
  );
}
