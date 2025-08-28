import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Calendar, 
  DollarSign, 
  Trophy, 
  BarChart3, 
  Settings,
  ChevronDown,
  ChevronRight,
  Home,
  CheckSquare,
  UserCheck,
  Droplet,
  ListChecks,
  Star,
  Truck,
  CalendarCheck,
  Receipt,
  FileText,
  RotateCcw,
  Package,
  Tag,
  Award,
  TrendingUp,
  Download,
  Building,
  Shield,
  BookOpen,
  Wrench,
  Calculator,
  History
} from 'lucide-react';
import { Button } from '../ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-4 h-4" />,
    children: [
      { id: 'overview', label: 'Overview', icon: <Home className="w-4 h-4" /> },
      { id: 'my-tasks', label: 'My Tasks', icon: <CheckSquare className="w-4 h-4" /> }
    ]
  },
  {
    id: 'customers',
    label: 'Customers & Assets',
    icon: <Users className="w-4 h-4" />,
    children: [
      { id: 'customer-list', label: 'Customer List', icon: <Users className="w-4 h-4" /> },
      { id: 'pools-equipment', label: 'Pools & Equipment', icon: <Droplet className="w-4 h-4" /> },
      { id: 'water-quality', label: 'Water Quality & Maintenance', icon: <UserCheck className="w-4 h-4" /> }
    ]
  },
  {
    id: 'service-orders',
    label: 'Service Orders',
    icon: <ClipboardList className="w-4 h-4" />,
    children: [
      { id: 'orders-list', label: 'Orders List', icon: <ListChecks className="w-4 h-4" /> },
      { id: 'completion-qa', label: 'Completion & Quality Check', icon: <Star className="w-4 h-4" /> },
      { id: 'service-catalog', label: 'Service Catalog', icon: <Package className="w-4 h-4" /> }
    ]
  },
  {
    id: 'dispatch',
    label: 'Dispatch & Scheduling',
    icon: <Calendar className="w-4 h-4" />,
    children: [
      { id: 'dispatch-board', label: 'Dispatch Board', icon: <Truck className="w-4 h-4" /> },
      { id: 'job-assignment', label: 'Job Assignment', icon: <CalendarCheck className="w-4 h-4" /> }
    ]
  },
  {
    id: 'billing',
    label: 'Billing & Finance',
    icon: <DollarSign className="w-4 h-4" />,
    children: [
      { id: 'billing-payments', label: 'Billing & Payments', icon: <Receipt className="w-4 h-4" /> },
      { id: 'invoice-management', label: 'Invoice Management', icon: <FileText className="w-4 h-4" /> },
      { id: 'refunds', label: 'Refund & Adjustments', icon: <RotateCcw className="w-4 h-4" /> }
    ]
  },
  {
    id: 'membership',
    label: 'Membership & Marketing',
    icon: <Trophy className="w-4 h-4" />,
    children: [
      { id: 'packages', label: 'Packages & Service Plans', icon: <Package className="w-4 h-4" /> },
      { id: 'coupons', label: 'Coupons & Promotions', icon: <Tag className="w-4 h-4" /> },
      { id: 'loyalty', label: 'Points & Loyalty', icon: <Award className="w-4 h-4" /> }
    ]
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    icon: <BarChart3 className="w-4 h-4" />,
    children: [
      { id: 'operations-reports', label: 'Operations Reports', icon: <TrendingUp className="w-4 h-4" /> },
      { id: 'custom-export', label: 'Custom Export', icon: <Download className="w-4 h-4" /> }
    ]
  },
  {
    id: 'settings',
    label: 'System Settings',
    icon: <Settings className="w-4 h-4" />,
    children: [
      { id: 'organization', label: 'Organization & Branches', icon: <Building className="w-4 h-4" /> },
      { id: 'roles', label: 'Roles & Permissions', icon: <Shield className="w-4 h-4" /> },
      { id: 'dictionaries', label: 'Dictionaries & Parameters', icon: <BookOpen className="w-4 h-4" /> },
      { id: 'catalog-management', label: 'Service Catalog Management', icon: <Wrench className="w-4 h-4" /> },
      { id: 'pricing', label: 'Pricing/Tax Rules', icon: <Calculator className="w-4 h-4" /> },
      { id: 'audit-log', label: 'Audit Log & Activity History', icon: <History className="w-4 h-4" /> }
    ]
  }
];

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard']);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = currentPage === item.id;
    const isChildActive = item.children?.some(child => currentPage === child.id);

    if (hasChildren) {
      return (
        <Collapsible key={item.id} open={isExpanded} onOpenChange={() => toggleExpanded(item.id)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start px-3 py-2 h-auto hover:bg-blue-50 ${
                isChildActive ? 'bg-blue-50 text-blue-700' : ''
              }`}
              style={{ paddingLeft: `${12 + level * 16}px` }}
            >
              <div className="flex items-center gap-3 w-full">
                {item.icon}
                <span className="flex-1 text-left">{item.label}</span>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        className={`w-full justify-start px-3 py-2 h-auto hover:bg-blue-50 ${
          isActive ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600' : ''
        }`}
        style={{ paddingLeft: `${12 + level * 16}px` }}
        onClick={() => onPageChange(item.id)}
      >
        <div className="flex items-center gap-3">
          {item.icon}
          <span>{item.label}</span>
        </div>
      </Button>
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-blue-700">Pool Service Pro</h1>
        <p className="text-sm text-gray-500">Admin Dashboard</p>
      </div>
      <nav className="p-2 space-y-1">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>
    </div>
  );
}