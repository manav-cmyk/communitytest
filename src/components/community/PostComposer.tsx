import { useState } from 'react';
import { TopicTag, TypeTag } from '@/types/community';
import { topicTagLabels, typeTagLabels } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Image, X, Send } from 'lucide-react';

interface PostComposerProps {
  onSubmit: (content: string, topicTag: TopicTag, typeTag: TypeTag, images?: string[]) => void;
  onClose: () => void;
}

export function PostComposer({ onSubmit, onClose }: PostComposerProps) {
  const [content, setContent] = useState('');
  const [topicTag, setTopicTag] = useState<TopicTag>('usage');
  const [typeTag, setTypeTag] = useState<TypeTag>('qna');
  const [images, setImages] = useState<string[]>([]);
  
  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content, topicTag, typeTag, images.length > 0 ? images : undefined);
    setContent('');
    setTopicTag('usage');
    setTypeTag('qna');
    setImages([]);
    onClose();
  };
  
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-foreground text-lg">New Post</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Share with your community</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Textarea with visible border */}
      <div className="rounded-2xl border-2 border-border focus-within:border-primary transition-colors bg-background shadow-sm">
        <Textarea
          placeholder="Type your questions & doubts here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[130px] resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground/60 px-4 pt-4"
          autoFocus
        />
        <div className="px-4 pb-3 flex justify-end">
          <span className={cn("text-xs", content.length > 400 ? "text-destructive" : "text-muted-foreground/50")}>
            {content.length}/500
          </span>
        </div>
      </div>
      
      {/* Topic Tags */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Topic</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(topicTagLabels).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setTopicTag(key as TopicTag)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-full border transition-all',
                topicTag === key
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Type Tags */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(typeTagLabels)
            .filter(([key]) => key !== 'admin-posts')
            .map(([key, { label }]) => (
              <button
                key={key}
                onClick={() => setTypeTag(key as TypeTag)}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-full border transition-all',
                  typeTag === key
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                    : 'bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                )}
              >
                {label}
              </button>
            ))}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center justify-between pt-1 border-t border-border/60">
        <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
          <Image className="w-4 h-4" />
          <span>Add Photo</span>
        </button>
        
        <Button 
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="gap-2 rounded-xl px-5"
        >
          <Send className="w-4 h-4" />
          Post
        </Button>
      </div>
    </div>
  );
}
