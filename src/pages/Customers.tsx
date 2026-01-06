import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useStore } from '@/store/useStore';
import { Customer } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, MoreVertical, User, Mail, Phone, Calendar, ShoppingBag, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Customers() {
  const { customers, updateCustomerStatus } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusToggle = (customer: Customer) => {
    const newStatus = customer.status === 'Active' ? 'Blocked' : 'Active';
    updateCustomerStatus(customer.id, newStatus);
    toast.success(`Customer ${newStatus === 'Active' ? 'activated' : 'blocked'}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <AdminLayout title="Customers">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="luxury-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-display font-bold text-foreground">{customers.length}</p>
              </div>
            </div>
          </div>
          <div className="luxury-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <User className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-display font-bold text-foreground">
                  {customers.filter((c) => c.status === 'Active').length}
                </p>
              </div>
            </div>
          </div>
          <div className="luxury-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <User className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blocked</p>
                <p className="text-2xl font-display font-bold text-foreground">
                  {customers.filter((c) => c.status === 'Blocked').length}
                </p>
              </div>
            </div>
          </div>
          <div className="luxury-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-display font-bold text-foreground">
                  ₹{(customers.reduce((sum, c) => sum + c.totalSpend, 0) / 100000).toFixed(1)}L
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Customers Table */}
        <div className="luxury-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Customer</TableHead>
                <TableHead className="text-muted-foreground">Contact</TableHead>
                <TableHead className="text-muted-foreground">Total Orders</TableHead>
                <TableHead className="text-muted-foreground">Total Spend</TableHead>
                <TableHead className="text-muted-foreground">Joined</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="border-border hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {getInitials(customer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {customer.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        {customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-foreground">{customer.totalOrders}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-primary">
                    ₹{customer.totalSpend.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {customer.joinedAt}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        'border',
                        customer.status === 'Active'
                          ? 'bg-success/10 text-success border-success/20'
                          : 'bg-destructive/10 text-destructive border-destructive/20'
                      )}
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-muted">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-muted">
                          View Orders
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleStatusToggle(customer)}
                          className={cn(
                            'cursor-pointer',
                            customer.status === 'Active'
                              ? 'text-destructive hover:bg-destructive/10 hover:text-destructive'
                              : 'text-success hover:bg-success/10 hover:text-success'
                          )}
                        >
                          {customer.status === 'Active' ? 'Block Customer' : 'Activate Customer'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
