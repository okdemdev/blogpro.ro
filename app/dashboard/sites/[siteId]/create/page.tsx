'use client';
import { CreatePostAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useActionState } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { PostSchema } from '@/app/utils/zodSchemas';
import { SubmitButton } from '@/app/components/dashboard/SubmitButtons';
import { useState } from 'react';
import { JSONContent } from 'novel';
import { Atom } from 'lucide-react';
import { toast } from 'sonner';
import slugify from 'react-slugify';
import { UploadDropzone } from '@/app/utils/UploadThingComponents';
import Image from 'next/image';
import TailwindEditor from '@/app/components/dashboard/EditorWrapper';

export default function ArticleCreationRoute({ params }: { params: { siteId: string } }) {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  const [value, setValue] = useState<JSONContent | undefined>(undefined);
  const [lastResult, action] = useActionState(CreatePostAction, undefined);
  const [slug, setSlugValue] = useState<undefined | string>(undefined);
  const [title, setTitle] = useState<undefined | string>(undefined);

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
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Create New Article</CardTitle>
        <CardDescription>Write and publish your new blog post</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" id={form.id} onSubmit={form.onSubmit} action={action}>
          <input type="hidden" name="siteId" value={params.siteId} />

          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              name={fields.title.name}
              key={fields.title.key}
              defaultValue={fields.title.initialValue}
              placeholder="My Awesome Article"
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
                name={fields.slug.name}
                key={fields.slug.key}
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
            <Label>Description</Label>
            <Textarea
              name={fields.smallDescription.name}
              key={fields.smallDescription.key}
              defaultValue={fields.smallDescription.initialValue}
              placeholder="A brief description of your article..."
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
            />
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Cover"
                width={200}
                height={200}
                className="rounded-lg object-cover aspect-video w-full max-w-xl"
              />
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
            {fields.coverImage.errors && (
              <p className="text-sm text-red-500">{fields.coverImage.errors}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <input
              type="hidden"
              key={fields.articleContent.key}
              name={fields.articleContent.name}
              defaultValue={fields.articleContent.initialValue}
              value={JSON.stringify(value)}
            />
            <TailwindEditor onChange={setValue} initialValue={value} />
            {fields.articleContent.errors && (
              <p className="text-sm text-red-500">{fields.articleContent.errors}</p>
            )}
          </div>

          <SubmitButton text="Create Article" />
        </form>
      </CardContent>
    </Card>
  );
}
