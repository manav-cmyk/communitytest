import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, ArrowLeft, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // Getting Started
  {
    id: '1',
    question: 'How do I get started with the community?',
    answer: 'After joining, you\'ll be automatically added to your cohort channel based on your order history. You can explore topic channels, introduce yourself, and start engaging with posts from other members.',
    category: 'Getting Started',
  },
  {
    id: '2',
    question: 'What is a cohort channel?',
    answer: 'Cohort channels group members based on their journey stage (Month 1, Month 2, etc.). You\'ll find people at similar stages, making it easier to share experiences and support each other.',
    category: 'Getting Started',
  },
  {
    id: '3',
    question: 'How do I change my community name?',
    answer: 'Currently, your community name is set during onboarding. If you need to change it, please contact support.',
    category: 'Getting Started',
  },
  // Using the Community
  {
    id: '4',
    question: 'How do I join topic channels?',
    answer: 'Browse available topic channels from the home screen. Tap on any channel to view it, then use the "Join" button to subscribe. You can choose notification preferences when joining.',
    category: 'Using the Community',
  },
  {
    id: '5',
    question: 'How do I save posts for later?',
    answer: 'Tap the bookmark icon on any post to save it. Access your saved posts anytime from the bookmark icon in the header.',
    category: 'Using the Community',
  },
  {
    id: '6',
    question: 'Can I post images?',
    answer: 'Yes! When creating a post, you can add images to share your progress or illustrate your questions. Tap the image icon in the post composer.',
    category: 'Using the Community',
  },
  // Guidelines
  {
    id: '7',
    question: 'What are the community guidelines?',
    answer: 'Be respectful and supportive of fellow members. Share your experiences honestly. Avoid medical advice - leave that to our experts. No spam or promotional content. Report any inappropriate behavior.',
    category: 'Guidelines',
  },
  {
    id: '8',
    question: 'What happens if I break the rules?',
    answer: 'Minor violations result in a warning. Repeated or serious violations may lead to temporary or permanent suspension from the community.',
    category: 'Guidelines',
  },
  // Trust Levels
  {
    id: '9',
    question: 'What are trust levels?',
    answer: 'Trust levels (0-4) reflect your participation and standing in the community. Higher levels unlock additional features like editing titles and more posting privileges.',
    category: 'Trust Levels',
  },
  {
    id: '10',
    question: 'How do I increase my trust level?',
    answer: 'Engage positively with the community: read posts, like helpful content, reply thoughtfully, and visit regularly. Trust levels increase automatically based on your activity.',
    category: 'Trust Levels',
  },
];

const categories = [...new Set(faqs.map(faq => faq.category))];

interface LibraryPageProps {
  onBack?: () => void;
  onClose?: () => void;
}

export function LibraryPage({ onBack, onClose }: LibraryPageProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredFaqs = selectedCategory
    ? faqs.filter(faq => faq.category === selectedCategory)
    : faqs;

  return (
    <div className="h-full flex flex-col bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border/50 p-4">
        <div className="flex items-center gap-3 mb-4">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-xl text-foreground">FAQ</h1>
            <p className="text-sm text-muted-foreground">Frequently asked questions</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all',
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            )}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredFaqs.map(faq => (
          <div
            key={faq.id}
            className="bg-card rounded-xl border border-border/50 overflow-hidden"
          >
            <button
              onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="font-medium text-foreground pr-4">{faq.question}</span>
              {expandedId === faq.id ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            {expandedId === faq.id && (
              <div className="px-4 pb-4 animate-fade-in">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {faq.answer}
                </p>
                <span className="inline-block mt-3 px-2 py-0.5 bg-secondary rounded text-xs text-muted-foreground">
                  {faq.category}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
