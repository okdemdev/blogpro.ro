import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccess() {
  return (
    <div className="flex min-h-[600px] items-center justify-center">
      <Card className="max-w-md w-full p-8">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <Check className="h-8 w-8 text-green-500" />
          </div>

          <h2 className="mt-6 text-2xl font-semibold">Payment Successful</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Congratulations! Your subscription is now active. You can create unlimited sites and
            articles.
          </p>

          <Button asChild className="mt-8 w-full">
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
