import { Button } from '@/components/ui/button';
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Hero } from './components/frontend/Hero';
import { Logos } from './components/frontend/Logos';
import { Features } from './components/frontend/Features';
import { redirect } from 'next/navigation';
import { PricingTable } from './components/shared/pricing';

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();

  if (session?.id) {
    return redirect('/dashboard');
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background to-secondary">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <Logos />
        <Features />
        <PricingTable />
      </div>
    </div>
  );
}
