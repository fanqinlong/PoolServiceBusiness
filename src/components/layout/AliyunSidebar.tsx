import React from 'react';

interface MenuItem {
  id: string;
  label: string;
  children?: MenuItem[];
  isNew?: boolean;
}

interface AliyunSidebarProps {
  currentPage: string;
  onPageChange: (pageId: string) => void;
}

export function AliyunSidebar({ currentPage, onPageChange }: AliyunSidebarProps) {

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      children: [
        { id: 'overview', label: 'Overview' },
        { id: 'my-tasks', label: 'My Tasks' }
      ]
    },
    {
      id: 'customers',
      label: 'Customers',
      children: [
        { id: 'customer-list', label: 'Customer List' },
        { id: 'pools-equipment', label: 'Pools Equipment' },
        { id: 'water-quality-records', label: 'Water Quality' }
      ]
    },
    {
      id: 'service-orders',
      label: 'Service Orders',
      children: [
        { id: 'orders-list', label: 'Orders List' },
        { id: 'service-catalog', label: 'Service Catalog' }
      ]
    },
    {
      id: 'scheduling',
      label: 'Scheduling',
      children: [
        { id: 'dispatch-board', label: 'Dispatch Board' },
        { id: 'job-assignment', label: 'Job Assignment' }
      ]
    },
    {
      id: 'finance',
      label: 'Finance',
      children: [
        { id: 'billing-payments', label: 'Billing & Payments' },
        { id: 'invoice-management', label: 'Invoice Management' },
        { id: 'refund-adjustments', label: 'Refund & Adjustments' }
      ]
    },
    {
      id: 'membership',
      label: 'Membership',
      children: [
        { id: 'packages-plans', label: 'Packages & Plans' },
        { id: 'coupons-promotions', label: 'Coupons & Promotions' },
        { id: 'points-loyalty', label: 'Points & Loyalty' }
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      children: [
        { id: 'operations-reports', label: 'Operations Reports' },
        { id: 'custom-export', label: 'Custom Export' }
      ]
    },
    {
      id: 'system-settings',
      label: 'System Settings',
      children: [
        { id: 'roles-permissions', label: 'Roles & Permissions' },
        { id: 'dictionaries-parameters', label: 'Data Dictionaries' }
      ]
    }
  ];

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = currentPage === item.id;

    return (
      <div key={item.id}>
        <div 
          className={`
            flex items-center py-2 cursor-pointer transition-colors duration-200
            ${isActive ? 'bg-[var(--aliyun-blue)] text-white' : 'text-[#333333] hover:bg-[#f0f0f0]'}
            ${level > 0 ? 'pl-12 pr-4 text-base' : 'pl-6 pr-4 text-base'}
          `}
          onClick={() => {
            if (!hasChildren) {
              onPageChange(item.id);
            }
          }}
        >
          <span className={`${isActive ? 'font-medium' : level === 0 ? 'font-medium' : 'font-normal'}`}>
            {item.label}
            {item.isNew && (
              <span className="ml-2 px-1 py-0 bg-[#ff4d4f] text-white text-base rounded">
                New
              </span>
            )}
          </span>
        </div>
        
        {hasChildren && (
          <div>
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Helper function to add separator after specific menu items
  const needsSeparator = (itemId: string) => {
    return ['dashboard', 'customers', 'service-orders', 'scheduling', 'finance', 'membership', 'reports'].includes(itemId);
  };

  return (
    <div className="w-64 h-full bg-[var(--sidebar-bg)] border-r border-[var(--sidebar-border)] flex flex-col -mt-5">
      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto">
        <div className="h-4 bg-gradient-to-b from-[var(--sidebar-bg)] to-transparent"></div>
        <nav className="pt-2">
          {menuItems.map((item, index) => (
            <div key={item.id}>
              {renderMenuItem(item)}
              {needsSeparator(item.id) && (
                <div className="aliyun-sidebar-separator mx-4" />
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}