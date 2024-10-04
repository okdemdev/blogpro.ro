import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckIcon } from 'lucide-react';
import { SubmitButton } from '../dashboard/SubmitButtons';
import Link from 'next/link';
import { CreateSubscripiton } from '@/app/actions';

interface iAppProps {
  id: number;
  cardTitle: string;
  cardDescription: string;
  priceTitle: string;
  benefits: string[];
}

export const PricingPlans: iAppProps[] = [
  {
    id: 0,
    cardTitle: 'Freelancer',
    cardDescription: 'Perfect for those just starting their blogging journey.',
    benefits: ['1 Site', 'Up to 1000 Visitors', 'Up to 10 Posts'],
    priceTitle: 'Free',
  },
  {
    id: 1,
    cardTitle: 'Startup',
    cardDescription: 'Ideal for growing blogs and businesses.',
    benefits: ['Unlimited Sites', 'Unlimited Visitors', 'Unlimited Posts'],
    priceTitle: '$2.99',
  },
];

export function PricingTable() {
  return (
    <>
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-semibold text-primary">Pricing</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          Pricing Plans for everyone and every budget!
        </h1>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center leading-tight text-muted-foreground">
        Choose a plan that fits your needs. Whether you're just starting out or scaling up, we've
        got you covered with flexible options to support your blogging journey.
      </p>
      <div className="grid grid-cols-1 gap-8 mt-16 lg:grid-cols-2">
        {PricingPlans.map((item) => (
          <Card key={item.id} className={item.id === 1 ? 'border-primary' : ''}>
            <CardHeader>
              <CardTitle>
                {item.id === 1 ? (
                  <div className="flex items-center justify-between">
                    <h3 className="text-primary">Startup</h3>
                    <p className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold leading-5 text-primary">
                      Most Popular
                    </p>
                  </div>
                ) : (
                  <>{item.cardTitle}</>
                )}
              </CardTitle>
              <CardDescription>{item.cardDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mt-6 text-4xl font-bold tracking-tight">{item.priceTitle}</p>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {item.benefits.map((benefit, index) => (
                  <li key={index} className="flex gap-x-3">
                    <CheckIcon className="text-primary size-5" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {item.id === 1 ? (
                <form className="w-full" action={CreateSubscripiton}>
                  <SubmitButton text="Buy Plan" className="mt-5 w-full" />
                </form>
              ) : (
                <Button variant="outline" className="mt-5 w-full" asChild>
                  <Link href={'/dashboard'}>Try for free</Link>
                </Button>
              )}
            </CardFooter>{' '}
          </Card>
        ))}
      </div>
    </>
  );
}
