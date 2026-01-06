import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const { sidebarCollapsed } = useStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Navbar title={title} />
      <main
        className={cn(
          'pt-16 min-h-screen transition-all duration-300',
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        )}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
