import CopyUrlButton from '@/app/components/dashboard/CopyButton';
import { RenderArticle } from '@/app/components/dashboard/RenderArticle';
import prisma from '@/app/utils/db';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, Clock, Share } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JSONContent } from 'novel';
import Logo from '@/public/logo.svg';
import { ThemeToggle } from '@/app/components/dashboard/ThemeToggle';
import DefaultImage from '@/public/default.png';

async function getData(slug: string) {
  const data = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    select: {
      articleContent: true,
      title: true,
      smallDescription: true,
      image: true,
      createdAt: true,
      Site: {
        select: {
          name: true,
          imageUrl: true,
        },
      },
    },
  });

  if (!data || !data.Site) {
    return notFound();
  }

  return data;
}

export default async function SlugRoute({ params }: { params: { slug: string; name: string } }) {
  const data = await getData(params.slug);

  return (
    <article className="relative pt-10">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button size="icon" variant="ghost" asChild className="rounded-full">
              <Link href={`/blog/${params.name}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <span className="text-sm font-medium">{data.Site?.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <CopyUrlButton />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 pt-16 pb-10 text-center">
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            {new Intl.DateTimeFormat('en-US', {
              dateStyle: 'long',
            }).format(data.createdAt)}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />5 min read
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">{data.title}</h1>
        <p className="text-xl text-muted-foreground">{data.smallDescription}</p>
      </header>

      {/* Featured Image */}
      <div className="relative aspect-[2/1] max-w-screen-lg mx-auto mb-16 overflow-hidden rounded-lg">
        <Image src={data.image} alt={data.title} fill className="object-cover" priority />
      </div>

      {/* Article Content */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background to-background" />
        <div className="relative max-w-3xl mx-auto px-4">
          <RenderArticle json={data.articleContent as JSONContent} />
        </div>
      </div>
    </article>
  );
}
