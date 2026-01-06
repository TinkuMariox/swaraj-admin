import { AdminLayout } from '@/components/layout/AdminLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { RecentOrdersTable } from '@/components/dashboard/RecentOrdersTable';
import { useStore } from '@/store/useStore';
import { DollarSign, ShoppingCart, Package, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  const { products, orders } = useStore();

  const totalSales = orders
    .filter((o) => o.paymentStatus === 'Paid')
    .reduce((sum, o) => sum + o.amount, 0);

  const totalOrders = orders.length;
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock <= 3).length;

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Total Sales"
            value={`₹${(totalSales / 100000).toFixed(1)}L`}
            change="+12.5% from last month"
            changeType="positive"
            icon={DollarSign}
            className="animate-fade-in"
          />
          <KPICard
            title="Total Orders"
            value={totalOrders}
            change="+8.2% from last month"
            changeType="positive"
            icon={ShoppingCart}
            className="animate-fade-in [animation-delay:100ms]"
          />
          <KPICard
            title="Total Products"
            value={totalProducts}
            change="2 new this week"
            changeType="neutral"
            icon={Package}
            className="animate-fade-in [animation-delay:200ms]"
          />
          <KPICard
            title="Low Stock Items"
            value={lowStockProducts}
            change="Needs attention"
            changeType="negative"
            icon={AlertTriangle}
            className="animate-fade-in [animation-delay:300ms]"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-fade-in [animation-delay:400ms]">
            <RevenueChart />
          </div>
          <div className="animate-fade-in [animation-delay:500ms]">
            <CategoryChart />
          </div>
        </div>

        {/* Recent Orders */}
        <div className="animate-fade-in [animation-delay:600ms]">
          <RecentOrdersTable />
        </div>
      </div>
    </AdminLayout>
  );
}
