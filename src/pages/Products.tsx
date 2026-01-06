import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useStore } from '@/store/useStore';
import { Product } from '@/data/mockData';
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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Search, Edit, Trash2, ImagePlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const defaultProduct: Partial<Product> = {
  name: '',
  category: 'Ring',
  material: 'Gold',
  purity: '22K',
  weight: 0,
  makingCharges: 0,
  gst: 3,
  finalPrice: 0,
  stock: 0,
  status: 'Active',
  featured: false,
  images: [],
};

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>(defaultProduct);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setSelectedProduct(product);
      setFormData(product);
    } else {
      setSelectedProduct(null);
      setFormData(defaultProduct);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setFormData(defaultProduct);
  };

  const calculateFinalPrice = () => {
    const goldRate = formData.material === 'Gold' ? 6500 : formData.material === 'Silver' ? 85 : 15000;
    const metalValue = (formData.weight || 0) * goldRate;
    const makingCharges = formData.makingCharges || 0;
    const subtotal = metalValue + makingCharges;
    const gstAmount = subtotal * ((formData.gst || 3) / 100);
    return Math.round(subtotal + gstAmount);
  };

  const handleSubmit = () => {
    const finalPrice = calculateFinalPrice();
    const productData: Product = {
      id: selectedProduct?.id || `PRD${String(Date.now()).slice(-6)}`,
      name: formData.name || '',
      category: formData.category || 'Ring',
      material: formData.material || 'Gold',
      purity: formData.purity || '22K',
      weight: formData.weight || 0,
      makingCharges: formData.makingCharges || 0,
      gst: formData.gst || 3,
      finalPrice,
      stock: formData.stock || 0,
      status: formData.status || 'Active',
      featured: formData.featured || false,
      images: formData.images || [],
      createdAt: selectedProduct?.createdAt || new Date().toISOString().split('T')[0],
    };

    if (selectedProduct) {
      updateProduct(selectedProduct.id, productData);
      toast.success('Product updated successfully');
    } else {
      addProduct(productData);
      toast.success('Product added successfully');
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id);
      toast.success('Product deleted successfully');
    }
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  return (
    <AdminLayout title="Products">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>
          <Button onClick={() => handleOpenModal()} className="luxury-gradient text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Products Table */}
        <div className="luxury-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">Image</TableHead>
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Category</TableHead>
                <TableHead className="text-muted-foreground">Material</TableHead>
                <TableHead className="text-muted-foreground">Weight</TableHead>
                <TableHead className="text-muted-foreground">Price</TableHead>
                <TableHead className="text-muted-foreground">Stock</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="border-border hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      {product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImagePlus className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      {product.featured && (
                        <Badge variant="outline" className="mt-1 border-primary/30 text-primary text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.category}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.material} ({product.purity})
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.weight}g</TableCell>
                  <TableCell className="font-semibold text-foreground">
                    ₹{product.finalPrice.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        'border',
                        product.stock === 0
                          ? 'bg-destructive/10 text-destructive border-destructive/20'
                          : product.stock <= 3
                          ? 'bg-warning/10 text-warning border-warning/20'
                          : 'bg-success/10 text-success border-success/20'
                      )}
                    >
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        'border',
                        product.status === 'Active'
                          ? 'bg-success/10 text-success border-success/20'
                          : 'bg-muted text-muted-foreground border-border'
                      )}
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenModal(product)}
                        className="hover:bg-primary/10 hover:text-primary"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteModal(product)}
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
          <DialogContent className="bg-card border-border max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">
                {selectedProduct ? 'Edit Product' : 'Add New Product'}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="col-span-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1.5 bg-muted/50 border-border/50"
                  placeholder="Royal Solitaire Diamond Ring"
                />
              </div>

              <div>
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value as Product['category'] })}
                >
                  <SelectTrigger className="mt-1.5 bg-muted/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="Ring">Ring</SelectItem>
                    <SelectItem value="Necklace">Necklace</SelectItem>
                    <SelectItem value="Bracelet">Bracelet</SelectItem>
                    <SelectItem value="Earring">Earring</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Material</Label>
                <Select
                  value={formData.material}
                  onValueChange={(value) => setFormData({ ...formData, material: value as Product['material'] })}
                >
                  <SelectTrigger className="mt-1.5 bg-muted/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="Gold">Gold</SelectItem>
                    <SelectItem value="Silver">Silver</SelectItem>
                    <SelectItem value="Diamond">Diamond</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Purity</Label>
                <Select
                  value={formData.purity}
                  onValueChange={(value) => setFormData({ ...formData, purity: value as Product['purity'] })}
                >
                  <SelectTrigger className="mt-1.5 bg-muted/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="18K">18K</SelectItem>
                    <SelectItem value="22K">22K</SelectItem>
                    <SelectItem value="24K">24K</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="weight">Weight (grams)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) || 0 })}
                  className="mt-1.5 bg-muted/50 border-border/50"
                />
              </div>

              <div>
                <Label htmlFor="makingCharges">Making Charges (₹)</Label>
                <Input
                  id="makingCharges"
                  type="number"
                  value={formData.makingCharges}
                  onChange={(e) => setFormData({ ...formData, makingCharges: parseFloat(e.target.value) || 0 })}
                  className="mt-1.5 bg-muted/50 border-border/50"
                />
              </div>

              <div>
                <Label htmlFor="gst">GST (%)</Label>
                <Input
                  id="gst"
                  type="number"
                  value={formData.gst}
                  onChange={(e) => setFormData({ ...formData, gst: parseFloat(e.target.value) || 0 })}
                  className="mt-1.5 bg-muted/50 border-border/50"
                />
              </div>

              <div>
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                  className="mt-1.5 bg-muted/50 border-border/50"
                />
              </div>

              <div className="col-span-2 p-4 rounded-lg bg-muted/50 border border-border/50">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Calculated Final Price</span>
                  <span className="text-2xl font-display font-bold text-primary">
                    ₹{calculateFinalPrice().toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="col-span-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label htmlFor="featured">Featured Product</Label>
                </div>

                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as Product['status'] })}
                >
                  <SelectTrigger className="w-32 bg-muted/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2">
                <Label>Product Images</Label>
                <div className="mt-1.5 border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <ImagePlus className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload images</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleCloseModal} className="border-border">
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="luxury-gradient text-primary-foreground">
                {selectedProduct ? 'Update Product' : 'Add Product'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Delete Product</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground">
              Are you sure you want to delete "{selectedProduct?.name}"? This action cannot be undone.
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
