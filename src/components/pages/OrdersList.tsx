import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  Map,
  Plus,
  MoreHorizontal,
  ChevronDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  User,
  Eye,
  Edit,
  UserCheck,
  Receipt,
  Camera,
  FileText,
  Wrench,
  Home,
  Droplets,
  Zap,
  Settings,
  DollarSign,
  MapPin
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Checkbox } from '../ui/checkbox';

// Mock data for service orders
const mockServiceOrders = [
  {
    id: 1,
    orderNumber: "SO-2024-0428",
    customer: "Sarah Johnson",
    address: "15420 Maple Ridge Drive, Richmond Hill, ON L4C 5K8",
    serviceType: "Weekly Maintenance",
    timeWindow: "AM",
    scheduledDate: "2024-11-29",
    technician: {
      id: 1,
      name: "Mike Rodriguez",
      avatar: null,
      initials: "MR"
    },
    status: "Scheduled",
    estimatedHours: 2.5,
    estimatedAmount: 185.00,
    source: "Web",
    priority: "Normal",
    notes: "Regular weekly maintenance. Customer prefers morning appointments.",
    checklist: [
      { item: "Test water chemistry", completed: false },
      { item: "Clean skimmer baskets", completed: false },
      { item: "Brush walls and floor", completed: false },
      { item: "Vacuum debris", completed: false },
      { item: "Check equipment operation", completed: false }
    ],
    materials: [
      { name: "Liquid Chlorine", quantity: "2L", cost: 15.50 },
      { name: "pH Down", quantity: "0.5L", cost: 8.25 }
    ],
    photos: 0,
    lastUpdate: "2024-11-28 14:30"
  },
  {
    id: 2,
    orderNumber: "SO-2024-0429",
    customer: "Michael Chen",
    address: "8934 Lakeshore Boulevard, Toronto, ON M8V 1Y2",
    serviceType: "Pool Opening",
    timeWindow: "All-day",
    scheduledDate: "2024-11-29",
    technician: {
      id: 2,
      name: "Jennifer Park",
      avatar: null,
      initials: "JP"
    },
    status: "In Progress",
    estimatedHours: 4.0,
    estimatedAmount: 420.00,
    source: "CSR",
    priority: "High",
    notes: "Season opening service. Pool has been closed since October.",
    checklist: [
      { item: "Remove pool cover", completed: true },
      { item: "Connect equipment", completed: true },
      { item: "Fill pool to proper level", completed: false },
      { item: "Start filtration system", completed: false },
      { item: "Shock treatment", completed: false },
      { item: "Water testing", completed: false }
    ],
    materials: [
      { name: "Pool Shock", quantity: "4kg", cost: 85.00 },
      { name: "Algaecide", quantity: "2L", cost: 45.50 },
      { name: "Start-up Kit", quantity: "1", cost: 65.00 }
    ],
    photos: 3,
    lastUpdate: "2024-11-29 10:15"
  },
  {
    id: 3,
    orderNumber: "SO-2024-0425",
    customer: "Thompson Family Pool",
    address: "22156 Forest Hill Crescent, Mississauga, ON L5M 6R4",
    serviceType: "Equipment Repair",
    timeWindow: "PM",
    scheduledDate: "2024-11-27",
    technician: {
      id: 3,
      name: "David Kim",
      avatar: null,
      initials: "DK"
    },
    status: "Overdue",
    estimatedHours: 3.0,
    estimatedAmount: 285.00,
    source: "Portal",
    priority: "Urgent",
    notes: "Pool pump motor failure. Customer reports loud noise before shutdown.",
    checklist: [
      { item: "Diagnose pump issue", completed: true },
      { item: "Order replacement motor", completed: true },
      { item: "Replace motor", completed: false },
      { item: "Test system operation", completed: false },
      { item: "Check for other issues", completed: false }
    ],
    materials: [
      { name: "Pool Pump Motor", quantity: "1", cost: 185.00 },
      { name: "Motor Gaskets", quantity: "1", cost: 25.50 }
    ],
    photos: 2,
    lastUpdate: "2024-11-27 16:45"
  },
  {
    id: 4,
    orderNumber: "SO-2024-0430",
    customer: "David Martinez",
    address: "5678 Oak Valley Road, Burlington, ON L7P 3K9",
    serviceType: "Pool Closing",
    timeWindow: "AM",
    scheduledDate: "2024-12-05",
    technician: null,
    status: "Unscheduled",
    estimatedHours: 3.5,
    estimatedAmount: 325.00,
    source: "API",
    priority: "Normal",
    notes: "End of season closing service. Customer has winterization package.",
    checklist: [
      { item: "Balance water chemistry", completed: false },
      { item: "Clean pool thoroughly", completed: false },
      { item: "Lower water level", completed: false },
      { item: "Winterize equipment", completed: false },
      { item: "Install pool cover", completed: false }
    ],
    materials: [
      { name: "Winterizing Chemicals", quantity: "1 kit", cost: 75.00 },
      { name: "Antifreeze", quantity: "4L", cost: 32.00 }
    ],
    photos: 0,
    lastUpdate: "2024-11-28 09:22"
  },
  {
    id: 5,
    orderNumber: "SO-2024-0427",
    customer: "Lisa Wong",
    address: "11234 Cedar Springs Avenue, Oakville, ON L6H 2M3",
    serviceType: "Installation",
    timeWindow: "All-day",
    scheduledDate: "2024-11-28",
    technician: {
      id: 4,
      name: "Carlos Mendez",
      avatar: null,
      initials: "CM"
    },
    status: "Completed",
    estimatedHours: 6.0,
    estimatedAmount: 850.00,
    source: "Web",
    priority: "Normal",
    notes: "New salt chlorinator installation. Includes training for customer.",
    checklist: [
      { item: "Install chlorinator unit", completed: true },
      { item: "Connect electrical", completed: true },
      { item: "Configure settings", completed: true },
      { item: "Test operation", completed: true },
      { item: "Customer training", completed: true }
    ],
    materials: [
      { name: "Salt Chlorinator", quantity: "1", cost: 450.00 },
      { name: "Installation Kit", quantity: "1", cost: 85.00 },
      { name: "Pool Salt", quantity: "200kg", cost: 120.00 }
    ],
    photos: 5,
    lastUpdate: "2024-11-28 16:30"
  }
];

export function OrdersList() {
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterServiceType, setFilterServiceType] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof mockServiceOrders[0] | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [activeStatusFilter, setActiveStatusFilter] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return { dot: 'bg-blue-500', badge: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'In Progress':
        return { dot: 'bg-yellow-500', badge: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
      case 'Completed':
        return { dot: 'bg-green-500', badge: 'bg-green-100 text-green-800 border-green-200' };
      case 'Overdue':
        return { dot: 'bg-red-500', badge: 'bg-red-100 text-red-800 border-red-200' };
      case 'Unscheduled':
        return { dot: 'bg-gray-400', badge: 'bg-gray-100 text-gray-800 border-gray-200' };
      default:
        return { dot: 'bg-gray-400', badge: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'text-red-600 bg-red-50';
      case 'High':
        return 'text-orange-600 bg-orange-50';
      case 'Normal':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getServiceTypeIcon = (type: string) => {
    switch (type) {
      case 'Pool Opening':
      case 'Pool Closing':
        return <Home className="w-4 h-4" />;
      case 'Weekly Maintenance':
      case 'Bi-weekly Maintenance':
        return <Wrench className="w-4 h-4" />;
      case 'Equipment Repair':
        return <Settings className="w-4 h-4" />;
      case 'Installation':
        return <Zap className="w-4 h-4" />;
      default:
        return <Droplets className="w-4 h-4" />;
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map(o => o.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId: number, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    }
  };

  const filteredOrders = mockServiceOrders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    const matchesServiceType = filterServiceType === "all" || order.serviceType === filterServiceType;
    const matchesStatusFilter = !activeStatusFilter || order.status === activeStatusFilter;
    
    return matchesSearch && matchesStatus && matchesServiceType && matchesStatusFilter;
  });

  const handleRowClick = (order: typeof mockServiceOrders[0]) => {
    setSelectedOrder(order);
    setShowDetails(true);
  };

  const getStatusCounts = () => {
    return {
      unscheduled: mockServiceOrders.filter(o => o.status === 'Unscheduled').length,
      overdue: mockServiceOrders.filter(o => o.status === 'Overdue').length,
      today: mockServiceOrders.filter(o => o.scheduledDate === '2024-11-29').length,
      completed: mockServiceOrders.filter(o => o.status === 'Completed').length,
    };
  };

  const statusCounts = getStatusCounts();

  const OrderDetailDrawer = () => (
    <Sheet open={showDetails} onOpenChange={setShowDetails}>
      <SheetContent className="w-[600px] sm:w-[700px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Order Details - {selectedOrder?.orderNumber}
          </SheetTitle>
          <SheetDescription>
            Complete service order information and management
          </SheetDescription>
        </SheetHeader>
        
        {selectedOrder && (
          <div className="mt-6 space-y-6">
            {/* Order Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Order Information</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Order #:</span>
                  <span className="ml-2 font-mono font-medium">{selectedOrder.orderNumber}</span>
                </div>
                <div>
                  <span className="text-gray-600">Service Type:</span>
                  <div className="ml-2 flex items-center gap-1">
                    {getServiceTypeIcon(selectedOrder.serviceType)}
                    <span className="font-medium">{selectedOrder.serviceType}</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Customer:</span>
                  <span className="ml-2 font-medium">{selectedOrder.customer}</span>
                </div>
                <div>
                  <span className="text-gray-600">Priority:</span>
                  <Badge className={`ml-2 text-xs ${getPriorityColor(selectedOrder.priority)}`}>
                    {selectedOrder.priority}
                  </Badge>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Address:</span>
                  <p className="mt-1 text-sm">{selectedOrder.address}</p>
                </div>
              </div>
            </div>

            {/* Schedule & Technician */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Schedule & Assignment</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Status:</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedOrder.status).dot}`}></div>
                    <Badge className={`text-xs ${getStatusColor(selectedOrder.status).badge}`}>
                      {selectedOrder.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Scheduled Date:</span>
                  <span className="font-medium text-sm">{selectedOrder.scheduledDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Time Window:</span>
                  <Badge variant="outline" className="text-xs">
                    {selectedOrder.timeWindow}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Technician:</span>
                  {selectedOrder.technician ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-800">
                          {selectedOrder.technician.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-sm">{selectedOrder.technician.name}</span>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm italic">Unassigned</span>
                  )}
                </div>
              </div>
            </div>

            {/* Service Checklist */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Service Checklist</h3>
              <div className="space-y-2">
                {selectedOrder.checklist.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Checkbox 
                      checked={item.completed}
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                      {item.item}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progress:</span>
                  <span className="font-medium">
                    {selectedOrder.checklist.filter(i => i.completed).length} / {selectedOrder.checklist.length} completed
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ 
                      width: `${(selectedOrder.checklist.filter(i => i.completed).length / selectedOrder.checklist.length) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Materials & Costs */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Materials & Costs</h3>
              <div className="space-y-2 mb-4">
                {selectedOrder.materials.map((material, index) => (
                  <div key={index} className="flex justify-between items-center bg-white rounded p-2 border">
                    <div>
                      <span className="font-medium text-sm">{material.name}</span>
                      <span className="text-gray-500 text-xs ml-2">({material.quantity})</span>
                    </div>
                    <span className="font-medium text-sm">${material.cost.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Materials Total:</span>
                  <span className="font-medium">
                    ${selectedOrder.materials.reduce((sum, m) => sum + m.cost, 0).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Estimated Hours:</span>
                  <span className="font-medium">{selectedOrder.estimatedHours}h</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total Estimated:</span>
                  <span>${selectedOrder.estimatedAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Notes & Attachments */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Notes & Attachments</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Service Notes:</label>
                  <p className="mt-1 text-sm text-gray-600 bg-white p-3 rounded border">
                    {selectedOrder.notes}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Camera className="w-4 h-4 text-gray-500" />
                    <span>{selectedOrder.photos} Photos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span>Source: {selectedOrder.source}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Order
              </Button>
              <Button variant="outline" size="sm">
                <UserCheck className="w-4 h-4 mr-2" />
                Reassign
              </Button>
              <Button variant="outline" size="sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete
              </Button>
              <Button variant="outline" size="sm">
                <Receipt className="w-4 h-4 mr-2" />
                Invoice
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="p-6 bg-[var(--content-bg)] min-h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Service Orders</h1>
          <p className="text-sm text-gray-600">
            Manage and track pool service orders and technician assignments
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Order
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Status Chips */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm font-medium text-gray-700">Quick filters:</span>
        <Button 
          variant={activeStatusFilter === 'Unscheduled' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveStatusFilter(activeStatusFilter === 'Unscheduled' ? null : 'Unscheduled')}
          className="h-8"
        >
          <Clock className="w-3 h-3 mr-1" />
          Unscheduled ({statusCounts.unscheduled})
        </Button>
        <Button 
          variant={activeStatusFilter === 'Overdue' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveStatusFilter(activeStatusFilter === 'Overdue' ? null : 'Overdue')}
          className="h-8"
        >
          <AlertTriangle className="w-3 h-3 mr-1" />
          Overdue ({statusCounts.overdue})
        </Button>
        <Button 
          variant={activeStatusFilter === null && filterStatus === "all" ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveStatusFilter(null)}
          className="h-8"
        >
          <Calendar className="w-3 h-3 mr-1" />
          Today ({statusCounts.today})
        </Button>
        <Button 
          variant={activeStatusFilter === 'Completed' ? 'default' : 'outline'} 
          size="sm"
          onClick={() => setActiveStatusFilter(activeStatusFilter === 'Completed' ? null : 'Completed')}
          className="h-8"
        >
          <CheckCircle className="w-3 h-3 mr-1" />
          Completed ({statusCounts.completed})
        </Button>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Search */}
          <div className="relative flex-1 min-w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by customer, address, or order number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4"
            />
          </div>

          {/* Filters */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
              <SelectItem value="Unscheduled">Unscheduled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterServiceType} onValueChange={setFilterServiceType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Service Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Weekly Maintenance">Maintenance</SelectItem>
              <SelectItem value="Pool Opening">Opening</SelectItem>
              <SelectItem value="Pool Closing">Closing</SelectItem>
              <SelectItem value="Equipment Repair">Repair</SelectItem>
              <SelectItem value="Installation">Installation</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {selectedOrders.length > 0 && (
          <div className="flex items-center gap-3 text-sm bg-blue-50 border border-blue-200 rounded-lg p-3">
            <span className="font-medium text-blue-800">
              {selectedOrders.length} orders selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <UserCheck className="w-4 h-4 mr-1" />
                Assign Tech
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-1" />
                Reschedule
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export Selected
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium text-gray-900">
            Service Orders 
            <span className="text-gray-500 font-normal ml-2">({filteredOrders.length} orders)</span>
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Map className="w-4 h-4 mr-2" />
              Map View
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 w-12">
                  <Checkbox 
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Order #</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Customer / Address</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Service Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Time Window</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Technician</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Est. Hours / Amount</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Source</th>
                <th className="text-left py-3 px-4 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(order)}
                >
                  <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                    <Checkbox 
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-mono font-medium text-sm text-blue-600">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs text-gray-500">{order.scheduledDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col max-w-xs">
                      <span className="font-medium text-gray-900 text-sm">{order.customer}</span>
                      <span className="text-xs text-gray-500 truncate">{order.address}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getServiceTypeIcon(order.serviceType)}
                      <span className="text-sm text-gray-700">{order.serviceType}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="outline" className="text-xs">
                      {order.timeWindow}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    {order.technician ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="w-7 h-7">
                          <AvatarFallback className="text-xs bg-blue-100 text-blue-800">
                            {order.technician.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-700">{order.technician.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(order.status).dot}`}></div>
                      <Badge className={`text-xs ${getStatusColor(order.status).badge}`}>
                        {order.status}
                      </Badge>
                      {order.priority === 'Urgent' && (
                        <AlertTriangle className="w-3 h-3 text-red-500 ml-1" />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col text-sm">
                      <span className="text-gray-700">{order.estimatedHours}h</span>
                      <span className="font-medium text-green-600">${order.estimatedAmount.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="outline" className="text-xs">
                      {order.source}
                    </Badge>
                  </td>
                  <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No service orders found matching your criteria.</p>
            <Button className="mt-4" onClick={() => setSearchQuery("")}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Order Details Drawer */}
      <OrderDetailDrawer />
    </div>
  );
}