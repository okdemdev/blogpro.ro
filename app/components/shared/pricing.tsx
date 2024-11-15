import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckIcon, Sparkles } from 'lucide-react';
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
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center rounded-full bg-primary/10 px-6 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
            Pricing
          </p>
          <h2 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl">
            Simple,{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              transparent
            </span>{' '}
            pricing
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Choose a plan that fits your needs. Whether you're just starting out or scaling up,
            we've got you covered.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
          {PricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`flex flex-col justify-between ${
                plan.id === 1
                  ? 'relative border-primary bg-primary/5 before:absolute before:inset-0 before:scale-x-[1.015] before:scale-y-[1.015] before:rounded-xl before:bg-primary/20 before:blur-xl'
                  : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold">{plan.cardTitle}</CardTitle>
                  {plan.id === 1 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-1 text-xs font-semibold text-primary">
                      <Sparkles className="h-3 w-3" /> Popular
                    </span>
                  )}
                </div>
                <CardDescription className="text-sm">{plan.cardDescription}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.priceTitle}</span>
                  {plan.id === 1 && <span className="text-muted-foreground">/month</span>}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                {plan.id === 1 ? (
                  <form className="w-full" action={CreateSubscripiton}>
                    <SubmitButton text="Get Started" className="w-full" />
                  </form>
                ) : (
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard">Try for free</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
