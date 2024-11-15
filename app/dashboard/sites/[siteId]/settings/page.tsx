import { DeleteSite } from '@/app/actions';
import { UploadImageForm } from '@/app/components/dashboard/forms/UploadImageForm';
import { SubmitButton } from '@/app/components/dashboard/SubmitButtons';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function SettingsSiteRoute({ params }: { params: { siteId: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Site Settings</h2>
          <p className="text-sm text-muted-foreground">Manage your site preferences</p>
        </div>
      </div>

      <div className="grid gap-6">
        <UploadImageForm siteId={params.siteId} />

        <Card className="border-red-200 bg-red-50 dark:bg-red-950/10">
          <CardHeader>
            <CardTitle className="text-red-500">Danger Zone</CardTitle>
            <CardDescription className="text-red-700/80 dark:text-red-300/80">
              This action will permanently delete your site and all articles associated with it.
              This action cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <form action={DeleteSite}>
              <input type="hidden" name="siteId" value={params.siteId} />
              <SubmitButton text="Delete Site" variant="destructive" />
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
