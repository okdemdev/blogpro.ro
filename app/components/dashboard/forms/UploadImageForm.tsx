'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitButton } from '../SubmitButtons';
import { toast } from 'sonner';
import { UpdateImage } from '@/app/actions';
import { UploadDropzone } from '@/app/utils/UploadThingComponents';

interface iAppProps {
  siteId: string;
}

export function UploadImageForm({ siteId }: iAppProps) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Image</CardTitle>
        <CardDescription>
          Upload or update your site's featured image. This image will be displayed on your site's
          card and header.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {imageUrl ? (
          <div className="overflow-hidden rounded-lg border border-border/50">
            <Image
              src={imageUrl}
              alt="Site Image"
              width={400}
              height={200}
              className="aspect-video w-full object-cover"
            />
          </div>
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              toast.success('Image uploaded successfully');
            }}
            onUploadError={() => {
              toast.error('Upload failed');
            }}
          />
        )}
      </CardContent>
      <CardFooter>
        <form action={UpdateImage} className="w-full">
          <input type="hidden" name="siteId" value={siteId} />
          <input type="hidden" name="imageUrl" value={imageUrl} />
          <SubmitButton text="Save Changes" className="w-full" />
        </form>
      </CardFooter>
    </Card>
  );
}
