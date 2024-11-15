'use client';
import { navLinks } from '@/app/dashboard/layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function DashboardItems() {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      {navLinks.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        // Desktop version with tooltip
        const DesktopLink = (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'hidden md:flex h-10 w-10 items-center justify-center rounded-lg transition-all hover:bg-primary/10',
                    isActive
                      ? 'bg-primary/15 text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  <Icon className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );

        // Mobile version with text
        const MobileLink = (
          <Link
            href={item.href}
            className={cn(
              'md:hidden flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-primary/10',
              isActive ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-primary'
            )}
          >
            <Icon className="h-5 w-5" />
            {item.name}
          </Link>
        );

        return (
          <div key={item.name}>
            {DesktopLink}
            {MobileLink}
          </div>
        );
      })}
    </div>
  );
}
