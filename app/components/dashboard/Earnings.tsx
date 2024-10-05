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

interface EarningData {
  period: string;
  amount: number;
  change: number;
}

const earningsData: EarningData[] = [
  { period: 'Today', amount: 1234.56, change: 12.5 },
  { period: 'Yesterday', amount: 987.65, change: -5.2 },
  { period: 'Last Week', amount: 7654.32, change: 8.7 },
  { period: 'Last Month', amount: 32109.87, change: 15.3 },
];

export function EarningsSection() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Earnings</h2>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">View Detailed Report</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {earningsData.map((data) => (
          <Card key={data.period} className="bg-white dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{data.period}</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${data.amount.toFixed(2)}</div>
              <p className="text-xs mt-1 flex items-center">
                {data.change >= 0 ? (
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={data.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {Math.abs(data.change)}%
                </span>
                <span className="ml-1 text-gray-500 dark:text-gray-400">from last period</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <PieChart className="h-5 w-5 mr-2 text-blue-500" />
              Earnings Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Ad Revenue</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2 bg-blue-100" indicatorClassName="bg-blue-500" />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Subscriptions</span>
                  <span>30%</span>
                </div>
                <Progress
                  value={30}
                  className="h-2 bg-green-100"
                  indicatorClassName="bg-green-500"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Affiliate</span>
                  <span>10%</span>
                </div>
                <Progress
                  value={10}
                  className="h-2 bg-yellow-100"
                  indicatorClassName="bg-yellow-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Withdraw Earnings
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Set Payout Method
              </Button>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                View Tax Documents
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
