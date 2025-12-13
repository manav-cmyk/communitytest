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
    <div className="bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden animate-scale-in">
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <h3 className="font-semibold text-foreground">Create Post</h3>
        <button 
          onClick={onClose}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        <Textarea
          placeholder="Write your question or update..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] resize-none border-0 bg-secondary/30 focus-visible:ring-1 focus-visible:ring-primary"
        />
        
        {/* Topic Tags */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Topic</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(topicTagLabels).map(([key, { label }]) => (
              <button
                key={key}
                onClick={() => setTopicTag(key as TopicTag)}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded-full transition-all',
                  topicTag === key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Type Tags */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Type</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(typeTagLabels)
              .filter(([key]) => key !== 'admin-posts')
              .map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => setTypeTag(key as TypeTag)}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium rounded-full transition-all',
                    typeTag === key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  )}
                >
                  {label}
                </button>
              ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors">
            <Image className="w-4 h-4" />
            <span>Add Photo</span>
          </button>
          
          <Button 
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
