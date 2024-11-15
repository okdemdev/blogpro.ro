import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/logo.svg';
import { ThemeToggle } from '../dashboard/ThemeToggle';
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { Button } from '@/components/ui/button';
import HeroImage from '@/public/hero.png';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-background to-secondary">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute h-full w-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 backdrop-blur-3xl" />
      </div>

      <nav className="relative mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src={Logo} className="h-10 w-10" alt="Logo" />
            <h4 className="text-3xl font-bold">
              Blog<span className="text-primary">Pro</span>
            </h4>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LoginLink>
              <Button variant="ghost">Sign in</Button>
            </LoginLink>
            <RegisterLink>
              <Button>Sign up</Button>
            </RegisterLink>
          </div>
        </div>
      </nav>

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="text-center">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-6 py-2 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
            Ultimate Blogging SaaS for Startups
          </span>

          <h1 className="mt-8 text-5xl font-bold tracking-tight sm:text-7xl">
            Setup your Blog{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              in Minutes!
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Setting up your blog is hard and time consuming. We make it easy for you to create a
            blog in minutes with our intuitive platform.
          </p>

          <div className="mt-10 flex items-center justify-center gap-6">
            <LoginLink>
              <Button variant="outline" size="lg">
                Sign in
              </Button>
            </LoginLink>
            <RegisterLink>
              <Button size="lg">Try for free</Button>
            </RegisterLink>
          </div>
        </div>
      </div>
    </div>
  );
}
