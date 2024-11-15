'use client';
import { CreateSiteAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useActionState } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { siteSchema } from '@/app/utils/zodSchemas';
import { SubmitButton } from '@/app/components/dashboard/SubmitButtons';

export default function NewSiteRoute() {
  const [lastResult, action] = useActionState(CreateSiteAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: siteSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Create New Site</CardTitle>
          <CardDescription>
            Set up a new blog site. Fill in the details below to get started.
          </CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input
                name={fields.name.name}
                key={fields.name.key}
                defaultValue={fields.name.initialValue}
                placeholder="My Awesome Blog"
                className="bg-background/50"
              />
              {fields.name.errors && <p className="text-sm text-red-500">{fields.name.errors}</p>}
            </div>

            <div className="space-y-2">
              <Label>Subdirectory</Label>
              <Input
                name={fields.subdirectory.name}
                key={fields.subdirectory.key}
                defaultValue={fields.subdirectory.initialValue}
                placeholder="my-blog"
                className="bg-background/50"
              />
              {fields.subdirectory.errors && (
                <p className="text-sm text-red-500">{fields.subdirectory.errors}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={fields.description.initialValue}
                placeholder="A brief description of your blog..."
                className="h-32 bg-background/50"
              />
              {fields.description.errors && (
                <p className="text-sm text-red-500">{fields.description.errors}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton text="Create Site" className="w-full" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
