import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import Logo from '@/public/logo.svg';
import { DashboardItems } from '../components/dashboard/DashboardItems';
import { CircleUserIcon, DollarSign, Globe, Home } from 'lucide-react';
import { ThemeToggle } from '../components/dashboard/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

export const navLinks = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    name: 'Sites',
    href: '/dashboard/sites',
    icon: Globe,
  },
  {
    name: 'Pricing',
    href: '/dashboard/pricing',
    icon: DollarSign,
  },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden w-72 glass-effect border-r border-border/50 md:block">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center px-6">
              <Link href="/" className="flex items-center gap-2">
                <Image src={Logo} alt="Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">
                  Blog<span className="text-primary">Pro</span>
                </span>
              </Link>
            </div>

            <nav className="flex-1 space-y-1 px-3 py-6">
              <DashboardItems />
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <header className="glass-effect sticky top-0 z-50 h-16 border-b border-border/50">
            <div className="flex h-full items-center justify-between px-6">
              <h1 className="text-xl font-semibold">Dashboard</h1>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <CircleUserIcon className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <LogoutLink>Log out</LogoutLink>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="container mx-auto p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </section>
  );
}
