import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Settings, 
  MoreHorizontal,
  ChevronDown,
  Grid,
  List,
  Calendar,
  Wrench,
  Camera,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';

// Mock data for pool equipment
const mockEquipment = [
  {
    id: 1,
    type: "Pool Pump",
    brand: "Hayward",
    model: "Super Pump VS",
    serialNumber: "SP3400VSP-001",
    installedDate: "2023-03-15",
    warrantyExpiry: "2025-03-15",
    poolName: "Main Pool",
    customerName: "Sarah Johnson",
    location: "15420 Maple Ridge Drive, Richmond Hill, ON",
    lastServiced: "2024-11-15",
    nextPM: "2024-12-15",
    status: "Active",
    photos: 3,
    docs: 2,
    powerCapacity: "1.5 HP",
    fuelSupply: "Electric",
    tags: ["Variable-Speed", "Energy-Saving"],
    spareParts: ["Impeller", "O-Ring Kit"],
    maintenanceFreq: "Monthly"
  },
  {
    id: 2,
    type: "Pool Heater",
    brand: "Jandy",
    model: "JXi 400N",
    serialNumber: "JXI400N-2024-089",
    installedDate: "2024-05-20",
    warrantyExpiry: "2025-01-20",
    poolName: "Spa",
    customerName: "Michael Chen",
    location: "8934 Lakeshore Boulevard, Toronto, ON",
    lastServiced: "2024-10-20",
    nextPM: "2024-12-05",
    status: "Active",
    photos: 5,
    docs: 4,
    powerCapacity: "400k BTU",
    fuelSupply: "Gas",
    tags: ["High-Efficiency"],
    spareParts: ["Heat Exchanger", "Igniter"],
    maintenanceFreq: "Quarterly"
  },
  {
    id: 3,
    type: "Filter System",
    brand: "Pentair",
    model: "Clean & Clear Plus",
    serialNumber: "CC-PLUS-520-A",
    installedDate: "2023-08-10",
    warrantyExpiry: "2024-08-10",
    poolName: "Main Pool",
    customerName: "Thompson Family Pool",
    location: "22156 Forest Hill Crescent, Mississauga, ON",
    lastServiced: "2024-11-20",
    nextPM: "2024-12-20",
    status: "Needs Inspection",
    photos: 2,
    docs: 3,
    powerCapacity: "520 sq ft",
    fuelSupply: "None",
    tags: ["Cartridge Filter"],
    spareParts: ["Filter Cartridges", "Pressure Gauge"],
    maintenanceFreq: "Bi-weekly"
  },
  {
    id: 4,
    type: "Salt Chlorinator",
    brand: "AquaRite",
    model: "T-15",
    serialNumber: "AR-T15-2024-156",
    installedDate: "2024-01-15",
    warrantyExpiry: "2027-01-15",
    poolName: "Main Pool",
    customerName: "David Martinez",
    location: "5678 Oak Valley Road, Burlington, ON",
    lastServiced: "2024-11-10",
    nextPM: "2024-12-02",
    status: "Active",
    photos: 1,
    docs: 1,
    powerCapacity: "40k Gallons",
    fuelSupply: "Salt",
    tags: ["Self-Cleaning", "Digital Display"],
    spareParts: ["Cell", "Flow Switch"],
    maintenanceFreq: "Seasonal"
  },
  {
    id: 5,
    type: "Pool Cleaner",
    brand: "Dolphin",
    model: "Nautilus CC Plus",
    serialNumber: "DL-NAUT-CC-078",
    installedDate: "2023-06-01",
    warrantyExpiry: "2025-06-01",
    poolName: "Main Pool",
    customerName: "Lisa Wong",
    location: "11234 Cedar Springs Avenue, Oakville, ON",
    lastServiced: "2024-11-25",
    nextPM: "2024-12-25",
    status: "Active",
    photos: 4,
    docs: 2,
    powerCapacity: "180W",
    fuelSupply: "Electric",
    tags: ["Robotic", "Smart Navigation"],
    spareParts: ["Filter Bags", "Brushes"],
    maintenanceFreq: "Monthly"
  },
  {
    id: 6,
    type: "Control System",
    brand: "Jandy",
    model: "AquaLink RS OneTouch",
    serialNumber: "AL-RS-OT-2024-034",
    installedDate: "2024-07-12",
    warrantyExpiry: "2024-12-12",
    poolName: "Commercial Pool",
    customerName: "Riverside Community Center",
    location: "9876 Community Drive, Brampton, ON",
    lastServiced: "2024-09-12",
    nextPM: "2024-12-01",
    status: "Retired",
    photos: 0,
    docs: 5,
    powerCapacity: "24V",
    fuelSupply: "Electric",
    tags: ["Wireless", "Smartphone Control"],
    spareParts: ["Control Panel", "Sensors"],
    maintenanceFreq: "Annual"
  }
];

export function PoolsEquipment() {
  const [selectedEquipment, setSelectedEquipment] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedItem, setSelectedItem] = useState<typeof mockEquipment[0] | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEquipment(mockEquipment.map(e => e.id));
    } else {
      setSelectedEquipment([]);
    }
  };

  const handleSelectEquipment = (equipmentId: number, checked: boolean) => {
    if (checked) {
      setSelectedEquipment([...selectedEquipment, equipmentId]);
    } else {
      setSelectedEquipment(selectedEquipment.filter(id => id !== equipmentId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return { dot: 'bg-green-500', badge: 'bg-green-100 text-green-800 border-green-200' };
      case 'Needs Inspection':
        return { dot: 'bg-orange-500', badge: 'bg-orange-100 text-orange-800 border-orange-200' };
      case 'Retired':
        return { dot: 'bg-gray-500', badge: 'bg-gray-100 text-gray-800 border-gray-200' };
      default:
        return { dot: 'bg-gray-500', badge: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  const isWarrantyExpiring = (warrantyDate: string) => {
    const expiry = new Date(warrantyDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0;
  };

  const isPMDue = (pmDate: string) => {
    const pm = new Date(pmDate);
    const today = new Date();
    const diffTime = pm.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  const filteredEquipment = mockEquipment.filter(equipment => {
    const matchesSearch = 
      equipment.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.poolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === "all" || equipment.type === filterType;
    const matchesStatus = filterStatus === "all" || equipment.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleRowClick = (equipment: typeof mockEquipment[0]) => {
    setSelectedItem(equipment);
    setShowDetails(true);
  };

  const EquipmentDetailDrawer = () => (
    <Sheet open={showDetails} onOpenChange={setShowDetails}>
      <SheetContent className="w-[500px] sm:w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Equipment Details
          </SheetTitle>
          <SheetDescription>
            Comprehensive information and maintenance history
          </SheetDescription>
        </SheetHeader>
        
        {selectedItem && (
          <div className="mt-6 space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Basic Information</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="ml-2 font-medium">{selectedItem.type}</span>
                </div>
                <div>
                  <span className="text-gray-600">Brand:</span>
                  <span className="ml-2 font-medium">{selectedItem.brand}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Model:</span>
                  <span className="ml-2 font-medium">{selectedItem.model}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Serial Number:</span>
                  <span className="ml-2 font-mono text-xs bg-gray-200 px-2 py-1 rounded">
                    {selectedItem.serialNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Status & Dates */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Status & Dates</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedItem.status).dot}`}></div>
                    <Badge className={getStatusColor(selectedItem.status).badge}>
                      {selectedItem.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Installed:</span>
                  <span className="font-medium">{selectedItem.installedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Warranty Expires:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedItem.warrantyExpiry}</span>
                    {isWarrantyExpiring(selectedItem.warrantyExpiry) && (
                      <Badge className="bg-orange-100 text-orange-800 text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Expiring Soon
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Serviced:</span>
                  <span className="font-medium">{selectedItem.lastServiced}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next PM:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedItem.nextPM}</span>
                    {isPMDue(selectedItem.nextPM) && (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Location</h3>
              <div className="text-sm space-y-2">
                <div>
                  <span className="text-gray-600">Customer:</span>
                  <span className="ml-2 font-medium">{selectedItem.customerName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Pool:</span>
                  <span className="ml-2 font-medium">{selectedItem.poolName}</span>
                </div>
                <div>
                  <span className="text-gray-600">Address:</span>
                  <p className="mt-1 text-gray-700">{selectedItem.location}</p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Specifications</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Power/Capacity:</span>
                  <span className="ml-2 font-medium">{selectedItem.powerCapacity}</span>
                </div>
                <div>
                  <span className="text-gray-600">Fuel/Supply:</span>
                  <span className="ml-2 font-medium">{selectedItem.fuelSupply}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Maintenance Frequency:</span>
                  <span className="ml-2 font-medium">{selectedItem.maintenanceFreq}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedItem.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Spare Parts */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Common Spare Parts</h3>
              <div className="space-y-2">
                {selectedItem.spareParts.map((part, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{part}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photos & Documents */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Photos & Documents</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Camera className="w-4 h-4 text-gray-500" />
                  <span>{selectedItem.photos} Photos</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span>{selectedItem.docs} Documents</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button className="flex-1" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Equipment
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule PM
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
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Pools Equipment</h1>
          <p className="text-sm text-gray-600">
            Manage and track pool equipment across all customer locations
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Equipment
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Search */}
          <div className="relative flex-1 min-w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by brand, model, serial, customer, pool, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4"
            />
          </div>

          {/* Filters */}
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Equipment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Pool Pump">Pool Pump</SelectItem>
              <SelectItem value="Pool Heater">Pool Heater</SelectItem>
              <SelectItem value="Filter System">Filter System</SelectItem>
              <SelectItem value="Salt Chlorinator">Salt Chlorinator</SelectItem>
              <SelectItem value="Pool Cleaner">Pool Cleaner</SelectItem>
              <SelectItem value="Control System">Control System</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Needs Inspection">Needs Inspection</SelectItem>
              <SelectItem value="Retired">Retired</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex items-center border border-gray-300 rounded-lg">
            <Button 
              variant={viewMode === 'table' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('table')}
              className="rounded-r-none"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-l-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Columns
          </Button>
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Quick filters:</span>
          <Button variant="outline" size="sm" className="h-7">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Warranty Expiring
          </Button>
          <Button variant="outline" size="sm" className="h-7">
            <Clock className="w-3 h-3 mr-1" />
            PM Due
          </Button>
          <Button variant="outline" size="sm" className="h-7">
            <Wrench className="w-3 h-3 mr-1" />
            Needs Service
          </Button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium text-gray-900">
            Equipment List 
            <span className="text-gray-500 font-normal ml-2">({filteredEquipment.length} items)</span>
          </h2>
          {selectedEquipment.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">
                {selectedEquipment.length} selected
              </span>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Change Status
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Create PM Orders
              </Button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 w-12">
                  <Checkbox 
                    checked={selectedEquipment.length === filteredEquipment.length}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Equipment Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Brand / Model</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Serial #</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Installed / Warranty</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Pool / Customer</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Last Service / Next PM</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Photos / Docs</th>
                <th className="text-left py-3 px-4 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.map((equipment) => (
                <tr 
                  key={equipment.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(equipment)}
                >
                  <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                    <Checkbox 
                      checked={selectedEquipment.includes(equipment.id)}
                      onCheckedChange={(checked) => handleSelectEquipment(equipment.id, checked as boolean)}
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-900 text-sm">{equipment.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 text-sm">{equipment.brand}</span>
                      <span className="text-xs text-gray-500">{equipment.model}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                      {equipment.serialNumber}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col text-sm">
                      <span className="text-gray-700">{equipment.installedDate}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500 text-xs">{equipment.warrantyExpiry}</span>
                        {isWarrantyExpiring(equipment.warrantyExpiry) && (
                          <Badge className="bg-orange-100 text-orange-800 text-xs px-1 py-0.5">
                            Expiring
                          </Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 text-sm">{equipment.poolName}</span>
                      <span className="text-xs text-gray-500">{equipment.customerName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col text-sm">
                      <span className="text-gray-700">{equipment.lastServiced}</span>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-500 text-xs">{equipment.nextPM}</span>
                        {isPMDue(equipment.nextPM) && (
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(equipment.status).dot}`}></div>
                      <Badge className={`text-xs ${getStatusColor(equipment.status).badge}`}>
                        {equipment.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        <span>{equipment.photos}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>{equipment.docs}</span>
                      </div>
                    </div>
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
        {filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No equipment found matching your search criteria.</p>
            <Button className="mt-4" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {/* Equipment Details Drawer */}
      <EquipmentDetailDrawer />
    </div>
  );
}