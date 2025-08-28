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
  Droplet,
  Database,
  ListChecks,
  Star,
  Package,
  RotateCcw,
  Truck,
  CalendarCheck,
  Receipt,
  FileText,
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
    icon: <LayoutDashboard className="w-5 h-5" />,
    children: [
      { id: 'overview', label: 'Overview', icon: <Home className="w-4 h-4" /> },
      { id: 'my-tasks', label: 'My Tasks', icon: <CheckSquare className="w-4 h-4" /> }
    ]
  },
  {
    id: 'customers',
    label: 'Customers & Assets',
    icon: <Users className="w-5 h-5" />,
    children: [
      { id: 'customer-list', label: 'Customer List', icon: <Users className="w-4 h-4" /> },
      { id: 'pools-equipment', label: 'Pools & Equipment', icon: <Droplet className="w-4 h-4" /> },
      { id: 'water-quality', label: 'Water Quality & Records', icon: <Database className="w-4 h-4" /> }
    ]
  },
  {
    id: 'service-orders',
    label: 'Service Orders',
    icon: <ClipboardList className="w-5 h-5" />,
    children: [
      { id: 'orders-list', label: 'Orders List', icon: <ListChecks className="w-4 h-4" /> },
      { id: 'completion-qa', label: 'Completion & Quality Check', icon: <Star className="w-4 h-4" /> },
      { id: 'service-catalog', label: 'Service Catalog', icon: <Package className="w-4 h-4" /> },
      { id: 'after-sales', label: 'After-Sales & Reinspection', icon: <RotateCcw className="w-4 h-4" /> }
    ]
  },
  {
    id: 'dispatch',
    label: 'Dispatch & Scheduling',
    icon: <Calendar className="w-5 h-5" />,
    children: [
      { id: 'dispatch-board', label: 'Dispatch Board', icon: <Truck className="w-4 h-4" /> },
      { id: 'job-assignment', label: 'Job Assignment', icon: <CalendarCheck className="w-4 h-4" /> }
    ]
  },
  {
    id: 'billing',
    label: 'Billing & Finance',
    icon: <DollarSign className="w-5 h-5" />,
    children: [
      { id: 'billing-payments', label: 'Billing & Payments', icon: <Receipt className="w-4 h-4" /> },
      { id: 'invoice-management', label: 'Invoice Management', icon: <FileText className="w-4 h-4" /> },
      { id: 'refunds', label: 'Refund & Adjustments', icon: <RotateCcw className="w-4 h-4" /> }
    ]
  },
  {
    id: 'membership',
    label: 'Membership & Marketing',
    icon: <Trophy className="w-5 h-5" />,
    children: [
      { id: 'packages', label: 'Packages & Plans', icon: <Package className="w-4 h-4" /> },
      { id: 'coupons', label: 'Coupons & Promotions', icon: <Tag className="w-4 h-4" /> },
      { id: 'loyalty', label: 'Points & Loyalty', icon: <Award className="w-4 h-4" /> }
    ]
  },
  {
    id: 'reports',
    label: 'Reports & Analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    children: [
      { id: 'operations-reports', label: 'Operations Reports', icon: <TrendingUp className="w-4 h-4" /> },
      { id: 'custom-export', label: 'Custom Export', icon: <Download className="w-4 h-4" /> }
    ]
  },
  {
    id: 'settings',
    label: 'System Settings',
    icon: <Settings className="w-5 h-5" />,
    children: [
      { id: 'organization', label: 'Organization & Branches', icon: <Building className="w-4 h-4" /> },
      { id: 'roles', label: 'Roles & Permissions', icon: <Shield className="w-4 h-4" /> },
      { id: 'dictionaries', label: 'Dictionaries & Parameters', icon: <BookOpen className="w-4 h-4" /> },
      { id: 'catalog-management', label: 'Service Catalog Management', icon: <Wrench className="w-4 h-4" /> },
      { id: 'pricing', label: 'Pricing/Tax Rules', icon: <Calculator className="w-4 h-4" /> },
      { id: 'audit-log', label: 'Audit Log & Activity', icon: <History className="w-4 h-4" /> }
    ]
  }
];

export function ElementSidebar({ currentPage, onPageChange }: SidebarProps) {
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
        <div key={item.id}>
          <div
            className={`flex items-center px-5 py-3 cursor-pointer transition-colors duration-200 ${
              isChildActive 
                ? 'bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]' 
                : 'text-[var(--sidebar-text)] hover:bg-[var(--sidebar-menu-bg)]'
            }`}
            onClick={() => toggleExpanded(item.id)}
          >
            <div className="flex items-center gap-3 flex-1">
              {item.icon}
              <span className="text-14 font-normal">{item.label}</span>
            </div>
            <div className="transition-transform duration-200" style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
          {isExpanded && (
            <div className="bg-[var(--sidebar-menu-bg)]">
              {item.children?.map(child => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={item.id}
        className={`flex items-center px-5 py-3 cursor-pointer transition-colors duration-200 ${
          level > 0 ? 'pl-12' : ''
        } ${
          isActive 
            ? 'bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]' 
            : 'text-[var(--sidebar-text)] hover:bg-[var(--sidebar-menu-bg)]'
        }`}
        onClick={() => onPageChange(item.id)}
      >
        <div className="flex items-center gap-3">
          {item.icon}
          <span className="text-14 font-normal">{item.label}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-64 h-full bg-[var(--sidebar-bg)] flex flex-col">
      <div className="px-5 py-4 border-b border-[#263445]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[var(--sidebar-active-bg)] rounded-md flex items-center justify-center">
            <Droplet className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-medium text-16">Pool Service Pro</h1>
            <p className="text-[var(--sidebar-text)] text-12">Admin Dashboard</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 py-2 overflow-y-auto">
        {menuItems.map(item => renderMenuItem(item))}
      </nav>
    </div>
  );
}