import { useStore } from '@/store/useStore';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export function RecentOrdersTable() {
  const { orders } = useStore();
  const recentOrders = orders.slice(0, 5);

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-success/10 text-success border-success/20';
      case 'Pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Failed':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-success/10 text-success border-success/20';
      case 'Shipped':
        return 'bg-info/10 text-info border-info/20';
      case 'Processing':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Cancelled':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="luxury-card p-6">
      <div className="mb-6">
        <h3 className="font-display text-lg font-semibold text-foreground">Recent Orders</h3>
        <p className="text-sm text-muted-foreground">Latest orders from your store</p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Order ID</TableHead>
              <TableHead className="text-muted-foreground">Customer</TableHead>
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-muted-foreground">Payment</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id} className="border-border hover:bg-muted/50 transition-colors">
                <TableCell className="font-mono text-sm text-primary">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-foreground">
                  ₹{order.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('border', getPaymentStatusColor(order.paymentStatus))}>
                    {order.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('border', getOrderStatusColor(order.orderStatus))}>
                    {order.orderStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
