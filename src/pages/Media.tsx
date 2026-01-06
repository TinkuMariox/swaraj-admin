import { useState } from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useStore } from '@/store/useStore';
import { MediaItem } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Upload, Search, Trash2, Eye, Image, Download } from 'lucide-react';
import { toast } from 'sonner';

export default function Media() {
  const { media, addMedia, deleteMedia } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredMedia = media.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpload = () => {
    // Simulate upload
    const newMedia: MediaItem = {
      id: `MED${String(Date.now()).slice(-6)}`,
      name: `new-image-${Date.now()}.jpg`,
      url: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800',
      type: 'image',
      size: '2.1 MB',
      uploadedAt: new Date().toISOString().split('T')[0],
    };
    addMedia(newMedia);
    toast.success('Image uploaded successfully');
  };

  const handleDelete = () => {
    if (selectedMedia) {
      deleteMedia(selectedMedia.id);
      toast.success('Image deleted successfully');
    }
    setIsDeleteModalOpen(false);
    setSelectedMedia(null);
  };

  const openPreview = (item: MediaItem) => {
    setSelectedMedia(item);
    setIsPreviewOpen(true);
  };

  const openDeleteModal = (item: MediaItem) => {
    setSelectedMedia(item);
    setIsDeleteModalOpen(true);
  };

  return (
    <AdminLayout title="Media Gallery">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-border/50"
            />
          </div>
          <Button onClick={handleUpload} className="luxury-gradient text-primary-foreground">
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
          </Button>
        </div>

        {/* Upload Zone */}
        <div className="luxury-card p-8 border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors cursor-pointer text-center">
          <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-display text-lg font-semibold text-foreground mb-2">
            Drop files here to upload
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Supports: JPG, PNG, GIF, WEBP (Max 10MB each)
          </p>
          <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
            Choose Files
          </Button>
        </div>

        {/* Media Grid */}
        {filteredMedia.length === 0 ? (
          <div className="luxury-card p-12 text-center">
            <Image className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-display text-lg font-semibold text-foreground mb-2">
              No media files
            </h3>
            <p className="text-muted-foreground text-sm">
              Upload images to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="luxury-card overflow-hidden group hover-lift"
              >
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      onClick={() => openPreview(item)}
                      className="w-9 h-9 bg-background/20 hover:bg-background/40 text-foreground"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="w-9 h-9 bg-background/20 hover:bg-background/40 text-foreground"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => openDeleteModal(item)}
                      className="w-9 h-9"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">{item.size}</p>
                    <p className="text-xs text-muted-foreground">{item.uploadedAt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Preview Modal */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="bg-card border-border max-w-4xl p-0 overflow-hidden">
            <div className="relative">
              <img
                src={selectedMedia?.url}
                alt={selectedMedia?.name}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{selectedMedia?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedMedia?.size} • Uploaded on {selectedMedia?.uploadedAt}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-border">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setIsPreviewOpen(false);
                      if (selectedMedia) openDeleteModal(selectedMedia);
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-xl">Delete Image</DialogTitle>
            </DialogHeader>
            <p className="text-muted-foreground">
              Are you sure you want to delete "{selectedMedia?.name}"? This action cannot be undone.
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
