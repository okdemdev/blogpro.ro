import { EditArticleForm } from '@/app/components/dashboard/forms/EditArticleForm';
import prisma from '@/app/utils/db';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getData(postId: string) {
  const data = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      image: true,
      title: true,
      smallDescription: true,
      slug: true,
      articleContent: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditRoute({
  params,
}: {
  params: { articleId: string; siteId: string };
}) {
  const data = await getData(params.articleId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Edit Article</h2>
          <p className="text-sm text-muted-foreground">Make changes to your article</p>
        </div>
      </div>

      <EditArticleForm data={data} siteId={params.siteId} />
    </div>
  );
}
