import { EmptyState } from '@/app/components/dashboard/EmptyState';
import prisma from '@/app/utils/db';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Book, MoreHorizontalIcon, PlusCircle, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function getData(userId: string, siteId: string) {
  const data = await prisma.site.findUnique({
    where: {
      id: siteId,
      userId: userId,
    },
    select: {
      subdirectory: true,
      posts: {
        select: {
          image: true,
          title: true,
          createdAt: true,
          id: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });
  return data;
}

export default async function SiteIdRoute({ params }: { params: { siteId: string } }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/api/auth/login');
  }

  const data = await getData(user.id, params.siteId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Site Articles</h2>
          <p className="text-sm text-muted-foreground">Manage your blog articles</p>
        </div>

        <div className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link href={`/blog/${data?.subdirectory}`}>
              <Book className="h-4 w-4 mr-2" />
              View Blog
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/dashboard/sites/${params.siteId}/settings`}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/dashboard/sites/${params.siteId}/create`}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Article
            </Link>
          </Button>
        </div>
      </div>

      {!data?.posts.length ? (
        <EmptyState
          title="No articles created yet"
          descripiton="Create your first article to get started!"
          buttonText="Create Article"
          href={`/dashboard/sites/${params.siteId}/create`}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Articles</CardTitle>
            <CardDescription>A list of all your articles for this site.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <Image
                          src={post.image}
                          width={64}
                          height={64}
                          alt={post.title}
                          className="rounded-lg object-cover"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Published
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat('en-US', {
                          dateStyle: 'medium',
                        }).format(post.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                              <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/sites/${params.siteId}/${post.id}`}>
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/sites/${params.siteId}/${post.id}/delete`}
                                className="text-red-500"
                              >
                                Delete
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {data.posts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="flex gap-4 p-4">
                    <Image
                      src={post.image}
                      width={80}
                      height={80}
                      alt={post.title}
                      className="rounded-lg object-cover h-20 w-20"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium leading-none">{post.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Intl.DateTimeFormat('en-US', {
                          dateStyle: 'medium',
                        }).format(post.createdAt)}
                      </p>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500">
                        Published
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/sites/${params.siteId}/${post.id}`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/dashboard/sites/${params.siteId}/${post.id}/delete`}
                            className="text-red-500"
                          >
                            Delete
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
