'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

interface iAppProps {
  text: string;
  className?: string;
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
}

export function SubmitButton({ text, className, variant }: iAppProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className={cn('w-fit gap-2', className)}
      variant={variant}
      type="submit"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? 'Please Wait' : text}
    </Button>
  );
}
