import { Button } from '@/components/ui/button';
import { FileIcon, PlusCircle } from 'lucide-react';
import Link from 'next/link';

interface iAppProps {
  title: string;
  descripiton: string;
  buttonText: string;
  href: string;
}

export function EmptyState({ buttonText, descripiton, href, title }: iAppProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-border/50 bg-background/50 p-8 text-center animate-in fade-in-50">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <FileIcon className="h-10 w-10 text-primary" />
      </div>

      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mb-8 mt-2 max-w-sm text-center text-sm leading-tight text-muted-foreground">
        {descripiton}
      </p>

      <Button asChild className="gap-2">
        <Link href={href}>
          <PlusCircle className="h-4 w-4" />
          {buttonText}
        </Link>
      </Button>
    </div>
  );
}
