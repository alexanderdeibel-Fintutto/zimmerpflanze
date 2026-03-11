import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Flower2,
  Home,
  Droplets,
  ListChecks,
  Plane,
  ShoppingCart,
  Calendar,
  Search,
  BarChart3,
  Camera,
  Settings,
  LogOut,
  Leaf,
  ChevronLeft,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface NavSection {
  title?: string;
  items: { to: string; icon: typeof LayoutDashboard; label: string }[];
}

const navSections: NavSection[] = [
  {
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    title: 'Pflanzen',
    items: [
      { to: '/plants', icon: Flower2, label: 'Meine Pflanzen' },
      { to: '/catalog', icon: Search, label: 'Pflanzenkatalog' },
      { to: '/scanner', icon: Camera, label: 'Pflanzen-Scanner' },
    ],
  },
  {
    title: 'Pflege',
    items: [
      { to: '/care', icon: Droplets, label: 'Giessplan' },
      { to: '/batch-care', icon: ListChecks, label: 'Batch-Pflege' },
      { to: '/calendar', icon: Calendar, label: 'Kalender' },
    ],
  },
  {
    title: 'Organisation',
    items: [
      { to: '/apartments', icon: Home, label: 'Wohnungen' },
      { to: '/vacation', icon: Plane, label: 'Urlaubsplan' },
      { to: '/shopping', icon: ShoppingCart, label: 'Einkaufsliste' },
      { to: '/statistics', icon: BarChart3, label: 'Statistiken' },
    ],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/landing');
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-card/90 backdrop-blur-sm rounded-xl p-2.5 shadow-lg border transition-transform active:scale-95"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64',
          collapsed ? 'lg:w-[68px]' : 'lg:w-64',
          'lg:relative lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border flex-shrink-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-md shadow-green-500/20 flex-shrink-0">
            <Leaf className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="font-bold text-sidebar-foreground text-base leading-tight tracking-tight">
                Pflanzen
              </h1>
              <p className="text-[11px] text-muted-foreground font-medium tracking-wide uppercase">Manager</p>
            </div>
          )}
          {/* Desktop collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto hidden lg:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <ChevronLeft className={cn('h-4 w-4 transition-transform duration-300', collapsed && 'rotate-180')} />
          </button>
          {/* Mobile close */}
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto lg:hidden flex items-center justify-center w-7 h-7 rounded-lg hover:bg-sidebar-accent transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-1">
          {navSections.map((section, sIndex) => (
            <div key={sIndex} className={cn(sIndex > 0 && 'pt-3')}>
              {section.title && !collapsed && (
                <p className="px-3 mb-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </p>
              )}
              {section.title && collapsed && (
                <div className="mx-auto w-6 border-t border-sidebar-border mb-2" />
              )}
              <div className="space-y-0.5">
                {section.items.map(item => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'group flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150',
                        isActive
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-sm shadow-green-600/20'
                          : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                        collapsed && 'lg:justify-center lg:px-2'
                      )
                    }
                    end={item.to === '/dashboard'}
                  >
                    <item.icon className={cn(
                      'h-[18px] w-[18px] flex-shrink-0 transition-transform duration-150',
                      'group-hover:scale-110'
                    )} />
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-2.5 space-y-0.5 flex-shrink-0">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              cn(
                'group flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150',
                isActive
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-sm shadow-green-600/20'
                  : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                collapsed && 'lg:justify-center lg:px-2'
              )
            }
          >
            <Settings className="h-[18px] w-[18px] flex-shrink-0 group-hover:rotate-45 transition-transform duration-300" />
            {!collapsed && <span>Einstellungen</span>}
          </NavLink>
          {user && (
            <button
              onClick={handleSignOut}
              className={cn(
                'w-full group flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-sidebar-foreground/80 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400 transition-all duration-150',
                collapsed && 'lg:justify-center lg:px-2'
              )}
            >
              <LogOut className="h-[18px] w-[18px] flex-shrink-0 group-hover:-translate-x-0.5 transition-transform duration-150" />
              {!collapsed && <span>Abmelden</span>}
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
