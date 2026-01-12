import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const Transactions = () => {
  const transactions = [
    { id: 'TXN001', date: '2024-01-09', amount: '$2,500', status: 'Completed', type: 'Sale', customer: 'John Doe' },
    { id: 'TXN002', date: '2024-01-08', amount: '$1,800', status: 'Completed', type: 'Sale', customer: 'Jane Smith' },
    { id: 'TXN003', date: '2024-01-07', amount: '$3,200', status: 'Pending', type: 'Sale', customer: 'Mike Johnson' },
    { id: 'TXN004', date: '2024-01-06', amount: '$950', status: 'Completed', type: 'Refund', customer: 'Sarah Williams' },
    { id: 'TXN005', date: '2024-01-05', amount: '$5,400', status: 'Completed', type: 'Sale', customer: 'Robert Brown' },
    { id: 'TXN006', date: '2024-01-04', amount: '$2,100', status: 'Failed', type: 'Sale', customer: 'Emma Davis' },
    { id: 'TXN007', date: '2024-01-03', amount: '$4,200', status: 'Completed', type: 'Sale', customer: 'James Wilson' },
    { id: 'TXN008', date: '2024-01-02', amount: '$1,550', status: 'Completed', type: 'Sale', customer: 'Lisa Anderson' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/10 text-green-700';
      case 'Pending':
        return 'bg-yellow-500/10 text-yellow-700';
      case 'Failed':
        return 'bg-red-500/10 text-red-700';
      default:
        return 'bg-gray-500/10 text-gray-700';
    }
  };

  const getTotalAmount = () => {
    return transactions
      .filter(t => t.status === 'Completed')
      .reduce((sum, t) => sum + parseInt(t.amount.replace('$', '').replace(',', '')), 0);
  };

  return (
    <AdminLayout title="Transactions">
      <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground mt-2">View and manage all your business transactions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.filter(t => t.status === 'Completed').length}</div>
            <p className="text-xs text-muted-foreground">Successful transactions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.filter(t => t.status === 'Pending').length}</div>
            <p className="text-xs text-muted-foreground">Awaiting completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${getTotalAmount().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Completed transactions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>View all your recent transactions and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.customer}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      </div>
    </AdminLayout>
  );
};

export default Transactions;
