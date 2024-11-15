import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarSign,
  PieChart,
  TrendingUp,
  CreditCard,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import prisma from '@/app/utils/db';
import { requireUser } from '@/app/utils/requireUser';

interface EarningData {
  period: string;
  amount: number;
  change: number;
}

const earningsData: EarningData[] = [
  { period: 'Today', amount: 0, change: 0 },
  { period: 'Yesterday', amount: 0.0, change: 0 },
  { period: 'Last Week', amount: 0.0, change: 0 },
  { period: 'Last Month', amount: 0.0, change: 0 },
];

async function getData(userId: string) {
  const data = await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      status: true,
      User: {
        select: {
          customerId: true,
        },
      },
    },
  });

  return data;
}

export async function EarningsSection() {
  const user = await requireUser();
  const data = await getData(user.id);

  if (data?.status === 'active') {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Analytics Overview</h2>
            <p className="text-sm text-muted-foreground">
              Track your blog&apos;s performance and earnings
            </p>
          </div>
          <Button className="gap-2" variant="outline">
            <PieChart className="h-4 w-4" />
            View Report
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {earningsData.map((data) => (
            <Card key={data.period} className="bg-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{data.period}</CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${data.amount.toFixed(2)}</div>
                <div className="mt-1 flex items-center text-xs">
                  {data.change >= 0 ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={data.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {Math.abs(data.change)}%
                  </span>
                  <span className="ml-1 text-muted-foreground">from last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-semibold">
                <PieChart className="h-5 w-5 mr-2 text-primary" />
                Revenue Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Ad Revenue</span>
                  <span>82%</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Subscriptions</span>
                  <span>11%</span>
                </div>
                <Progress value={11} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Affiliate</span>
                  <span>7%</span>
                </div>
                <Progress value={7} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-semibold">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full gap-2">
                  <DollarSign className="h-4 w-4" />
                  Withdraw Earnings
                </Button>
                <Button className="w-full gap-2" variant="outline">
                  <CreditCard className="h-4 w-4" />
                  Update Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Overview</h2>
          <p className="text-sm text-muted-foreground">Upgrade to access analytics and earnings</p>
        </div>
      </div>

      <Card className="bg-muted/50 border-dashed">
        <CardContent className="py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Unlock Advanced Analytics</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upgrade to our premium plan to access detailed analytics and earnings tracking
            </p>
            <Button asChild>
              <Link href="/dashboard/pricing">Upgrade Now</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
