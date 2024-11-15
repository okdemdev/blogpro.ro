'use client';
import { navLinks } from '@/app/dashboard/layout';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DashboardItems() {
  const pathname = usePathname();
  return (
    <div className="space-y-2">
      {navLinks.map((item) => (
        <Link
          href={item.href}
          key={item.name}
          className={cn(
            'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-primary/10',
            pathname === item.href
              ? 'bg-primary/15 text-primary'
              : 'text-muted-foreground hover:text-primary'
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.name}
        </Link>
      ))}
    </div>
  );
}
