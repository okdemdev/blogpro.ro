'use client';

import { UploadDropzone } from '@/app/utils/UploadThingComponents';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Atom } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import TailwindEditor from '../EditorWrapper';
import { SubmitButton } from '../SubmitButtons';
import { useActionState, useState } from 'react';
import { JSONContent } from 'novel';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { PostSchema } from '@/app/utils/zodSchemas';
import { EditPostAction } from '@/app/actions';
import slugify from 'react-slugify';

interface iAppProps {
  data: {
    title: string;
    slug: string;
    smallDescription: string;
    articleContent: any;
    id: string;
    image: string;
  };
  siteId: string;
}

export function EditArticleForm({ data, siteId }: iAppProps) {
  const [slug, setSlugValue] = useState<undefined | string>(data.slug);
  const [title, setTitle] = useState<undefined | string>(data.title);
  const [imageUrl, setImageUrl] = useState<undefined | string>(data.image);
  const [value, setValue] = useState<JSONContent | undefined>(data.articleContent);
  const [lastResult, action] = useActionState(EditPostAction, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: PostSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  function handleSlugGeneration() {
    const titleInput = title;
    if (titleInput?.length === 0 || titleInput === undefined) {
      return toast.error('Please create a title first');
    }
    setSlugValue(slugify(titleInput));
    return toast.success('Slug has been created');
  }

  return (
    <Card className="mt-5 border-border/50">
      <CardHeader>
        <CardTitle className="text-2xl">Edit Article</CardTitle>
        <CardDescription>Make changes to your article here</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" id={form.id} onSubmit={form.onSubmit} action={action}>
          <input type="hidden" name="articleId" value={data.id} />
          <input type="hidden" name="siteId" value={siteId} />

          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              key={fields.title.key}
              name={fields.title.name}
              defaultValue={fields.title.initialValue}
              placeholder="My awesome article"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="bg-background/50"
            />
            {fields.title.errors && <p className="text-sm text-red-500">{fields.title.errors}</p>}
          </div>

          <div className="space-y-2">
            <Label>Slug</Label>
            <div className="flex gap-2">
              <Input
                key={fields.slug.key}
                name={fields.slug.name}
                defaultValue={fields.slug.initialValue}
                placeholder="my-awesome-article"
                onChange={(e) => setSlugValue(e.target.value)}
                value={slug}
                className="bg-background/50"
              />
              <Button
                onClick={handleSlugGeneration}
                type="button"
                variant="outline"
                className="gap-2"
              >
                <Atom className="h-4 w-4" />
                Generate
              </Button>
            </div>
            {fields.slug.errors && <p className="text-sm text-red-500">{fields.slug.errors}</p>}
          </div>

          <div className="space-y-2">
            <Label>Small Description</Label>
            <Textarea
              key={fields.smallDescription.key}
              name={fields.smallDescription.name}
              defaultValue={data.smallDescription}
              placeholder="Small description for your blog article..."
              className="h-32 bg-background/50"
            />
            {fields.smallDescription.errors && (
              <p className="text-sm text-red-500">{fields.smallDescription.errors}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Cover Image</Label>
            <input
              type="hidden"
              key={fields.coverImage.key}
              name={fields.coverImage.name}
              defaultValue={fields.coverImage.initialValue}
              value={imageUrl}
              className="bg-background/50"
            />
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Uploaded Image"
                className="object-cover w-[200px] h-[200px] rounded-lg bg-background/50"
                width={200}
                height={200}
              />
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setImageUrl(res[0].url);
                  toast.success('Image has been uploaded');
                }}
                endpoint="imageUploader"
                onUploadError={() => {
                  toast.error('Something went wrong...');
                }}
              />
            )}
            {fields.coverImage.errors && (
              <p className="text-sm text-red-500">{fields.coverImage.errors}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Article Content</Label>
            <input
              type="hidden"
              key={fields.articleContent.key}
              name={fields.articleContent.name}
              defaultValue={fields.articleContent.initialValue}
              value={JSON.stringify(value)}
              className="bg-background/50"
            />
            <TailwindEditor onChange={setValue} initialValue={value} />
            {fields.articleContent.errors && (
              <p className="text-sm text-red-500">{fields.articleContent.errors}</p>
            )}
          </div>

          <SubmitButton text="Save Changes" />
        </form>
      </CardContent>
    </Card>
  );
}
