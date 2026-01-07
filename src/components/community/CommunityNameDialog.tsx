import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

interface CommunityNameDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => void;
}

export function CommunityNameDialog({ open, onOpenChange, onSubmit }: CommunityNameDialogProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const trimmedName = name.trim();
    
    if (!trimmedName) {
      setError('Please enter a name');
      return;
    }
    
    if (trimmedName.length < 2) {
      setError('Name must be at least 2 characters');
      return;
    }
    
    if (trimmedName.length > 30) {
      setError('Name must be less than 30 characters');
      return;
    }
    
    setError('');
    onSubmit(trimmedName);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-16 h-16 rounded-2xl gradient-traya flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <DialogTitle className="text-center text-xl">Choose Your Community Name</DialogTitle>
          <DialogDescription className="text-center">
            This name will be visible on all your posts, comments, and profile in the community
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="community-name">Display Name</Label>
            <Input
              id="community-name"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
              maxLength={30}
              className="text-base"
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <p className="text-xs text-muted-foreground">
              You can use your real name or a nickname
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handleSubmit}
          className="w-full gradient-traya text-primary-foreground hover:opacity-90"
          size="lg"
          disabled={!name.trim()}
        >
          Continue
        </Button>
      </DialogContent>
    </Dialog>
  );
}
