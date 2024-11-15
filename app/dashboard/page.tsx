import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EmptyState } from '../components/dashboard/EmptyState';
import prisma from '../utils/db';
import { requireUser } from '../utils/requireUser';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import DefaultImage from '@/public/default.png';
import { EarningsSection } from '../components/dashboard/Earnings';

async function getData(userId: string) {
  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
    prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
  ]);

  return { sites, articles };
}

export default async function DashboardIndexPage() {
  const user = await requireUser();
  const { articles, sites } = await getData(user.id);

  return (
    <div className="space-y-8">
      <EarningsSection />

      {/* Sites Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Your Sites</h2>
            <p className="text-sm text-muted-foreground">Manage your blog sites</p>
          </div>
          <Button asChild>
            <Link href="/dashboard/sites/new">Create Site</Link>
          </Button>
        </div>

        {sites.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((site) => (
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
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/sites/${site.id}`}>View Articles</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No sites created yet"
            descripiton="Create your first site to start blogging"
            href="/dashboard/sites/new"
            buttonText="Create Site"
          />
        )}
      </section>

      {/* Articles Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Recent Articles</h2>
            <p className="text-sm text-muted-foreground">Your latest blog posts</p>
          </div>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden">
                <Image
                  src={article.image ?? DefaultImage}
                  alt={article.title}
                  className="aspect-video w-full object-cover"
                  width={400}
                  height={225}
                />
                <CardHeader>
                  <CardTitle className="line-clamp-1">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {article.smallDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href={`/dashboard/sites/${article.siteId}/${article.id}`}>
                      Edit Article
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No articles created yet"
            descripiton="Start writing your first blog post"
            href="/dashboard/sites"
            buttonText="Create Article"
          />
        )}
      </section>
    </div>
  );
}
