import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, XIcon } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccess() {
  return (
    <div className="w-full flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center ">
            <Check className="size-12 rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>
          <div className="mt-3 text-center sm:mt-5 w-full">
            <h2 className="text-xl font-semibold">Payment was Successfull</h2>
            <p className="text-sm mt-2 text-muted-foreground tracking-tight">
              Congrats to your subscritpion. You can now create unlimited sites and articles!
            </p>
            <Button asChild className="w-full mt-5">
              <Link href={'/dashboard'}>Go back to dashboard</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}