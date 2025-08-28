import React from 'react';
import { Search, Bell, User, Settings, LogOut, Menu, MoreHorizontal } from 'lucide-react';
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
}

export function ElementNavbar({ onToggleSidebar }: NavbarProps) {
  return (
    <div className="h-12 bg-[var(--navbar-bg)] border-b border-[var(--navbar-border)] flex items-center justify-between px-5 shadow-sm">
      {/* Left side - Toggle and Search */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2 hover:bg-gray-100"
          onClick={onToggleSidebar}
        >
          <Menu className="w-4 h-4 text-gray-600" />
        </Button>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search..."
            className="pl-10 w-64 h-8 bg-gray-50 border border-gray-200 rounded-md text-sm focus:bg-white focus:border-[var(--primary)]"
          />
        </div>
      </div>

      {/* Right side - Actions and User */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-100">
              <Bell className="w-4 h-4 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 px-1 min-w-4 h-4 flex items-center justify-center bg-red-500 text-white text-xs border-none">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="text-sm font-medium">Notifications (3)</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start py-3 px-4 hover:bg-gray-50">
                <div className="font-medium text-sm">Urgent: Pool Equipment Failure</div>
                <div className="text-xs text-gray-500 mt-1">Johnson's Pool - Pump malfunction detected</div>
                <div className="text-xs text-gray-400 mt-1">5 minutes ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-3 px-4 hover:bg-gray-50">
                <div className="font-medium text-sm">Weekly Report Ready</div>
                <div className="text-xs text-gray-500 mt-1">Operations report for week ending Dec 15</div>
                <div className="text-xs text-gray-400 mt-1">1 hour ago</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-3 px-4 hover:bg-gray-50">
                <div className="font-medium text-sm">New Customer Registration</div>
                <div className="text-xs text-gray-500 mt-1">Sarah Wilson signed up for Premium Plan</div>
                <div className="text-xs text-gray-400 mt-1">3 hours ago</div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 py-1 h-8 hover:bg-gray-100">
              <Avatar className="w-6 h-6">
                <AvatarImage src="/api/placeholder/24/24" alt="User" />
                <AvatarFallback className="text-xs">JD</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-700 hidden sm:block">John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-sm">
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-gray-500 font-normal">Administrator</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm">
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 text-sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}