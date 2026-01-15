import { useState } from 'react';
import { ChevronDown, ChevronUp, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const infoItems: FAQItem[] = [
  {
    id: '1',
    question: 'How do I get started with the community?',
    answer: 'After joining, you\'ll be automatically added to your cohort channel based on your order history. You can explore topic channels, introduce yourself, and start engaging with posts from other members.',
  },
  {
    id: '2',
    question: 'What is a cohort channel?',
    answer: 'Cohort channels group members based on their journey stage (Month 1, Month 2, etc.). You\'ll find people at similar stages, making it easier to share experiences and support each other.',
  },
  {
    id: '3',
    question: 'How do I join topic channels?',
    answer: 'Browse available topic channels from the home screen. Tap on any channel to view it, then use the "Join" button to subscribe. You can choose notification preferences when joining.',
  },
  {
    id: '4',
    question: 'How do I save posts for later?',
    answer: 'Tap the bookmark icon on any post to save it. Access your saved posts anytime from the bookmark icon in the header.',
  },
  {
    id: '5',
    question: 'Can I post images?',
    answer: 'Yes! When creating a post, you can add images to share your progress or illustrate your questions. Tap the image icon in the post composer.',
  },
  {
    id: '6',
    question: 'What are the community guidelines?',
    answer: 'Be respectful and supportive of fellow members. Share your experiences honestly. Avoid medical advice - leave that to our experts. No spam or promotional content. Report any inappropriate behavior.',
  },
];

interface FAQDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FAQDialog({ open, onOpenChange }: FAQDialogProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-4 pb-2 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Info className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="font-bold text-xl text-foreground">Info</DialogTitle>
              <p className="text-sm text-muted-foreground">How to use community</p>
            </div>
          </div>
        </DialogHeader>

        {/* Info List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {infoItems.map(item => (
            <div
              key={item.id}
              className="bg-muted/50 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-medium text-foreground pr-4 text-sm">{item.question}</span>
                {expandedId === item.id ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
              </button>
              {expandedId === item.id && (
                <div className="px-4 pb-4 animate-fade-in">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
