'use client';

import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function CopyUrlButton() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const currentUrl = `${window.location.origin}${pathname}`;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center gap-3">
      <h1 className="text-xl font-medium">Share</h1>
      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" className="rounded-full" onClick={copyToClipboard}>
          <Share className="h-4 w-4" />
        </Button>
        {copied && (
          <span className="text-sm text-primary animate-in fade-in slide-in-from-right-5">
            Copied!
          </span>
        )}
      </div>
    </div>
  );
}
