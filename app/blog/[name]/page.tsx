import prisma from '@/app/utils/db';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Logo from '@/public/logo.svg';
import { ThemeToggle } from '@/app/components/dashboard/ThemeToggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DefaultImage from '@/public/default.png';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, Clock } from 'lucide-react';

async function getData(subDir: string) {
  const data = await prisma.site.findUnique({
    where: {
      subdirectory: subDir,
    },
    select: {
      name: true,
      description: true,
      imageUrl: true,
      posts: {
        select: {
          smallDescription: true,
          title: true,
          image: true,
          createdAt: true,
          slug: true,
          id: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function BlogIndexPage({ params }: { params: { name: string } }) {
  const data = await getData(params.name);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 to-background z-10" />
        <Image
          src={data.imageUrl ?? DefaultImage}
          alt={data.name}
          width={1920}
          height={400}
          className="h-[300px] w-full object-cover"
        />
        <nav className="absolute top-0 w-full z-20 p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <Image src={Logo} alt="Logo" width={40} height={40} className="dark:invert" />
              <h1 className="text-3xl font-bold">{data.name}</h1>
            </div>
            <ThemeToggle />
          </div>
        </nav>
        <div className="absolute bottom-0 w-full z-20 p-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground">{data.description}</p>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.posts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-all overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image ?? DefaultImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {new Intl.DateTimeFormat('en-US', {
                      dateStyle: 'medium',
                    }).format(post.createdAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />5 min read
                  </div>
                </div>
                <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                  <Link href={`/blog/${params.name}/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">{post.smallDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                >
                  <Link href={`/blog/${params.name}/${post.slug}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
