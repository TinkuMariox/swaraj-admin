import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useStore } from '@/store/useStore';
import { Discount } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Percent, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const defaultDiscount: Partial<Discount> = {
  code: '',
  type: 'percentage',
  value: 0,
  minOrderValue: 0,
  expiryDate: '',
  enabled: true,
};

export default function Discounts() {
  const { discounts, addDiscount, updateDiscount, deleteDiscount } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
  const [formData, setFormData] = useState<Partial<Discount>>(defaultDiscount);

  const filteredDiscounts = discounts.filter((d) =>
    d.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (discount?: Discount) => {
    if (discount) {
      setSelectedDiscount(discount);
      setFormData(discount);
    } else {
      setSelectedDiscount(null);
      setFormData(defaultDiscount);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDiscount(null);
    setFormData(defaultDiscount);
  };

  const handleSubmit = () => {
    const discountData: Discount = {
      id: selectedDiscount?.id || `DIS${String(Date.now()).slice(-6)}`,
      code: formData.code?.toUpperCase() || '',
      type: formData.type || 'percentage',
      value: formData.value || 0,
      minOrderValue: formData.minOrderValue || 0,
      expiryDate: formData.expiryDate || '',
      enabled: formData.enabled ?? true,
      usageCount: selectedDiscount?.usageCount || 0,
    };

    if (selectedDiscount) {
      updateDiscount(selectedDiscount.id, discountData);
      toast.success('Discount updated successfully');
    } else {
      addDiscount(discountData);
      toast.success('Discount created successfully');
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    if (selectedDiscount) {
      deleteDiscount(selectedDiscount.id);
      toast.success('Discount deleted successfully');
    }
    setIsDeleteModalOpen(false);
    setSelectedDiscount(null);
  };

  const handleToggleDiscount = (discount: Discount) => {
    updateDiscount(discount.id, { enabled: !discount.enabled });
    toast.success(`Discount ${!discount.enabled ? 'enabled' : 'disabled'}`);
  };

  const openDeleteModal = (discount: Discount) => {
    setSelectedDiscount(discount);
    setIsDeleteModalOpen(true);
  };

  return (
    <AdminLayout title="Discounts">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search discount codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>
          <Button onClick={() => handleOpenModal()} className="luxury-gradient text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Create Discount
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="luxury-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Tag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Coupons</p>
                <p className="text-2xl font-display font-bold text-foreground">{discounts.length}</p>
              </div>
            </div>
          </div>
          <div className="luxury-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Tag className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-display font-bold text-foreground">
                  {discounts.filter((d) => d.enabled).length}
                </p>
              </div>
            </div>
          </div>
          <div className="luxury-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Percent className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Usage</p>
                <p className="text-2xl font-display font-bold text-foreground">
                  {discounts.reduce((sum, d) => sum + d.usageCount, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Discounts Table */}
        <div className="luxury-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Code</TableHead>
                <TableHead className="text-muted-foreground">Type</TableHead>
                <TableHead className="text-muted-foreground">Value</TableHead>
                <TableHead className="text-muted-foreground">Min Order</TableHead>
                <TableHead className="text-muted-foreground">Expiry</TableHead>
                <TableHead className="text-muted-foreground">Usage</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDiscounts.map((discount) => (
                <TableRow key={discount.id} className="border-border hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-primary border-primary/30 bg-primary/5">
                      {discount.code}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground capitalize">{discount.type}</TableCell>
                  <TableCell className="font-semibold text-foreground">
                    {discount.type === 'percentage' ? `${discount.value}%` : `₹${discount.value.toLocaleString()}`}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    ₹{discount.minOrderValue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{discount.expiryDate}</TableCell>
                  <TableCell className="text-muted-foreground">{discount.usageCount} times</TableCell>
                  <TableCell>
                    <Switch
                      checked={discount.enabled}
                      onCheckedChange={() => handleToggleDiscount(discount)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenModal(discount)}
                        className="hover:bg-primary/10 hover:text-primary"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteModal(discount)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Add/Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="bg-card border-border max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                {selectedDiscount ? 'Edit Discount' : 'Create Discount'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="code">Coupon Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="mt-1.5 bg-muted/50 border-border/50 font-mono uppercase"
                  placeholder="WELCOME10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Discount Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as Discount['type'] })}
                  >
                    <SelectTrigger className="mt-1.5 bg-muted/50 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="flat">Flat Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="value">
                    {formData.type === 'percentage' ? 'Percentage (%)' : 'Amount (₹)'}
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                    className="mt-1.5 bg-muted/50 border-border/50"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="minOrder">Minimum Order Value (₹)</Label>
                <Input
                  id="minOrder"
                  type="number"
                  value={formData.minOrderValue}
                  onChange={(e) => setFormData({ ...formData, minOrderValue: parseFloat(e.target.value) || 0 })}
                  className="mt-1.5 bg-muted/50 border-border/50"
                />
              </div>

              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="mt-1.5 bg-muted/50 border-border/50"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <Label htmlFor="enabled">Enable Discount</Label>
                <Switch
                  id="enabled"
                  checked={formData.enabled}
                  onCheckedChange={(checked) => setFormData({ ...formData, enabled: checked })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseModal} className="border-border">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="luxury-gradient text-primary-foreground">
                {selectedDiscount ? 'Update Discount' : 'Create Discount'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Delete Discount</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground">
              Are you sure you want to delete the discount code "{selectedDiscount?.code}"? This action cannot be undone.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} className="border-border">
                Cancel
              </Button>
              <Button onClick={handleDelete} variant="destructive">
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
