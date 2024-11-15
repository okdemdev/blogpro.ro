import { DeletePost } from '@/app/actions';
import { SubmitButton } from '@/app/components/dashboard/SubmitButtons';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function DeleteForm({ params }: { params: { siteId: string; articleId: string } }) {
  return (
    <div className="flex min-h-[600px] items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-red-500">Delete Article</CardTitle>
          <CardDescription className="text-muted-foreground">
            This action cannot be undone. This will permanently delete this article and remove all
            data from our servers.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/sites/${params.siteId}`}>Cancel</Link>
          </Button>
          <form action={DeletePost}>
            <input type="hidden" name="articleId" value={params.articleId} />
            <input type="hidden" name="siteId" value={params.siteId} />
            <SubmitButton variant="destructive" text="Delete Article" />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
