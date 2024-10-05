'use client';

import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function CopyUrlButton() {
  const pathname = usePathname(); // Get current URL path
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const currentUrl = `${window.location.origin}${pathname}`;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="flex items-center gap-x-3">
      <h1 className="text-xl font-medium">Share</h1>
      <Button size="icon" variant="outline" className="flex-end self-end" onClick={copyToClipboard}>
        <Share className="size-4" />
      </Button>
      {copied && <span className="ml-2 text-sm text-green-500">Link Copied!</span>}
    </div>
  );
}
