import { useState } from 'react';
import { TopicTag, TypeTag } from '@/types/community';
import { topicTagLabels, typeTagLabels } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Filter, X } from 'lucide-react';

interface FilterBarProps {
  selectedTopic?: TopicTag;
  selectedType?: TypeTag;
  adminOnly: boolean;
  onTopicChange: (topic?: TopicTag) => void;
  onTypeChange: (type?: TypeTag) => void;
  onAdminOnlyChange: (adminOnly: boolean) => void;
}

export function FilterBar({
  selectedTopic,
  selectedType,
  adminOnly,
  onTopicChange,
  onTypeChange,
  onAdminOnlyChange,
}: FilterBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  
  const hasActiveFilters = selectedTopic || selectedType || adminOnly;
  
  const clearFilters = () => {
    onTopicChange(undefined);
    onTypeChange(undefined);
    onAdminOnlyChange(false);
  };
  
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all',
            hasActiveFilters
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-5 h-5 bg-primary-foreground/20 rounded-full flex items-center justify-center text-xs">
              {[selectedTopic, selectedType, adminOnly].filter(Boolean).length}
            </span>
          )}
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-2 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </button>
        )}
        
        <button
          onClick={() => onAdminOnlyChange(!adminOnly)}
          className={cn(
            'ml-auto px-3 py-2 rounded-xl text-sm font-medium transition-all',
            adminOnly
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          )}
        >
          Admin posts
        </button>
      </div>
      
      {showFilters && (
        <div className="bg-card p-4 rounded-xl border border-border/50 space-y-3 animate-slide-up">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Topic
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(topicTagLabels).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => onTopicChange(selectedTopic === key ? undefined : key as TopicTag)}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-full transition-all',
                    selectedTopic === key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Type
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(typeTagLabels).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => onTypeChange(selectedType === key ? undefined : key as TypeTag)}
                  className={cn(
                    'px-3 py-1.5 text-sm rounded-full transition-all',
                    selectedType === key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
