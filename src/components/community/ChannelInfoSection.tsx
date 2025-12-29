import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BookOpen, Calendar, HelpCircle, Shield } from 'lucide-react';

interface ChannelInfoSectionProps {
  channelName: string;
  channelType: 'cohort' | 'topic';
}

export function ChannelInfoSection({ channelName, channelType }: ChannelInfoSectionProps) {
  const isCohort = channelType === 'cohort';
  
  return (
    <div className="bg-secondary/30 border border-border/50 rounded-xl mx-4 mb-4 overflow-hidden">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="basics" className="border-b border-border/30">
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-secondary/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium text-sm">Community Basics</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-muted-foreground pl-11">
              <p>Welcome to the Traya Community! Here's how to get the most out of it:</p>
              <ul className="space-y-2">
                <li><strong>Share openly:</strong> Your journey helps others</li>
                <li><strong>Ask questions:</strong> No question is too small</li>
                <li><strong>Support each other:</strong> We're all in this together</li>
                <li><strong>Stay consistent:</strong> Daily check-ins build momentum</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="expectations" className="border-b border-border/30">
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-secondary/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-success" />
              </div>
              <span className="font-medium text-sm">What to Expect This Month</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-muted-foreground pl-11">
              {isCohort ? (
                <>
                  <p>Your journey this month focuses on:</p>
                  <ul className="space-y-2">
                    <li>✨ Building consistent routines</li>
                    <li>✨ Understanding normal vs concerning shedding</li>
                    <li>✨ Learning from others at your stage</li>
                    <li>✨ Tracking early signs of progress</li>
                  </ul>
                  <p className="text-primary/80 font-medium mt-3">Remember: Results vary, but consistency is key!</p>
                </>
              ) : (
                <>
                  <p>In this topic channel, you can:</p>
                  <ul className="space-y-2">
                    <li>✨ Find specialized tips and guidance</li>
                    <li>✨ Ask topic-specific questions</li>
                    <li>✨ Share your experiences</li>
                    <li>✨ Learn from expert posts</li>
                  </ul>
                </>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="faq" className="border-b border-border/30">
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-secondary/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-warning" />
              </div>
              <span className="font-medium text-sm">FAQ</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4 text-sm text-muted-foreground pl-11">
              <div>
                <p className="font-medium text-foreground">How do I post?</p>
                <p>Tap the + button at the bottom right to create a new post.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Can I share photos?</p>
                <p>Yes! You can add images when creating a post. Progress photos are encouraged!</p>
              </div>
              <div>
                <p className="font-medium text-foreground">How do I get expert advice?</p>
                <p>Tag your post with 'Q&A' and our experts will respond within 24-48 hours.</p>
              </div>
              <div>
                <p className="font-medium text-foreground">What if I move to next month?</p>
                <p>You'll automatically get access to the next cohort channel based on your order!</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="guidelines" className="border-none">
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-secondary/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-destructive" />
              </div>
              <span className="font-medium text-sm">Guidelines</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3 text-sm text-muted-foreground pl-11">
              <p>To keep this a safe and supportive space:</p>
              <ul className="space-y-2">
                <li>🚫 <strong>No medical advice:</strong> Consult experts for specific concerns</li>
                <li>💚 <strong>Be kind:</strong> Everyone's journey is different</li>
                <li>🔒 <strong>Respect privacy:</strong> Don't share others' photos without consent</li>
                <li>🚫 <strong>No spam:</strong> Keep posts relevant to hair health</li>
                <li>⚠️ <strong>Report issues:</strong> Flag inappropriate content to moderators</li>
              </ul>
              <p className="text-xs text-muted-foreground/70 mt-3">Violations may result in temporary or permanent removal from the community.</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
