import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Image,
  Percent,
  BarChart3,
  Settings,
  CreditCard,
  HelpingHand,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import logo from "../../assets/swarnazlogo.png"

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Package, label: 'Products', path: '/products' },
  { icon: Layers, label: 'Categories', path: '/categories' },
  { icon: ShoppingCart, label: 'Orders', path: '/orders' },
  { icon: Users, label: 'Customers', path: '/customers' },
  // { icon: Image, label: 'Media', path: '/media' },
  { icon: Percent, label: 'Discounts', path: '/discounts' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: CreditCard, label: 'Transactions', path: '/transactions' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpingHand, label: 'Help & Support', path: '/help-support' },
  { icon: HelpCircle, label: 'FAQs', path: '/faqs' },
];

export function Sidebar() {
  const location = useLocation();
  const { sidebarCollapsed, toggleSidebar } = useStore();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col',
        sidebarCollapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between h-24 px-4 border-b border-sidebar-border bg-gradient-to-r from-sidebar/50 to-transparent">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200">
          <div className="w-16 h-16 rounded-lg p-1 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg">
            <img 
              src={logo}
              alt="Swarnaaz Logo"
              className="w-full h-full object-contain"
            />
          </div>
          {!sidebarCollapsed && (
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold luxury-text-gradient">
                SWARNAZ
              </span>
              <span className="text-xs text-muted-foreground">Jewellery Admin</span>
            </div>
          )}
        </Link>
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button> */}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-luxury">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            const linkContent = (
              <Link
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group',
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <Icon
                  className={cn(
                    'w-5 h-5 flex-shrink-0 transition-colors',
                    isActive ? 'text-primary' : 'group-hover:text-primary'
                  )}
                />
                {!sidebarCollapsed && (
                  <span className="font-medium text-sm">{item.label}</span>
                )}
                {isActive && !sidebarCollapsed && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse-gold" />
                )}
              </Link>
            );

            return (
              <li key={item.path}>
                {sidebarCollapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right" className="bg-card border-border">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  linkContent
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      {/* <div className="p-3 border-t border-sidebar-border">
        {sidebarCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-center text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-card border-border">
              Logout
            </TooltipContent>
          </Tooltip>
        ) : (
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </Button>
        )}
      </div> */}
    </aside>
  );
}
