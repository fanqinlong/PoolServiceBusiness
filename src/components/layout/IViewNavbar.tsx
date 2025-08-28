import React from 'react';
import { Search, Bell, User, Settings, LogOut, Menu, Maximize, Minimize } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu';

interface NavbarProps {
  onToggleSidebar?: () => void;
  collapsed?: boolean;
}

export function IViewNavbar({ onToggleSidebar, collapsed }: NavbarProps) {
  return (
    <div className="h-16 bg-[var(--navbar-bg)] border-b border-[var(--navbar-border)] flex items-center justify-between px-6 shadow-sm">
      {/* Left side - Toggle and Search */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2 hover:bg-gray-50 text-[var(--sidebar-text)]"
          onClick={onToggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </Button>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] w-4 h-4" />
          <Input
            placeholder="Search pages, users, orders..."
            className="pl-10 w-80 h-8 bg-[var(--input-background)] border border-[var(--border)] rounded-md text-sm focus:border-[var(--primary)] transition-colors"
          />
        </div>
      </div>

      {/* Right side - Actions and User */}
      <div className="flex items-center gap-2">
        {/* Fullscreen Toggle */}
        <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-50 text-[var(--sidebar-text)]">
          <Maximize className="w-4 h-4" />
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-50 text-[var(--sidebar-text)]">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 px-1 min-w-4 h-4 flex items-center justify-center bg-[var(--destructive)] text-white text-xs border-none">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-96 bg-white border border-[var(--border)] shadow-lg">
            <div className="px-4 py-3 border-b border-[var(--border)]">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-[var(--foreground)]">Notifications</h3>
                <Badge variant="secondary" className="text-xs">3 new</Badge>
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto">
              <div className="px-4 py-3 hover:bg-[var(--muted)] cursor-pointer border-b border-[var(--border)]">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--destructive)] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--foreground)]">Pool Equipment Failure</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">Johnson's Pool - Pump malfunction detected</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">5 minutes ago</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 hover:bg-[var(--muted)] cursor-pointer border-b border-[var(--border)]">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--chart-3)] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--foreground)]">Weekly Report Ready</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">Operations report for week ending Dec 15</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 hover:bg-[var(--muted)] cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--foreground)]">New Customer Registration</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">Sarah Wilson signed up for Premium Plan</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">3 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-[var(--border)]">
              <Button variant="outline" size="sm" className="w-full text-xs h-7">
                View All Notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 py-1 h-8 hover:bg-gray-50">
              <Avatar className="w-6 h-6">
                <AvatarImage src="/api/placeholder/24/24" alt="User" />
                <AvatarFallback className="text-xs bg-[var(--primary)] text-white">JD</AvatarFallback>
              </Avatar>
              <span className="text-sm text-[var(--foreground)] hidden sm:block">John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white border border-[var(--border)] shadow-lg">
            <DropdownMenuLabel className="text-sm">
              <div className="font-medium text-[var(--foreground)]">John Doe</div>
              <div className="text-xs text-[var(--muted-foreground)] font-normal">Administrator</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm hover:bg-[var(--muted)]">
              <User className="w-4 h-4 mr-2" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm hover:bg-[var(--muted)]">
              <Settings className="w-4 h-4 mr-2" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-[var(--destructive)] text-sm hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}