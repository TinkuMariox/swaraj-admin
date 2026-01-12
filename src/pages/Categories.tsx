import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  createdAt: string;
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Rings',
    description: 'Diamond and gold rings',
    productCount: 45,
    createdAt: '2025-01-10',
  },
  {
    id: '2',
    name: 'Necklaces',
    description: 'Elegant necklace collection',
    productCount: 32,
    createdAt: '2025-01-08',
  },
  {
    id: '3',
    name: 'Earrings',
    description: 'Precious metal earrings',
    productCount: 28,
    createdAt: '2025-01-05',
  },
  {
    id: '4',
    name: 'Bracelets',
    description: 'Designer bracelets',
    productCount: 15,
    createdAt: '2025-01-02',
  },
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const handleCreateOrUpdate = (data: any) => {
    if (selectedCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === selectedCategory.id
            ? { ...cat, ...data }
            : cat
        )
      );
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        ...data,
        productCount: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCategories([newCategory, ...categories]);
    }
    reset();
    setSelectedCategory(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    reset({ name: category.name, description: category.description });
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedCategory) {
      setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));
      setIsDeleteDialogOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCategory(null);
    reset();
  };

  return (
    <AdminLayout title="Categories">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold luxury-text-gradient">Categories</h1>
            <p className="text-muted-foreground mt-1">Manage your product categories</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setSelectedCategory(null);
                  reset();
                }}
                className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                <Plus className="w-4 h-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle>
                  {selectedCategory ? 'Edit Category' : 'Add New Category'}
                </DialogTitle>
                <DialogDescription>
                  {selectedCategory
                    ? 'Update the category details'
                    : 'Create a new product category'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(handleCreateOrUpdate)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Rings"
                    {...register('name', { required: true })}
                    className="bg-background border-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe this category..."
                    {...register('description')}
                    className="bg-background border-input"
                    rows={4}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseDialog}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-primary to-primary/80"
                  >
                    {selectedCategory ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories Table */}
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Products</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id} className="border-border hover:bg-sidebar/50">
                  <TableCell className="font-medium text-foreground">
                    {category.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {category.description}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {category.productCount}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(category)}
                        className="hover:text-primary hover:bg-primary/10"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(category)}
                        className="hover:text-destructive hover:bg-destructive/10"
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

        {categories.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">No categories found</p>
          </div>
        )}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedCategory?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel className="border-border">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
