import { AdminLayout } from '@/components/layout/AdminLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { useStore } from '@/store/useStore';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { monthlyRevenueData, categorySalesData } from '@/data/mockData';
import { TrendingUp, ShoppingCart, Users, Eye } from 'lucide-react';

const COLORS = ['hsl(42 53% 54%)', 'hsl(42 53% 44%)', 'hsl(42 53% 64%)', 'hsl(42 53% 34%)'];

const trafficData = [
  { name: 'Mon', visitors: 2400 },
  { name: 'Tue', visitors: 1398 },
  { name: 'Wed', visitors: 9800 },
  { name: 'Thu', visitors: 3908 },
  { name: 'Fri', visitors: 4800 },
  { name: 'Sat', visitors: 3800 },
  { name: 'Sun', visitors: 4300 },
];

const conversionData = [
  { name: 'Jan', rate: 2.4 },
  { name: 'Feb', rate: 2.8 },
  { name: 'Mar', rate: 3.1 },
  { name: 'Apr', rate: 2.9 },
  { name: 'May', rate: 3.5 },
  { name: 'Jun', rate: 3.8 },
];

export default function Analytics() {
  const { orders, customers, products } = useStore();

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'Paid')
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <AdminLayout title="Analytics">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Revenue"
            value={`₹${(totalRevenue / 100000).toFixed(1)}L`}
            change="+23.5% vs last month"
            changeType="positive"
            icon={TrendingUp}
          />
          <KPICard
            title="Total Orders"
            value={orders.length}
            change="+12.3% vs last month"
            changeType="positive"
            icon={ShoppingCart}
          />
          <KPICard
            title="Total Customers"
            value={customers.length}
            change="+8.1% vs last month"
            changeType="positive"
            icon={Users}
          />
          <KPICard
            title="Page Views"
            value="45.2K"
            change="+15.4% vs last month"
            changeType="positive"
            icon={Eye}
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="luxury-card p-6">
            <div className="mb-6">
              <h3 className="font-display text-lg font-semibold text-foreground">Revenue Trend</h3>
              <p className="text-sm text-muted-foreground">Monthly revenue over the year</p>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="luxury-card p-6">
            <div className="mb-6">
              <h3 className="font-display text-lg font-semibold text-foreground">Category Distribution</h3>
              <p className="text-sm text-muted-foreground">Sales by product category</p>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySalesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="sales"
                  >
                    {categorySalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value}%`, 'Sales']}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-foreground text-sm">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Website Traffic */}
          <div className="luxury-card p-6">
            <div className="mb-6">
              <h3 className="font-display text-lg font-semibold text-foreground">Website Traffic</h3>
              <p className="text-sm text-muted-foreground">Daily visitors this week</p>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [value.toLocaleString(), 'Visitors']}
                  />
                  <Bar dataKey="visitors" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="luxury-card p-6">
            <div className="mb-6">
              <h3 className="font-display text-lg font-semibold text-foreground">Conversion Rate</h3>
              <p className="text-sm text-muted-foreground">Monthly conversion rate trend</p>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => [`${value}%`, 'Conversion Rate']}
                  />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="hsl(142 76% 36%)"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(142 76% 36%)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="luxury-card p-6">
          <div className="mb-6">
            <h3 className="font-display text-lg font-semibold text-foreground">Top Performing Products</h3>
            <p className="text-sm text-muted-foreground">Best selling products this month</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.slice(0, 6).map((product, index) => (
              <div key={product.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-display font-bold text-primary">#{index + 1}</div>
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{product.name}</p>
                  <p className="text-sm text-primary font-semibold">
                    ₹{product.finalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
