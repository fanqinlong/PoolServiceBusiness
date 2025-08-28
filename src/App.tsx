import React, { useState } from 'react';
import { AliyunSidebar } from './components/layout/AliyunSidebar';
import { AliyunNavbar } from './components/layout/AliyunNavbar';
import { AliyunBreadcrumb } from './components/layout/AliyunBreadcrumb';
import { AliyunECSOverview } from './components/pages/AliyunECSOverview';
import { CustomerList } from './components/pages/CustomerList';
import { PoolsEquipment } from './components/pages/PoolsEquipment';
import { WaterQuality } from './components/pages/WaterQuality';
import { OrdersList } from './components/pages/OrdersList';
import { ServiceCatalog } from './components/pages/ServiceCatalog';
import { DispatchBoard } from './components/pages/DispatchBoard';
import { JobAssignment } from './components/pages/JobAssignment';
import { MyTasks } from './components/pages/MyTasks';

// Mock components for other pages - Aliyun style
function AliyunGenericPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 bg-[var(--content-bg)] min-h-full">
      <div className="bg-white rounded border border-gray-200 shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-3">{title}</h2>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
          <p className="text-sm text-gray-500">
            This page is under development. Please stay tuned...
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('overview');

  // Page configuration for breadcrumbs and labels
  const pageConfig = {
    // Dashboard
    'overview': { 
      title: 'Overview', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Dashboard' }, { label: 'Overview' }],
      description: 'Dashboard overview with key metrics and recent activities'
    },
    'my-tasks': { 
      title: 'My Tasks', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Dashboard' }, { label: 'My Tasks' }],
      description: 'Personal task list and assignments'
    },
    
    // Customers
    'customer-list': { 
      title: 'Customer List', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Customers' }, { label: 'Customer List' }],
      description: 'Manage customer information and contact details'
    },
    'pools-equipment': { 
      title: 'Pools Equipment', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Customers' }, { label: 'Pools Equipment' }],
      description: 'Track pool specifications and equipment inventory'
    },
    'water-quality-records': { 
      title: 'Water Quality', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Customers' }, { label: 'Water Quality' }],
      description: 'Monitor water quality measurements and historical records'
    },
    
    // Service Orders
    'orders-list': { 
      title: 'Orders List', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Service Orders' }, { label: 'Orders List' }],
      description: 'View and manage all service orders'
    },
    'service-catalog': { 
      title: 'Service Catalog', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Service Orders' }, { label: 'Service Catalog' }],
      description: 'Available services: Open/Close Pool, Maintenance, Repair, Installation, Supplies'
    },
    
    // Scheduling
    'dispatch-board': { 
      title: 'Dispatch Board', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Scheduling' }, { label: 'Dispatch Board' }],
      description: 'Real-time dispatch board for service coordination'
    },
    'job-assignment': { 
      title: 'Job Assignment', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Scheduling' }, { label: 'Job Assignment' }],
      description: 'Assign jobs to technicians and manage schedules'
    },
    
    // Finance
    'billing-payments': { 
      title: 'Billing & Payments', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Finance' }, { label: 'Billing & Payments' }],
      description: 'Process billing and track payment status'
    },
    'invoice-management': { 
      title: 'Invoice Management', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Finance' }, { label: 'Invoice Management' }],
      description: 'Create and manage invoices with Canadian tax compliance'
    },
    'refund-adjustments': { 
      title: 'Refund & Adjustments', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Finance' }, { label: 'Refund & Adjustments' }],
      description: 'Handle refunds and billing adjustments'
    },
    
    // Membership
    'packages-plans': { 
      title: 'Packages & Plans', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Membership' }, { label: 'Packages & Plans' }],
      description: 'Manage service packages and subscription plans'
    },
    'coupons-promotions': { 
      title: 'Coupons & Promotions', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Membership' }, { label: 'Coupons & Promotions' }],
      description: 'Create and manage promotional campaigns'
    },
    'points-loyalty': { 
      title: 'Points & Loyalty', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Membership' }, { label: 'Points & Loyalty' }],
      description: 'Customer loyalty program and points management'
    },
    
    // Reports
    'operations-reports': { 
      title: 'Operations Reports', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Reports' }, { label: 'Operations Reports' }],
      description: 'Comprehensive operational performance reports'
    },
    'custom-export': { 
      title: 'Custom Export', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'Reports' }, { label: 'Custom Export' }],
      description: 'Export custom data reports and analytics'
    },
    
    // System Settings
    'roles-permissions': { 
      title: 'Roles & Permissions', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'System Settings' }, { label: 'Roles & Permissions' }],
      description: 'Configure user roles and access permissions'
    },
    'dictionaries-parameters': { 
      title: 'Data Dictionaries', 
      breadcrumb: [{ label: 'Pool Service Manager' }, { label: 'System Settings' }, { label: 'Data Dictionaries' }],
      description: 'System dictionaries and configuration parameters'
    }
  };

  const handlePageChange = (pageId: string) => {
    setCurrentPage(pageId);
  };

  const renderPage = () => {
    const config = pageConfig[currentPage as keyof typeof pageConfig];
    
    switch (currentPage) {
      case 'overview':
        return <AliyunECSOverview />;
      case 'my-tasks':
        return <MyTasks />;
      case 'customer-list':
        return <CustomerList />;
      case 'pools-equipment':
        return <PoolsEquipment />;
      case 'water-quality-records':
        return <WaterQuality />;
      case 'orders-list':
        return <OrdersList />;
      case 'service-catalog':
        return <ServiceCatalog />;
      case 'dispatch-board':
        return <DispatchBoard />;
      case 'job-assignment':
        return <JobAssignment />;
      default:
        return <AliyunGenericPage 
          title={config?.title || 'Page'} 
          description={config?.description || 'Page description'} 
        />;
    }
  };

  const getCurrentBreadcrumb = () => {
    const config = pageConfig[currentPage as keyof typeof pageConfig];
    return config?.breadcrumb || [{ label: 'Pool Service Manager' }];
  };

  return (
    <div className="h-screen bg-[var(--background)] flex flex-col">
      {/* Top Navigation Bar - Full Width */}
      <AliyunNavbar />
      
      {/* Main Content Area - Below Navbar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Fixed Width */}
        <AliyunSidebar 
          currentPage={currentPage} 
          onPageChange={handlePageChange}
        />
        
        {/* Right Content Area - Remaining Width */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AliyunBreadcrumb items={getCurrentBreadcrumb()} />
          <main className="flex-1 overflow-y-auto">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
}