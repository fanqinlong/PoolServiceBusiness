import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  ChevronDown,
  TrendingUp,
  Filter,
  MapPin,
  Calendar,
  Droplets
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';

// Mock data for pool service customers
const mockCustomers = [
  {
    id: 1,
    name: "Sarah Johnson",
    address: "15420 Maple Ridge Drive, Richmond Hill, ON L4C 5K8",
    tags: ["Premium Service", "Pool Opening"],
    status: "Active",
    lastActivity: "2 hours ago",
    pools: 1,
    serviceType: "Weekly Maintenance"
  },
  {
    id: 2,
    name: "Michael Chen",
    address: "8934 Lakeshore Boulevard, Toronto, ON M8V 1Y2",
    tags: ["Equipment Repair"],
    status: "Active", 
    lastActivity: "Yesterday",
    pools: 2,
    serviceType: "Bi-weekly Cleaning"
  },
  {
    id: 3,
    name: "Thompson Family Pool",
    address: "22156 Forest Hill Crescent, Mississauga, ON L5M 6R4",
    tags: ["Commercial", "Spa Service"],
    status: "Active",
    lastActivity: "3 days ago",
    pools: 1,
    serviceType: "Commercial Maintenance"
  },
  {
    id: 4,
    name: "David Martinez",
    address: "5678 Oak Valley Road, Burlington, ON L7P 3K9",
    tags: ["Seasonal"],
    status: "Active",
    lastActivity: "1 week ago",
    pools: 1,
    serviceType: "Pool Closing"
  },
  {
    id: 5,
    name: "Lisa Wong",
    address: "11234 Cedar Springs Avenue, Oakville, ON L6H 2M3",
    tags: ["Water Testing", "Chemical Balance"],
    status: "Active", 
    lastActivity: "4 days ago",
    pools: 1,
    serviceType: "Water Quality Management"
  },
  {
    id: 6,
    name: "Riverside Community Center",
    address: "9876 Community Drive, Brampton, ON L6Y 4P8",
    tags: ["Commercial", "Emergency Service"],
    status: "Lead",
    lastActivity: "2 weeks ago",
    pools: 3,
    serviceType: "Consultation"
  }
];

export function CustomerList() {
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Leads and Active");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(mockCustomers.map(c => c.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleSelectCustomer = (customerId: number, checked: boolean) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, customerId]);
    } else {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Lead':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTagColor = (tag: string) => {
    const colors = [
      'bg-purple-100 text-purple-800 border-purple-200',
      'bg-orange-100 text-orange-800 border-orange-200',
      'bg-pink-100 text-pink-800 border-pink-200',
      'bg-indigo-100 text-indigo-800 border-indigo-200',
      'bg-teal-100 text-teal-800 border-teal-200'
    ];
    return colors[Math.abs(tag.length) % colors.length];
  };

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 bg-[var(--content-bg)] min-h-full">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Customers</h1>
        </div>
        <div className="flex gap-3">
          <Button 
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Customer
          </Button>
          <Button 
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium"
          >
            <MoreHorizontal className="w-4 h-4 mr-2" />
            More Actions
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* New Leads Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">New leads</h3>
            <Droplets className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-xs text-gray-500 mb-3">Past 30 days</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-gray-900">12</span>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              150%
            </div>
          </div>
        </div>

        {/* New Customers Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">New customers</h3>
            <MapPin className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-xs text-gray-500 mb-3">Past 30 days</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-gray-900">8</span>
            <div className="flex items-center text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-1" />
              300%
            </div>
          </div>
        </div>

        {/* Total Customers Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total new customers</h3>
            <Calendar className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-xs text-gray-500 mb-3">Year to date</p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-gray-900">24</span>
          </div>
        </div>
      </div>

      {/* Filters and Search Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-1">
            Filtered customers 
            <span className="text-gray-500 font-normal ml-2">({filteredCustomers.length} results)</span>
          </h2>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {/* Tags Filter */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-dashed border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <Plus className="w-4 h-4 mr-1" />
                Tags
              </Button>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-gray-100 border-gray-300 text-gray-700"
              >
                <Filter className="w-4 h-4 mr-2" />
                Status
                <span className="ml-2 px-2 py-1 bg-white rounded text-xs border">
                  {selectedStatus}
                </span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search filtered customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 h-9 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 w-12">
                  <Checkbox 
                    checked={selectedCustomers.length === mockCustomers.length}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Name</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Address</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Tags</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  Last 
                  <ChevronDown className="w-4 h-4 ml-1 inline" />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <Checkbox 
                      checked={selectedCustomers.includes(customer.id)}
                      onCheckedChange={(checked) => handleSelectCustomer(customer.id, checked as boolean)}
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 text-sm">{customer.name}</span>
                      <span className="text-xs text-gray-500">{customer.serviceType}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-start">
                      <span className="text-sm text-gray-700 max-w-xs truncate">
                        {customer.address}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.map((tag, index) => (
                        <Badge 
                          key={index}
                          variant="outline"
                          className={`text-xs px-2 py-1 border rounded ${getTagColor(tag)}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <Badge 
                        variant="outline"
                        className={`text-xs px-2 py-1 border rounded ${getStatusColor(customer.status)}`}
                      >
                        {customer.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {customer.lastActivity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No customers found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}