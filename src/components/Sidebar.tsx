import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Key,
  Brain,
  BarChart3,
  PlayCircle,
  Settings,
  Zap,
  Database,
  Shield,
  Code,
} from 'lucide-react';

const navigation = [
  {
    title: 'Core',
    items: [
      { title: 'Dashboard', url: '/', icon: LayoutDashboard },
      { title: 'API Keys', url: '/keys', icon: Key },
      { title: 'Intent Input', url: '/intent', icon: Brain },
      { title: 'Analytics', url: '/analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'Tools',
    items: [
      { title: 'Playground', url: '/playground', icon: PlayCircle },
      { title: 'Templates', url: '/templates', icon: Code },
      { title: 'Vectors', url: '/vectors', icon: Database },
    ],
  },
  {
    title: 'System',
    items: [
      { title: 'Security', url: '/security', icon: Shield },
      { title: 'Settings', url: '/settings', icon: Settings },
    ],
  },
];

export function Sidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === 'collapsed';

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarPrimitive className={`${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 border-r border-neon-green/30 bg-terminal-darker`}>
      <SidebarContent className="p-2">
        {navigation.map((section) => (
          <SidebarGroup key={section.title} className="mb-4">
            {!isCollapsed && (
              <SidebarGroupLabel className="text-neon-green/70 font-terminal text-xs uppercase tracking-wider mb-2 px-2">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="group">
                      <NavLink
                        to={item.url}
                        className={({ isActive: navIsActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-sm font-terminal text-sm transition-all duration-200 relative overflow-hidden ${
                            navIsActive || isActive(item.url)
                              ? 'bg-neon-green/20 text-neon-green border border-neon-green/40 glow-text shadow-[0_0_10px_hsl(var(--neon-green)/0.3)]'
                              : 'text-neon-green/70 hover:text-neon-green hover:bg-neon-green/10 border border-transparent'
                          }`
                        }
                      >
                        <item.icon className={`w-5 h-5 ${isActive(item.url) ? 'animate-pulse-slow' : ''}`} />
                        {!isCollapsed && (
                          <span className="truncate">{item.title}</span>
                        )}
                        {(isActive(item.url)) && (
                          <div className="absolute left-0 w-1 h-full bg-neon-green animate-pulse-slow" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Status Indicator */}
        <div className={`mt-auto p-2 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <div className="flex items-center gap-2 px-2 py-1 bg-terminal-dark border border-neon-green/40 rounded-sm">
            <Zap className="w-3 h-3 text-neon-green animate-pulse" />
            {!isCollapsed && (
              <span className="text-xs font-terminal text-neon-green">ONLINE</span>
            )}
          </div>
        </div>
      </SidebarContent>
    </SidebarPrimitive>
  );
}