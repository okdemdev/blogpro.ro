import prisma from '@/app/utils/db';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import DefaultImage from '@/public/default.png';
import { EmptyState } from '@/app/components/dashboard/EmptyState';

async function getData(userId: string) {
  const data = await prisma.site.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return data;
}

export default async function SitesRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/api/auth/login');
  }

  const data = await getData(user.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Your Sites</h2>
          <p className="text-sm text-muted-foreground">Manage all your blog sites</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/sites/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Create Site
          </Link>
        </Button>
      </div>

      {data.length === 0 ? (
        <EmptyState
          title="No sites created yet"
          descripiton="Create your first site to start blogging!"
          buttonText="Create Site"
          href="/dashboard/sites/new"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((site) => (
            <Card key={site.id} className="overflow-hidden">
              <Image
                src={site.imageUrl ?? DefaultImage}
                alt={site.name}
                className="aspect-video w-full object-cover"
                width={400}
                height={225}
              />
              <CardHeader>
                <CardTitle className="line-clamp-1">{site.name}</CardTitle>
                <CardDescription className="line-clamp-2">{site.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href={`/dashboard/sites/${site.id}/settings`}>Edit</Link>
                  </Button>
                  <Button asChild className="flex-1">
                    <Link href={`/dashboard/sites/${site.id}`}>View Articles</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
