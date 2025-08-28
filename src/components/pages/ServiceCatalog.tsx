import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Upload,
  Plus,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Grid,
  List,
  Eye,
  Edit,
  Copy,
  Trash2,
  Settings,
  DollarSign,
  Clock,
  Package,
  Wrench,
  Home,
  Droplets,
  Zap,
  FlaskConical,
  Camera,
  FileText,
  Tag,
  Users,
  MapPin,
  History,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import { Checkbox } from '../ui/checkbox';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

// Mock category data
const categoryTree = [
  {
    id: 'maintenance',
    name: 'Pool Maintenance',
    icon: <Wrench className="w-4 h-4" />,
    expanded: true,
    children: [
      { id: 'weekly', name: 'Weekly Service', count: 12 },
      { id: 'biweekly', name: 'Bi-weekly Service', count: 8 },
      { id: 'monthly', name: 'Monthly Service', count: 6 },
      { id: 'onetime', name: 'One-time Cleaning', count: 4 }
    ]
  },
  {
    id: 'seasonal',
    name: 'Seasonal Services',
    icon: <Home className="w-4 h-4" />,
    expanded: true,
    children: [
      { id: 'opening', name: 'Pool Opening', count: 3 },
      { id: 'closing', name: 'Pool Closing', count: 3 },
      { id: 'winterization', name: 'Winterization', count: 2 }
    ]
  },
  {
    id: 'repair',
    name: 'Repair & Installation',
    icon: <Settings className="w-4 h-4" />,
    expanded: false,
    children: [
      { id: 'equipment', name: 'Equipment Repair', count: 15 },
      { id: 'plumbing', name: 'Plumbing', count: 8 },
      { id: 'electrical', name: 'Electrical', count: 6 },
      { id: 'installation', name: 'New Installation', count: 12 }
    ]
  },
  {
    id: 'chemicals',
    name: 'Chemicals & Supplies',
    icon: <FlaskConical className="w-4 h-4" />,
    expanded: false,
    children: [
      { id: 'chlorine', name: 'Chlorine Products', count: 18 },
      { id: 'ph-control', name: 'pH Control', count: 12 },
      { id: 'algaecides', name: 'Algaecides', count: 8 },
      { id: 'shock', name: 'Shock Treatments', count: 10 }
    ]
  },
  {
    id: 'equipment',
    name: 'Equipment & Parts',
    icon: <Package className="w-4 h-4" />,
    expanded: false,
    children: [
      { id: 'pumps', name: 'Pumps', count: 25 },
      { id: 'filters', name: 'Filters', count: 20 },
      { id: 'heaters', name: 'Heaters', count: 15 },
      { id: 'cleaners', name: 'Pool Cleaners', count: 12 }
    ]
  },
  {
    id: 'bundles',
    name: 'Service Bundles',
    icon: <Zap className="w-4 h-4" />,
    expanded: false,
    children: [
      { id: 'starter', name: 'Starter Packages', count: 5 },
      { id: 'premium', name: 'Premium Packages', count: 3 },
      { id: 'commercial', name: 'Commercial Packages', count: 4 }
    ]
  }
];

// Mock catalog data
const mockCatalogItems = [
  {
    id: 1,
    name: "Weekly Pool Maintenance",
    type: "Service",
    category: "weekly",
    description: "Comprehensive weekly pool maintenance including testing, cleaning, and chemical balancing.",
    price: 125.00,
    priceInclTax: 141.25,
    unit: "per visit",
    defaultLabor: "2.5 hours",
    cost: 85.00,
    margin: 32,
    tags: ["Popular", "Recurring"],
    status: "Published",
    lastUpdatedBy: "Sarah Johnson",
    lastUpdatedAt: "2024-11-28 14:30",
    images: 3,
    files: 2,
    channelVisibility: ["Web", "Portal", "Mobile"],
    upsellItems: ["Pool Shock Treatment", "Equipment Inspection"],
    crossSellItems: ["Chemical Testing Kit", "Pool Cover"],
    linkedMaterials: [
      { name: "Liquid Chlorine", quantity: "2L", cost: 12.50 },
      { name: "pH Test Kit", quantity: "1", cost: 8.00 }
    ],
    pricingOverrides: [
      { region: "Toronto", tier: "Premium", price: 135.00 },
      { region: "Mississauga", tier: "Standard", price: 120.00 }
    ],
    configOptions: [
      { name: "Pool Size", options: ["Small (< 20k L)", "Medium (20-40k L)", "Large (> 40k L)"] },
      { name: "Frequency", options: ["Weekly", "Bi-weekly"] }
    ]
  },
  {
    id: 2,
    name: "Pool Opening Service",
    type: "Service",
    category: "opening",
    description: "Complete pool opening service including equipment startup, water balancing, and system inspection.",
    price: 450.00,
    priceInclTax: 508.50,
    unit: "per service",
    defaultLabor: "4-6 hours",
    cost: 280.00,
    margin: 38,
    tags: ["Seasonal", "High Value"],
    status: "Published",
    lastUpdatedBy: "Mike Rodriguez",
    lastUpdatedAt: "2024-11-27 16:45",
    images: 5,
    files: 3,
    channelVisibility: ["Web", "Portal"],
    upsellItems: ["Equipment Upgrade", "Pool Heater Service"],
    crossSellItems: ["Maintenance Plan", "Water Testing Kit"],
    linkedMaterials: [
      { name: "Start-up Chemical Kit", quantity: "1", cost: 85.00 },
      { name: "Pool Shock", quantity: "4kg", cost: 45.00 }
    ],
    pricingOverrides: [
      { region: "Burlington", tier: "Premium", price: 485.00 }
    ],
    configOptions: [
      { name: "Pool Type", options: ["Chlorine", "Salt Water", "Natural"] },
      { name: "Equipment Check", options: ["Basic", "Comprehensive"] }
    ]
  },
  {
    id: 3,
    name: "Liquid Chlorine - 20L",
    type: "Product",
    category: "chlorine",
    description: "Professional grade liquid chlorine for pool sanitization. 12.5% sodium hypochlorite solution.",
    price: 28.50,
    priceInclTax: 32.21,
    unit: "per container",
    defaultLabor: "0.25 hours",
    cost: 18.00,
    margin: 37,
    tags: ["Chemical", "Hazmat"],
    status: "Published",
    lastUpdatedBy: "Jennifer Park",
    lastUpdatedAt: "2024-11-26 10:15",
    images: 2,
    files: 4,
    channelVisibility: ["Portal", "CSR"],
    upsellItems: ["pH Down", "Test Strips"],
    crossSellItems: ["Chemical Feeder", "Safety Equipment"],
    linkedMaterials: [],
    pricingOverrides: [
      { region: "Toronto", tier: "Commercial", price: 25.50 }
    ],
    configOptions: [
      { name: "Concentration", options: ["10%", "12.5%", "15%"] },
      { name: "Container Size", options: ["20L", "50L", "200L"] }
    ]
  },
  {
    id: 4,
    name: "Premium Service Bundle",
    type: "Bundle",
    category: "premium",
    description: "Complete premium pool service package including weekly maintenance, equipment monitoring, and priority support.",
    price: 185.00,
    priceInclTax: 209.13,
    unit: "per visit",
    defaultLabor: "3.5 hours",
    cost: 125.00,
    margin: 32,
    tags: ["Premium", "Bundle", "Priority"],
    status: "Published",
    lastUpdatedBy: "David Kim",
    lastUpdatedAt: "2024-11-25 12:20",
    images: 4,
    files: 2,
    channelVisibility: ["Web", "Portal"],
    upsellItems: ["Emergency Service", "Equipment Warranty"],
    crossSellItems: ["Pool Automation", "Heating Service"],
    linkedMaterials: [
      { name: "Premium Chemical Kit", quantity: "1", cost: 35.00 },
      { name: "Equipment Inspection", quantity: "1", cost: 25.00 }
    ],
    pricingOverrides: [
      { region: "Oakville", tier: "VIP", price: 195.00 }
    ],
    configOptions: [
      { name: "Service Level", options: ["Standard Premium", "VIP Premium"] },
      { name: "Response Time", options: ["24 hours", "Same day", "2 hours"] }
    ]
  },
  {
    id: 5,
    name: "Pool Pump Motor - 1.5HP",
    type: "Product",
    category: "pumps",
    description: "High-efficiency variable speed pool pump motor. Energy Star certified with 3-year warranty.",
    price: 485.00,
    priceInclTax: 548.05,
    unit: "each",
    defaultLabor: "2-3 hours",
    cost: 320.00,
    margin: 34,
    tags: ["Equipment", "Energy Efficient", "Warranty"],
    status: "Published",
    lastUpdatedBy: "Carlos Mendez",
    lastUpdatedAt: "2024-11-24 09:45",
    images: 6,
    files: 5,
    channelVisibility: ["Web", "Portal", "CSR"],
    upsellItems: ["Installation Service", "Extended Warranty"],
    crossSellItems: ["Pump Timer", "Flow Meter"],
    linkedMaterials: [
      { name: "Installation Kit", quantity: "1", cost: 45.00 },
      { name: "Electrical Components", quantity: "1", cost: 65.00 }
    ],
    pricingOverrides: [
      { region: "Commercial", tier: "Contractor", price: 445.00 }
    ],
    configOptions: [
      { name: "Power", options: ["1HP", "1.5HP", "2HP"] },
      { name: "Speed Type", options: ["Single Speed", "Two Speed", "Variable Speed"] }
    ]
  }
];

export function ServiceCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [selectedItem, setSelectedItem] = useState<typeof mockCatalogItems[0] | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['maintenance', 'seasonal']);
  const [showTaxInclusive, setShowTaxInclusive] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Service':
        return <Wrench className="w-4 h-4 text-blue-500" />;
      case 'Product':
        return <Package className="w-4 h-4 text-green-500" />;
      case 'Bundle':
        return <Zap className="w-4 h-4 text-purple-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Unpublished':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredItems = mockCatalogItems.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    
    return matchesSearch && matchesType && matchesStatus && matchesCategory;
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  const handleRowClick = (item: typeof mockCatalogItems[0]) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  const CatalogDetailDrawer = () => (
    <Sheet open={showDetails} onOpenChange={setShowDetails}>
      <SheetContent className="w-[700px] sm:w-[800px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {selectedItem && getTypeIcon(selectedItem.type)}
            {selectedItem?.name}
          </SheetTitle>
          <SheetDescription>
            Complete catalog item management and configuration
          </SheetDescription>
        </SheetHeader>
        
        {selectedItem && (
          <div className="mt-6">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="channels">Channels</TabsTrigger>
                <TabsTrigger value="upsell">Upsell</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6 mt-6">
                {/* Basic Information */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-600">Type:</span>
                      <div className="ml-2 flex items-center gap-1">
                        {getTypeIcon(selectedItem.type)}
                        <span className="font-medium">{selectedItem.type}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <Badge className={`ml-2 text-xs ${getStatusColor(selectedItem.status)}`}>
                        {selectedItem.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-gray-600">Default Labor:</span>
                      <span className="ml-2 font-medium">{selectedItem.defaultLabor}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Unit:</span>
                      <span className="ml-2 font-medium">{selectedItem.unit}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Description:</span>
                      <p className="mt-1 text-gray-700">{selectedItem.description}</p>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Configuration Options */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Configuration Options</h3>
                  <div className="space-y-3">
                    {selectedItem.configOptions.map((config, index) => (
                      <div key={index}>
                        <label className="text-sm font-medium text-gray-700">{config.name}:</label>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {config.options.map((option, optIndex) => (
                            <Badge key={optIndex} variant="outline" className="text-xs">
                              {option}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Media */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Media & Documents</h3>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Camera className="w-4 h-4 text-gray-500" />
                      <span>{selectedItem.images} Images</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span>{selectedItem.files} Documents</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6 mt-6">
                {/* Base Pricing */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Base Pricing</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded p-3 border">
                      <label className="text-sm font-medium text-gray-700">Base Price</label>
                      <div className="text-2xl font-bold text-green-600">
                        ${selectedItem.price.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">Excluding tax</div>
                    </div>
                    <div className="bg-white rounded p-3 border">
                      <label className="text-sm font-medium text-gray-700">Price Inc. Tax</label>
                      <div className="text-2xl font-bold text-blue-600">
                        ${selectedItem.priceInclTax.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">Including HST (13%)</div>
                    </div>
                    <div className="bg-white rounded p-3 border">
                      <label className="text-sm font-medium text-gray-700">Cost</label>
                      <div className="text-lg font-bold text-red-600">
                        ${selectedItem.cost.toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-white rounded p-3 border">
                      <label className="text-sm font-medium text-gray-700">Margin</label>
                      <div className="text-lg font-bold text-purple-600">
                        {selectedItem.margin}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Regional Pricing Overrides */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Regional Pricing Overrides</h3>
                  <div className="space-y-2">
                    {selectedItem.pricingOverrides.map((override, index) => (
                      <div key={index} className="bg-white rounded p-3 border flex justify-between items-center">
                        <div>
                          <span className="font-medium">{override.region}</span>
                          <span className="text-gray-500 text-sm ml-2">({override.tier})</span>
                        </div>
                        <span className="font-bold text-green-600">${override.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="materials" className="space-y-6 mt-6">
                {/* Linked Materials */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Linked Materials</h3>
                  <div className="space-y-2">
                    {selectedItem.linkedMaterials.map((material, index) => (
                      <div key={index} className="bg-white rounded p-3 border flex justify-between items-center">
                        <div>
                          <span className="font-medium">{material.name}</span>
                          <span className="text-gray-500 text-sm ml-2">({material.quantity})</span>
                        </div>
                        <span className="font-medium text-gray-700">${material.cost.toFixed(2)}</span>
                      </div>
                    ))}
                    {selectedItem.linkedMaterials.length === 0 && (
                      <p className="text-gray-500 text-sm italic">No linked materials</p>
                    )}
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Cost Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Material Costs:</span>
                      <span className="font-medium">
                        ${selectedItem.linkedMaterials.reduce((sum, m) => sum + m.cost, 0).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Labor Cost:</span>
                      <span className="font-medium">${(selectedItem.cost - selectedItem.linkedMaterials.reduce((sum, m) => sum + m.cost, 0)).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total Cost:</span>
                      <span>${selectedItem.cost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="channels" className="space-y-6 mt-6">
                {/* Channel Visibility */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Channel Visibility</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Web', 'Portal', 'Mobile', 'CSR', 'API'].map((channel) => (
                      <div key={channel} className="flex items-center justify-between bg-white rounded p-3 border">
                        <span className="font-medium">{channel}</span>
                        <Switch 
                          checked={selectedItem.channelVisibility.includes(channel)}
                          disabled
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="upsell" className="space-y-6 mt-6">
                {/* Upsell Items */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Upsell Recommendations</h3>
                  <div className="space-y-2">
                    {selectedItem.upsellItems.map((item, index) => (
                      <div key={index} className="bg-white rounded p-3 border flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cross-sell Items */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Cross-sell Recommendations</h3>
                  <div className="space-y-2">
                    {selectedItem.crossSellItems.map((item, index) => (
                      <div key={index} className="bg-white rounded p-3 border flex items-center gap-2">
                        <Package className="w-4 h-4 text-blue-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-6 mt-6">
                {/* Audit History */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Audit History</h3>
                  <div className="space-y-3">
                    <div className="bg-white rounded p-3 border">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium">Last Updated</span>
                          <p className="text-sm text-gray-600 mt-1">
                            Updated by {selectedItem.lastUpdatedBy}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">{selectedItem.lastUpdatedAt}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded p-3 border">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium">Price Change</span>
                          <p className="text-sm text-gray-600 mt-1">
                            Price updated from $120.00 to ${selectedItem.price.toFixed(2)}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">2024-11-20 10:15</span>
                      </div>
                    </div>
                    <div className="bg-white rounded p-3 border">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium">Status Change</span>
                          <p className="text-sm text-gray-600 mt-1">
                            Changed from Draft to Published
                          </p>
                        </div>
                        <span className="text-sm text-gray-500">2024-11-15 14:22</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t mt-6">
              <Button className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                Edit Item
              </Button>
              <Button variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="flex h-full bg-[var(--content-bg)]">
      {/* Left Category Tree */}
      <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-medium text-gray-900">Categories</h2>
        </div>
        <div className="p-2">
          <div 
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              selectedCategory === null ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="font-medium">All Items</span>
              <span className="ml-auto text-xs bg-gray-200 px-2 py-1 rounded">
                {mockCatalogItems.length}
              </span>
            </div>
          </div>
          
          {categoryTree.map((category) => (
            <div key={category.id} className="mb-1">
              <div 
                className="flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCategory(category.id)}
              >
                {expandedCategories.includes(category.id) ? (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
                {category.icon}
                <span className="font-medium text-gray-900">{category.name}</span>
              </div>
              
              {expandedCategories.includes(category.id) && (
                <div className="ml-6 space-y-1">
                  {category.children.map((child) => (
                    <div 
                      key={child.id}
                      className={`p-2 rounded cursor-pointer transition-colors ${
                        selectedCategory === child.id 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                      onClick={() => setSelectedCategory(child.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{child.name}</span>
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                          {child.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Service Catalog</h1>
              <p className="text-sm text-gray-600">
                Manage services, products, and bundles for your pool service business
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Item
              </Button>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1 min-w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4"
              />
            </div>

            {/* Filters */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Service">Services</SelectItem>
                <SelectItem value="Product">Products</SelectItem>
                <SelectItem value="Bundle">Bundles</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Unpublished">Unpublished</SelectItem>
              </SelectContent>
            </Select>

            {/* Price Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
              <span className="text-sm">Excl. Tax</span>
              <Switch 
                checked={showTaxInclusive}
                onCheckedChange={setShowTaxInclusive}
              />
              <span className="text-sm">Incl. Tax</span>
            </div>

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
          </div>

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <div className="flex items-center gap-3 text-sm bg-blue-50 border border-blue-200 rounded-lg p-3">
              <span className="font-medium text-blue-800">
                {selectedItems.length} items selected
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Bulk Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  Change Status
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export Selected
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Table Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-medium text-gray-900">
                Catalog Items 
                <span className="text-gray-500 font-normal ml-2">({filteredItems.length} items)</span>
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 w-12">
                      <Checkbox 
                        checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Price & Unit</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Default Labor</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Cost / Margin</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Tags</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Last Updated</th>
                    <th className="text-left py-3 px-4 w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr 
                      key={item.id} 
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => handleRowClick(item)}
                    >
                      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                        <Checkbox 
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                        />
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          {getTypeIcon(item.type)}
                          <div>
                            <span className="font-medium text-gray-900 text-sm">{item.name}</span>
                            <p className="text-xs text-gray-500 mt-1 max-w-xs truncate">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-medium text-green-600">
                            ${showTaxInclusive ? item.priceInclTax.toFixed(2) : item.price.toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-500">{item.unit}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1 text-sm text-gray-700">
                          <Clock className="w-3 h-3" />
                          {item.defaultLabor}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col text-sm">
                          <span className="text-red-600">${item.cost.toFixed(2)}</span>
                          <span className="text-purple-600">{item.margin}% margin</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{item.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                          {item.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col text-sm">
                          <span className="text-gray-700">{item.lastUpdatedBy}</span>
                          <span className="text-xs text-gray-500">{item.lastUpdatedAt.split(' ')[0]}</span>
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
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No catalog items found matching your criteria.</p>
                <Button className="mt-4" onClick={() => setSearchQuery("")}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Catalog Item Details Drawer */}
      <CatalogDetailDrawer />
    </div>
  );
}