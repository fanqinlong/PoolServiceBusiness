import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  TrendingUp,
  Table,
  Calendar,
  Camera,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Plus,
  MoreHorizontal,
  ChevronDown,
  Thermometer,
  Droplets,
  FlaskConical,
  TestTube
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for water quality readings
const mockWaterQualityData = [
  {
    id: 1,
    timestamp: "2024-11-28 14:30",
    customer: "Sarah Johnson",
    pool: "Main Pool",
    technician: "Mike Rodriguez",
    readings: {
      pH: { value: 7.2, status: "normal", target: "7.2-7.6" },
      FC: { value: 2.8, status: "normal", target: "1.0-3.0" },
      TA: { value: 95, status: "normal", target: "80-120" },
      CH: { value: 280, status: "normal", target: "200-400" },
      CYA: { value: 45, status: "normal", target: "30-50" },
      salt: { value: 3200, status: "normal", target: "3000-3500" },
      temp: { value: 78, status: "normal", target: "78-82" }
    },
    lsi: 0.15,
    chemicalDosing: {
      suggested: [
        { chemical: "Liquid Chlorine", amount: "1.2 L", cost: "$8.50" },
        { chemical: "pH Down", amount: "0.3 L", cost: "$3.20" }
      ],
      actual: [
        { chemical: "Liquid Chlorine", amount: "1.2 L", cost: "$8.50" },
        { chemical: "pH Down", amount: "0.3 L", cost: "$3.20" }
      ]
    },
    source: "LaMotte SpinTouch",
    photos: 2,
    attachments: 1,
    notes: "Water balanced. Regular maintenance performed.",
    status: "in-range"
  },
  {
    id: 2,
    timestamp: "2024-11-28 11:15",
    customer: "Michael Chen",
    pool: "Spa",
    technician: "Jennifer Park",
    readings: {
      pH: { value: 8.1, status: "high", target: "7.2-7.6" },
      FC: { value: 0.8, status: "low", target: "1.0-3.0" },
      TA: { value: 145, status: "high", target: "80-120" },
      CH: { value: 520, status: "high", target: "200-400" },
      CYA: { value: 65, status: "high", target: "30-50" },
      salt: { value: 3400, status: "normal", target: "3000-3500" },
      temp: { value: 82, status: "normal", target: "78-82" }
    },
    lsi: 0.65,
    chemicalDosing: {
      suggested: [
        { chemical: "Muriatic Acid", amount: "2.5 L", cost: "$15.75" },
        { chemical: "Liquid Chlorine", amount: "2.0 L", cost: "$14.20" },
        { chemical: "CYA Reducer", amount: "1.0 kg", cost: "$32.00" }
      ],
      actual: [
        { chemical: "Muriatic Acid", amount: "2.0 L", cost: "$12.60" },
        { chemical: "Liquid Chlorine", amount: "2.0 L", cost: "$14.20" }
      ]
    },
    source: "Manual",
    photos: 3,
    attachments: 0,
    notes: "High pH and TA. Scaling risk. Immediate treatment required.",
    status: "out-of-range"
  },
  {
    id: 3,
    timestamp: "2024-11-27 16:45",
    customer: "Thompson Family Pool",
    pool: "Main Pool",
    technician: "David Kim",
    readings: {
      pH: { value: 6.9, status: "low", target: "7.2-7.6" },
      FC: { value: 4.2, status: "high", target: "1.0-3.0" },
      TA: { value: 65, status: "low", target: "80-120" },
      CH: { value: 185, status: "low", target: "200-400" },
      CYA: { value: 25, status: "low", target: "30-50" },
      salt: { value: 2800, status: "low", target: "3000-3500" },
      temp: { value: 76, status: "low", target: "78-82" }
    },
    lsi: -0.45,
    chemicalDosing: {
      suggested: [
        { chemical: "Sodium Bicarbonate", amount: "3.5 kg", cost: "$28.75" },
        { chemical: "Calcium Chloride", amount: "2.0 kg", cost: "$18.50" },
        { chemical: "Stabilizer", amount: "1.5 kg", cost: "$24.30" }
      ],
      actual: [
        { chemical: "Sodium Bicarbonate", amount: "3.0 kg", cost: "$24.75" },
        { chemical: "Calcium Chloride", amount: "1.5 kg", cost: "$13.85" }
      ]
    },
    source: "WaterGuru",
    photos: 1,
    attachments: 2,
    notes: "Corrosive water. Added alkalinity and calcium. Monitor closely.",
    status: "out-of-range"
  },
  {
    id: 4,
    timestamp: "2024-11-27 10:20",
    customer: "David Martinez",
    pool: "Main Pool",
    technician: "Lisa Chen",
    readings: {
      pH: { value: 7.4, status: "normal", target: "7.2-7.6" },
      FC: { value: 2.1, status: "normal", target: "1.0-3.0" },
      TA: { value: 105, status: "normal", target: "80-120" },
      CH: { value: 320, status: "normal", target: "200-400" },
      CYA: { value: 38, status: "normal", target: "30-50" },
      salt: { value: 3150, status: "normal", target: "3000-3500" },
      temp: { value: 79, status: "normal", target: "78-82" }
    },
    lsi: 0.05,
    chemicalDosing: {
      suggested: [],
      actual: []
    },
    source: "LaMotte SpinTouch",
    photos: 0,
    attachments: 1,
    notes: "Perfect water balance. No treatment needed.",
    status: "in-range"
  },
  {
    id: 5,
    timestamp: "2024-11-26 13:55",
    customer: "Lisa Wong",
    pool: "Main Pool",
    technician: "Carlos Mendez",
    readings: {
      pH: { value: 0, status: "missing", target: "7.2-7.6" },
      FC: { value: 0, status: "missing", target: "1.0-3.0" },
      TA: { value: 0, status: "missing", target: "80-120" },
      CH: { value: 0, status: "missing", target: "200-400" },
      CYA: { value: 0, status: "missing", target: "30-50" },
      salt: { value: 0, status: "missing", target: "3000-3500" },
      temp: { value: 77, status: "low", target: "78-82" }
    },
    lsi: null,
    chemicalDosing: {
      suggested: [],
      actual: []
    },
    source: "Manual",
    photos: 0,
    attachments: 0,
    notes: "Equipment malfunction. Unable to complete water test.",
    status: "missing"
  }
];

// Historical data for charts
const mockHistoricalData = {
  sevenDay: [
    { date: "11/22", pH: 7.2, FC: 2.5, TA: 95, CH: 280, temp: 78 },
    { date: "11/23", pH: 7.3, FC: 2.3, TA: 98, CH: 285, temp: 78 },
    { date: "11/24", pH: 7.1, FC: 2.8, TA: 92, CH: 275, temp: 79 },
    { date: "11/25", pH: 7.4, FC: 2.6, TA: 100, CH: 290, temp: 78 },
    { date: "11/26", pH: 7.2, FC: 2.4, TA: 95, CH: 280, temp: 77 },
    { date: "11/27", pH: 7.3, FC: 2.7, TA: 97, CH: 285, temp: 79 },
    { date: "11/28", pH: 7.2, FC: 2.8, TA: 95, CH: 280, temp: 78 }
  ]
};

export function WaterQuality() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSource, setFilterSource] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<'table' | 'trends'>('table');
  const [selectedReading, setSelectedReading] = useState<typeof mockWaterQualityData[0] | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [chartPeriod, setChartPeriod] = useState<'7d' | '30d' | '90d'>('7d');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-range':
        return { dot: 'bg-green-500', badge: 'bg-green-100 text-green-800 border-green-200' };
      case 'out-of-range':
        return { dot: 'bg-red-500', badge: 'bg-red-100 text-red-800 border-red-200' };
      case 'missing':
        return { dot: 'bg-gray-400', badge: 'bg-gray-100 text-gray-800 border-gray-200' };
      default:
        return { dot: 'bg-gray-400', badge: 'bg-gray-100 text-gray-800 border-gray-200' };
    }
  };

  const getLSIColor = (lsi: number | null) => {
    if (lsi === null) return 'bg-gray-400';
    if (lsi <= -0.3) return 'bg-blue-500';
    if (lsi >= 0.3) return 'bg-red-500';
    return 'bg-green-500';
  };

  const getReadingStatus = (reading: any) => {
    switch (reading.status) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'low':
        return 'text-orange-600 bg-orange-50';
      case 'missing':
        return 'text-gray-500 bg-gray-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  const filteredData = mockWaterQualityData.filter(reading => {
    const matchesSearch = 
      reading.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reading.pool.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reading.technician.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSource = filterSource === "all" || reading.source === filterSource;
    const matchesStatus = filterStatus === "all" || reading.status === filterStatus;
    
    return matchesSearch && matchesSource && matchesStatus;
  });

  const handleRowClick = (reading: typeof mockWaterQualityData[0]) => {
    setSelectedReading(reading);
    setShowDetails(true);
  };

  const WaterQualityDetailDrawer = () => (
    <Sheet open={showDetails} onOpenChange={setShowDetails}>
      <SheetContent className="w-[700px] sm:w-[800px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <TestTube className="w-5 h-5" />
            Water Quality Details
          </SheetTitle>
          <SheetDescription>
            Comprehensive water analysis and treatment history
          </SheetDescription>
        </SheetHeader>
        
        {selectedReading && (
          <div className="mt-6 space-y-6">
            {/* Basic Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Test Information</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-600">Date/Time:</span>
                  <span className="ml-2 font-medium">{selectedReading.timestamp}</span>
                </div>
                <div>
                  <span className="text-gray-600">Technician:</span>
                  <span className="ml-2 font-medium">{selectedReading.technician}</span>
                </div>
                <div>
                  <span className="text-gray-600">Customer:</span>
                  <span className="ml-2 font-medium">{selectedReading.customer}</span>
                </div>
                <div>
                  <span className="text-gray-600">Pool:</span>
                  <span className="ml-2 font-medium">{selectedReading.pool}</span>
                </div>
                <div>
                  <span className="text-gray-600">Source:</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {selectedReading.source}
                  </Badge>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <div className="ml-2 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedReading.status).dot}`}></div>
                    <Badge className={`text-xs ${getStatusColor(selectedReading.status).badge}`}>
                      {selectedReading.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Water Chemistry Readings */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Water Chemistry Readings</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(selectedReading.readings).map(([param, reading]) => (
                  <div key={param} className="bg-white rounded p-3 border">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-900 text-sm">
                        {param.toUpperCase()}
                      </span>
                      <Badge className={`text-xs ${getReadingStatus(reading)}`}>
                        {reading.status}
                      </Badge>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {reading.status === 'missing' ? 'N/A' : `${reading.value}${param === 'temp' ? '°F' : param === 'pH' ? '' : ' ppm'}`}
                    </div>
                    <div className="text-xs text-gray-500">
                      Target: {reading.target}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LSI Calculation */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Langelier Saturation Index (LSI)</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${getLSIColor(selectedReading.lsi)}`}></div>
                  <span className="text-2xl font-bold">
                    {selectedReading.lsi !== null ? selectedReading.lsi.toFixed(2) : 'N/A'}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {selectedReading.lsi !== null && (
                    <>
                      {selectedReading.lsi <= -0.3 && "Corrosive - Add calcium/alkalinity"}
                      {selectedReading.lsi > -0.3 && selectedReading.lsi < 0.3 && "Balanced - Ideal range"}
                      {selectedReading.lsi >= 0.3 && "Scaling - Reduce pH/alkalinity"}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Chemical Dosing */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Chemical Treatment</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-800 mb-2">Suggested</h4>
                  <div className="space-y-2">
                    {selectedReading.chemicalDosing.suggested.map((item, index) => (
                      <div key={index} className="bg-white rounded p-2 border border-blue-200">
                        <div className="font-medium text-sm">{item.chemical}</div>
                        <div className="text-xs text-gray-600">{item.amount} - {item.cost}</div>
                      </div>
                    ))}
                    {selectedReading.chemicalDosing.suggested.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No treatment needed</p>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-800 mb-2">Applied</h4>
                  <div className="space-y-2">
                    {selectedReading.chemicalDosing.actual.map((item, index) => (
                      <div key={index} className="bg-white rounded p-2 border border-green-200">
                        <div className="font-medium text-sm">{item.chemical}</div>
                        <div className="text-xs text-gray-600">{item.amount} - {item.cost}</div>
                      </div>
                    ))}
                    {selectedReading.chemicalDosing.actual.length === 0 && (
                      <p className="text-sm text-gray-500 italic">No chemicals applied</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Trend Charts */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-900">Water Quality Trends</h3>
                <div className="flex gap-2">
                  <Button 
                    variant={chartPeriod === '7d' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setChartPeriod('7d')}
                  >
                    7 Days
                  </Button>
                  <Button 
                    variant={chartPeriod === '30d' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setChartPeriod('30d')}
                  >
                    30 Days
                  </Button>
                  <Button 
                    variant={chartPeriod === '90d' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setChartPeriod('90d')}
                  >
                    90 Days
                  </Button>
                </div>
              </div>
              <div className="h-64 bg-white rounded border">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockHistoricalData.sevenDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="pH" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="FC" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="TA" stroke="#ffc658" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Notes and Attachments */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Notes & Attachments</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">Technician Notes:</label>
                  <p className="mt-1 text-sm text-gray-600 bg-white p-3 rounded border">
                    {selectedReading.notes}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Camera className="w-4 h-4 text-gray-500" />
                    <span>{selectedReading.photos} Photos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span>{selectedReading.attachments} Documents</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                Create Re-test Order
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
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
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Water Quality</h1>
          <p className="text-sm text-gray-600">
            Monitor water chemistry, LSI calculations, and chemical treatments
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Test
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
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
              placeholder="Search by customer, pool, or technician..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4"
            />
          </div>

          {/* Date Range */}
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>

          {/* Source Filter */}
          <Select value={filterSource} onValueChange={setFilterSource}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="LaMotte SpinTouch">LaMotte SpinTouch</SelectItem>
              <SelectItem value="WaterGuru">WaterGuru</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="in-range">In Range</SelectItem>
              <SelectItem value="out-of-range">Out of Range</SelectItem>
              <SelectItem value="missing">Missing</SelectItem>
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
              <Table className="w-4 h-4" />
            </Button>
            <Button 
              variant={viewMode === 'trends' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setViewMode('trends')}
              className="rounded-l-none"
            >
              <TrendingUp className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Quick filters:</span>
          <Button variant="outline" size="sm" className="h-7">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Out of Range
          </Button>
          <Button variant="outline" size="sm" className="h-7">
            <Thermometer className="w-3 h-3 mr-1" />
            High LSI
          </Button>
          <Button variant="outline" size="sm" className="h-7">
            <Droplets className="w-3 h-3 mr-1" />
            Low Chlorine
          </Button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium text-gray-900">
            Water Quality Records 
            <span className="text-gray-500 font-normal ml-2">({filteredData.length} readings)</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Timestamp</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Customer / Pool</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Technician</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Readings Summary</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">LSI</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Chemical Dosing</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Source</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Photos / Docs</th>
                <th className="text-left py-3 px-4 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((reading) => (
                <tr 
                  key={reading.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleRowClick(reading)}
                >
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 text-sm">
                        {reading.timestamp.split(' ')[0]}
                      </span>
                      <span className="text-xs text-gray-500">
                        {reading.timestamp.split(' ')[1]}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 text-sm">{reading.customer}</span>
                      <span className="text-xs text-gray-500">{reading.pool}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-700">{reading.technician}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(reading.readings).slice(0, 4).map(([param, data]) => (
                        <Badge 
                          key={param}
                          className={`text-xs px-1.5 py-0.5 ${getReadingStatus(data)}`}
                          variant="outline"
                        >
                          {param.toUpperCase()}: {data.status === 'missing' ? 'N/A' : data.value}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getLSIColor(reading.lsi)}`}></div>
                      <span className="font-medium text-sm">
                        {reading.lsi !== null ? reading.lsi.toFixed(2) : 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <div className="text-gray-600">
                        {reading.chemicalDosing.suggested.length} suggested
                      </div>
                      <div className="text-gray-600">
                        {reading.chemicalDosing.actual.length} applied
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="outline" className="text-xs">
                      {reading.source}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        <span>{reading.photos}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span>{reading.attachments}</span>
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
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <TestTube className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No water quality records found matching your criteria.</p>
            <Button className="mt-4" onClick={() => setSearchQuery("")}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Water Quality Details Drawer */}
      <WaterQualityDetailDrawer />
    </div>
  );
}