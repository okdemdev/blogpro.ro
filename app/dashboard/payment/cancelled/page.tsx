import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { XIcon } from 'lucide-react';
import Link from 'next/link';

export default function CancelledRoute() {
  return (
    <div className="flex min-h-[600px] items-center justify-center">
      <Card className="max-w-md w-full p-8">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <XIcon className="h-8 w-8 text-red-500" />
          </div>

          <h2 className="mt-6 text-2xl font-semibold">Payment Cancelled</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            No worries, you won't be charged. Feel free to try again when you're ready.
          </p>

          <Button asChild className="mt-8 w-full">
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
