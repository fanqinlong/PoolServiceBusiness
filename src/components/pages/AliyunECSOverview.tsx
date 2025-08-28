import React, { useState } from 'react';
import { 
  Calendar,
  Filter,
  Download,
  Plus,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  DollarSign,
  MapPin,
  Navigation,
  Play,
  Pause,
  Settings,
  Wrench,
  Home,
  Package,
  Droplets,
  Bell,
  User,
  FileText,
  CreditCard,
  Quote,
  AlertCircle,
  Info,
  XCircle,
  Eye,
  Phone,
  MessageSquare,
  Target,
  Beaker,
  TrendingUp as TrendIcon,
  Activity,
  ChevronRight,
  Map as MapIcon,
  Route,
  Car,
  Building,
  Zap
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Checkbox } from '../ui/checkbox';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for KPIs
const kpiData = {
  scheduledToday: { current: 28, change: 12.5, trend: [22, 25, 28, 26, 30, 28, 32] },
  inProgress: { current: 12, change: -5.2, trend: [15, 14, 16, 12, 11, 12, 13] },
  completed: { current: 45, change: 18.3, trend: [38, 42, 45, 44, 48, 45, 52] },
  overdue: { current: 3, change: -33.3, trend: [6, 5, 4, 3, 2, 3, 2] },
  unscheduled: { current: 8, change: -20.0, trend: [12, 10, 8, 9, 7, 8, 6] },
  revenue: { current: 12450, change: 15.8, trend: [10500, 11200, 12450, 11800, 13200, 12450, 14100] }
};

// Mock technicians data
const technicians = [
  { id: 1, name: 'Mike Rodriguez', initials: 'MR', color: 'bg-blue-500', jobsToday: 6, phone: '(416) 555-0123' },
  { id: 2, name: 'Jennifer Park', initials: 'JP', color: 'bg-green-500', jobsToday: 5, phone: '(416) 555-0124' },
  { id: 3, name: 'David Kim', initials: 'DK', color: 'bg-purple-500', jobsToday: 4, phone: '(416) 555-0125' },
  { id: 4, name: 'Carlos Mendez', initials: 'CM', color: 'bg-orange-500', jobsToday: 7, phone: '(416) 555-0126' },
  { id: 5, name: 'Sarah Thompson', initials: 'ST', color: 'bg-pink-500', jobsToday: 3, phone: '(416) 555-0127' }
];

// Mock jobs data for timeline
const timelineJobs = [
  { id: 1, techId: 1, type: 'Maint', customer: 'Johnson Pool', time: '08:00', status: 'completed', duration: 1.5 },
  { id: 2, techId: 1, type: 'Repair', customer: 'Smith Residence', time: '10:30', status: 'in-progress', duration: 2.0 },
  { id: 3, techId: 1, type: 'Open', customer: 'Wilson Pool', time: '14:00', status: 'scheduled', duration: 3.0 },
  { id: 4, techId: 2, type: 'Maint', customer: 'Brown Pool', time: '09:00', status: 'completed', duration: 1.0 },
  { id: 5, techId: 2, type: 'Install', customer: 'Davis Pool', time: '11:00', status: 'in-progress', duration: 4.0 },
  { id: 6, techId: 3, type: 'Repair', customer: 'Miller Pool', time: '08:30', status: 'completed', duration: 2.5 },
  { id: 7, techId: 3, type: 'Close', customer: 'Garcia Pool', time: '13:00', status: 'scheduled', duration: 2.0 },
  { id: 8, techId: 4, type: 'Maint', customer: 'Lopez Pool', time: '07:30', status: 'completed', duration: 1.5 },
  { id: 9, techId: 4, type: 'Open', customer: 'Anderson Pool', time: '09:30', status: 'in-progress', duration: 3.5 },
  { id: 10, techId: 4, type: 'Maint', customer: 'Taylor Pool', time: '15:00', status: 'scheduled', duration: 1.0 },
  { id: 11, techId: 5, type: 'Repair', customer: 'White Pool', time: '10:00', status: 'in-progress', duration: 2.0 },
  { id: 12, techId: 5, type: 'Install', customer: 'Thomas Pool', time: '14:30', status: 'scheduled', duration: 3.0 }
];

// Mock alerts data
const alertsData = [
  { id: 1, type: 'critical', icon: AlertTriangle, title: 'Equipment Failure', customer: 'Johnson Pool', location: 'Mississauga', time: '2 hours ago', module: 'Equipment' },
  { id: 2, type: 'warning', icon: AlertCircle, title: 'pH Level High', customer: 'Smith Residence', location: 'Toronto', time: '4 hours ago', module: 'Water Quality' },
  { id: 3, type: 'info', icon: Info, title: 'Route Optimization Available', customer: 'Multiple', location: 'Richmond Hill', time: '6 hours ago', module: 'Dispatch' },
  { id: 4, type: 'warning', icon: Clock, title: 'SLA Risk', customer: 'Wilson Pool', location: 'Vaughan', time: '1 hour ago', module: 'Service' },
  { id: 5, type: 'critical', icon: XCircle, title: 'Chemical Shortage', customer: 'Service Depot', location: 'Brampton', time: '30 min ago', module: 'Inventory' }
];

// Mock todos data
const todosData = [
  { id: 1, title: 'Call-back: Wilson Pool heater question', customer: 'Wilson Pool', priority: 'medium', time: '15 min' },
  { id: 2, title: 'QA Review: Weekly maintenance reports', customer: 'Multiple', priority: 'low', time: '30 min' },
  { id: 3, title: 'Photo upload fix: Johnson service', customer: 'Johnson Pool', priority: 'low', time: '10 min' },
  { id: 4, title: 'Equipment calibration check', customer: 'Service Depot', priority: 'high', time: '45 min' },
  { id: 5, title: 'Customer satisfaction follow-up', customer: 'Smith Residence', priority: 'medium', time: '20 min' }
];

// Mock water quality data
const waterQualityData = {
  outOfRange: 12,
  lsiDistribution: [
    { name: '≤ -0.3', value: 8, color: '#f5222d' },
    { name: '-0.3 to 0.3', value: 65, color: '#52c41a' },
    { name: '≥ 0.3', value: 27, color: '#faad14' }
  ],
  topIssues: [
    { issue: 'pH High (>7.8)', count: 8, trend: 'up' },
    { issue: 'Free Chlorine Low (<1.0)', count: 6, trend: 'down' },
    { issue: 'Total Alkalinity High', count: 4, trend: 'up' },
    { issue: 'Calcium Hardness Low', count: 3, trend: 'stable' }
  ]
};

// Mock profit data
const profitData = [
  { name: 'Mon', revenue: 2400, costs: 1800, profit: 600 },
  { name: 'Tue', revenue: 3200, costs: 2100, profit: 1100 },
  { name: 'Wed', revenue: 2800, costs: 1900, profit: 900 },
  { name: 'Thu', revenue: 3800, costs: 2300, profit: 1500 },
  { name: 'Fri', revenue: 3400, costs: 2200, profit: 1200 },
  { name: 'Sat', revenue: 4200, costs: 2500, profit: 1700 },
  { name: 'Sun', revenue: 2600, costs: 1700, profit: 900 }
];

// Mock chemical cost trend
const chemicalCostData = [
  { day: 'Day 1', cost: 180 },
  { day: 'Day 2', cost: 220 },
  { day: 'Day 3', cost: 190 },
  { day: 'Day 4', cost: 280 },
  { day: 'Day 5', cost: 240 },
  { day: 'Day 6', cost: 320 },
  { day: 'Day 7', cost: 260 }
];

// Mock recent activity
const recentActivity = [
  { id: 1, type: 'order', icon: FileText, action: 'New order created', customer: 'Anderson Pool', time: '5 min ago', user: 'Sarah Johnson' },
  { id: 2, type: 'completion', icon: CheckCircle, action: 'Job completed', customer: 'Wilson Pool', time: '12 min ago', user: 'Mike Rodriguez' },
  { id: 3, type: 'invoice', icon: CreditCard, action: 'Invoice sent', customer: 'Brown Pool', time: '25 min ago', user: 'System' },
  { id: 4, type: 'order', icon: FileText, action: 'Emergency repair order', customer: 'Davis Pool', time: '35 min ago', user: 'Jennifer Park' },
  { id: 5, type: 'refund', icon: DollarSign, action: 'Refund processed', customer: 'Miller Pool', time: '1 hour ago', user: 'Admin' },
  { id: 6, type: 'completion', icon: CheckCircle, action: 'Maintenance completed', customer: 'Garcia Pool', time: '1.5 hours ago', user: 'Carlos Mendez' },
  { id: 7, type: 'invoice', icon: CreditCard, action: 'Payment received', customer: 'Lopez Pool', time: '2 hours ago', user: 'System' }
];

// Status configuration
const statusConfig = {
  'unscheduled': { color: 'bg-gray-500', dotColor: 'bg-gray-500' },
  'scheduled': { color: 'bg-blue-500', dotColor: 'bg-blue-500' },
  'in-progress': { color: 'bg-green-500', dotColor: 'bg-green-500' },
  'completed': { color: 'bg-teal-500', dotColor: 'bg-teal-500' },
  'overdue': { color: 'bg-red-500', dotColor: 'bg-red-500' },
  'qa': { color: 'bg-purple-500', dotColor: 'bg-purple-500' }
};

// Job type badges
const getJobTypeBadge = (type: string) => {
  switch (type) {
    case 'Open': return { label: 'Open', color: 'bg-green-100 text-green-800' };
    case 'Close': return { label: 'Close', color: 'bg-orange-100 text-orange-800' };
    case 'Maint': return { label: 'Maint', color: 'bg-blue-100 text-blue-800' };
    case 'Repair': return { label: 'Repair', color: 'bg-red-100 text-red-800' };
    case 'Install': return { label: 'Install', color: 'bg-purple-100 text-purple-800' };
    default: return { label: 'Other', color: 'bg-gray-100 text-gray-800' };
  }
};

// Sparkline component
const Sparkline = ({ data, color = '#1890ff' }: { data: number[], color?: string }) => (
  <div className="w-16 h-8">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.map((value, index) => ({ value, index }))}>
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={color} 
          strokeWidth={2} 
          dot={false}
          activeDot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// KPI Card component
const KPICard = ({ 
  title, 
  value, 
  change, 
  trend, 
  format = 'number',
  onClick 
}: { 
  title: string, 
  value: number, 
  change: number, 
  trend: number[], 
  format?: 'number' | 'currency',
  onClick?: () => void 
}) => {
  const isPositive = change > 0;
  const formattedValue = format === 'currency' ? `$${value.toLocaleString()}` : value.toString();
  
  return (
    <Card className="cursor-pointer hover:shadow-md transition-all" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-600">{title}</h4>
          <Sparkline data={trend} color={isPositive ? '#52c41a' : '#f5222d'} />
        </div>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-semibold text-gray-900">{formattedValue}</div>
            <div className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {Math.abs(change)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Job chip component for timeline
const JobChip = ({ job, onClick }: { job: any, onClick?: () => void }) => {
  const badge = getJobTypeBadge(job.type);
  const statusInfo = statusConfig[job.status as keyof typeof statusConfig];
  
  return (
    <div 
      className="bg-white border border-gray-200 rounded-md p-2 mb-1 cursor-pointer hover:shadow-sm transition-all text-xs"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-1">
        <Badge className={`text-xs px-1 py-0 h-4 ${badge.color}`}>
          {badge.label}
        </Badge>
        <div className={`w-2 h-2 rounded-full ${statusInfo.dotColor}`}></div>
      </div>
      <div className="font-medium text-gray-900 truncate">{job.customer}</div>
      <div className="text-gray-500">{job.time}</div>
    </div>
  );
};

export function AliyunECSOverview() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateRange, setDateRange] = useState('today');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTechnicians, setSelectedTechnicians] = useState<number[]>([]);
  const [showMap, setShowMap] = useState(true);
  const [showTraffic, setShowTraffic] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);

  const formatDateRange = () => {
    switch (dateRange) {
      case 'today': return 'Today';
      case '7d': return 'Last 7 days';
      case '30d': return 'Last 30 days';
      case 'custom': return selectedDate.toLocaleDateString();
      default: return 'Today';
    }
  };

  return (
    <div className="min-h-full bg-[var(--content-bg)]">
      {/* Sticky Toolbar */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Date Range Picker */}
            <div className="flex bg-gray-100 rounded-md p-1">
              <Button
                variant={dateRange === 'today' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDateRange('today')}
                className="text-xs"
              >
                Today
              </Button>
              <Button
                variant={dateRange === '7d' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDateRange('7d')}
                className="text-xs"
              >
                7d
              </Button>
              <Button
                variant={dateRange === '30d' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setDateRange('30d')}
                className="text-xs"
              >
                30d
              </Button>
              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button
                    variant={dateRange === 'custom' ? 'default' : 'ghost'}
                    size="sm"
                    className="text-xs"
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    Custom
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        setSelectedDate(date);
                        setDateRange('custom');
                        setShowCalendar(false);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Filters */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                  {selectedTechnicians.length > 0 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {selectedTechnicians.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Technicians</label>
                    <div className="space-y-2">
                      {technicians.map(tech => (
                        <div key={tech.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tech-${tech.id}`}
                            checked={selectedTechnicians.includes(tech.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedTechnicians([...selectedTechnicians, tech.id]);
                              } else {
                                setSelectedTechnicians(selectedTechnicians.filter(id => id !== tech.id));
                              }
                            }}
                          />
                          <label htmlFor={`tech-${tech.id}`} className="text-sm flex items-center gap-2">
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className={`text-xs text-white ${tech.color}`}>
                                {tech.initials}
                              </AvatarFallback>
                            </Avatar>
                            {tech.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">City/Area</label>
                      <Select>
                        <SelectTrigger className="text-xs">
                          <SelectValue placeholder="All areas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All areas</SelectItem>
                          <SelectItem value="toronto">Toronto</SelectItem>
                          <SelectItem value="mississauga">Mississauga</SelectItem>
                          <SelectItem value="richmond-hill">Richmond Hill</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">Service Type</label>
                      <Select>
                        <SelectTrigger className="text-xs">
                          <SelectValue placeholder="All services" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All services</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="repair">Repair</SelectItem>
                          <SelectItem value="installation">Installation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Quick Filter Chips */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                Unscheduled (8)
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Overdue (3)
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                Today (28)
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Completed (45)
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Order
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Section A: KPI Cards */}
          <div className="col-span-12">
            <div className="grid grid-cols-6 gap-4 mb-6">
              <KPICard
                title="Scheduled Today"
                value={kpiData.scheduledToday.current}
                change={kpiData.scheduledToday.change}
                trend={kpiData.scheduledToday.trend}
              />
              <KPICard
                title="In Progress"
                value={kpiData.inProgress.current}
                change={kpiData.inProgress.change}
                trend={kpiData.inProgress.trend}
              />
              <KPICard
                title="Completed"
                value={kpiData.completed.current}
                change={kpiData.completed.change}
                trend={kpiData.completed.trend}
              />
              <KPICard
                title="Overdue"
                value={kpiData.overdue.current}
                change={kpiData.overdue.change}
                trend={kpiData.overdue.trend}
              />
              <KPICard
                title="Unscheduled"
                value={kpiData.unscheduled.current}
                change={kpiData.unscheduled.change}
                trend={kpiData.unscheduled.trend}
              />
              <KPICard
                title="Revenue Today"
                value={kpiData.revenue.current}
                change={kpiData.revenue.change}
                trend={kpiData.revenue.trend}
                format="currency"
              />
            </div>
          </div>

          {/* Section B: Dispatch & Routes */}
          <div className="col-span-8">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Dispatch & Routes</CardTitle>
                  <Button variant="outline" size="sm">
                    <Route className="w-4 h-4 mr-2" />
                    Optimize Routes
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Timeline Header */}
                <div className="flex border-b border-gray-200">
                  <div className="w-48 p-3 border-r border-gray-200 bg-gray-50 font-medium text-sm">
                    Technician
                  </div>
                  {['7:00', '9:00', '11:00', '13:00', '15:00', '17:00'].map(time => (
                    <div key={time} className="flex-1 p-3 text-center text-sm text-gray-600 border-r border-gray-200 bg-gray-50">
                      {time}
                    </div>
                  ))}
                </div>

                {/* Technician Lanes */}
                {technicians.map(tech => (
                  <div key={tech.id} className="flex border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="w-48 p-3 border-r border-gray-200">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className={`text-xs text-white ${tech.color}`}>
                            {tech.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-gray-900 truncate">{tech.name}</div>
                          <div className="text-xs text-gray-500">{tech.jobsToday} jobs today</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex">
                      {Array.from({ length: 6 }).map((_, index) => {
                        const techJobs = timelineJobs.filter(job => job.techId === tech.id);
                        const slotJob = techJobs[index % techJobs.length];
                        
                        return (
                          <div key={index} className="flex-1 p-2 border-r border-gray-100 min-h-20">
                            {slotJob && index < techJobs.length && (
                              <JobChip job={slotJob} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Section C: Map */}
          <div className="col-span-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Service Map</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowTraffic(!showTraffic)}
                    >
                      <Car className="w-4 h-4 mr-1" />
                      Traffic {showTraffic ? 'On' : 'Off'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gray-100 rounded-md border flex items-center justify-center relative overflow-hidden">
                  <MapIcon className="w-16 h-16 text-gray-400" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10"></div>
                  
                  {/* Mock route polylines */}
                  <div className="absolute top-4 left-4 space-y-2">
                    {technicians.slice(0, 3).map((tech, index) => (
                      <div key={tech.id} className="flex items-center gap-2 text-xs">
                        <div className={`w-3 h-3 rounded-full ${tech.color}`}></div>
                        <span className="text-gray-700">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Mock markers */}
                  <div className="absolute top-20 right-16">
                    <div className="w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="absolute bottom-20 left-12">
                    <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="absolute top-32 left-20">
                    <div className="w-3 h-3 bg-purple-500 rounded-full border-2 border-white"></div>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-gray-500 text-center">
                  Live tracking • {technicians.length} technicians on route
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section D: Alerts & To-dos */}
          <div className="col-span-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Alerts & To-dos</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="alerts" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mx-4 mb-4">
                    <TabsTrigger value="alerts" className="text-sm">
                      Alerts ({alertsData.length})
                    </TabsTrigger>
                    <TabsTrigger value="todos" className="text-sm">
                      To-dos ({todosData.length})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="alerts" className="mt-0">
                    <div className="space-y-0">
                      {alertsData.map(alert => {
                        const Icon = alert.icon;
                        const severityColor = alert.type === 'critical' ? 'text-red-600' : 
                                            alert.type === 'warning' ? 'text-orange-600' : 'text-blue-600';
                        
                        return (
                          <div key={alert.id} className="flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50">
                            <Icon className={`w-4 h-4 ${severityColor}`} />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm text-gray-900">{alert.title}</span>
                                <Badge variant="outline" className="text-xs">
                                  {alert.module}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-600">
                                {alert.customer} • {alert.location} • {alert.time}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm" className="text-xs h-7">
                                Acknowledge
                              </Button>
                              {alert.type === 'warning' && (
                                <Button variant="outline" size="sm" className="text-xs h-7">
                                  Re-test
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="todos" className="mt-0">
                    <div className="space-y-0">
                      {todosData.map(todo => {
                        const priorityColor = todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                                            todo.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                                            'bg-gray-100 text-gray-800';
                        
                        return (
                          <div key={todo.id} className="flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50">
                            <Checkbox />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm text-gray-900">{todo.title}</span>
                                <Badge className={`text-xs ${priorityColor}`}>
                                  {todo.priority}
                                </Badge>
                              </div>
                              <div className="text-xs text-gray-600">
                                {todo.customer} • Est. {todo.time}
                              </div>
                            </div>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm" className="text-xs h-7">
                                <Play className="w-3 h-3 mr-1" />
                                Start
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs h-7">
                                <CheckCircle className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Section E: Water Quality */}
          <div className="col-span-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Water Quality</CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Re-test
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-red-600">{waterQualityData.outOfRange}</div>
                    <div className="text-sm text-gray-600">Out of Range</div>
                  </div>
                  <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={waterQualityData.lsiDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={20}
                          outerRadius={40}
                          dataKey="value"
                        >
                          {waterQualityData.lsiDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h5 className="font-medium text-sm text-gray-900">Top Issues</h5>
                  {waterQualityData.topIssues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <Beaker className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-900">{issue.issue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{issue.count}</span>
                        <TrendIcon className={`w-3 h-3 ${issue.trend === 'up' ? 'text-red-500' : issue.trend === 'down' ? 'text-green-500' : 'text-gray-500'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section F: Profit & Costs */}
          <div className="col-span-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Profit & Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={profitData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="profit" fill="#52c41a" name="Profit" />
                      <Bar dataKey="costs" fill="#f5222d" name="Costs" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h5 className="font-medium text-sm text-gray-900 mb-2">Chemical Cost Trend (7d)</h5>
                  <div className="h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chemicalCostData}>
                        <Area type="monotone" dataKey="cost" stroke="#ff6a00" fill="#fff7f0" />
                        <XAxis dataKey="day" hide />
                        <YAxis hide />
                        <Tooltip />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section G: Recent Activity */}
          <div className="col-span-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {recentActivity.map(activity => {
                    const Icon = activity.icon;
                    const typeColor = activity.type === 'completion' ? 'text-green-600' :
                                    activity.type === 'order' ? 'text-blue-600' :
                                    activity.type === 'invoice' ? 'text-orange-600' :
                                    activity.type === 'refund' ? 'text-red-600' : 'text-gray-600';
                    
                    return (
                      <div key={activity.id} className="flex items-center gap-3 p-4 border-b border-gray-100 hover:bg-gray-50">
                        <Icon className={`w-4 h-4 ${typeColor}`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                          <div className="text-xs text-gray-600">
                            {activity.customer} • by {activity.user} • {activity.time}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Quick Create */}
      <div className="fixed bottom-6 right-6">
        <Popover open={quickCreateOpen} onOpenChange={setQuickCreateOpen}>
          <PopoverTrigger asChild>
            <Button size="lg" className="rounded-full w-14 h-14 shadow-lg">
              <Plus className="w-6 h-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48" align="end" side="top">
            <div className="space-y-1">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-2" />
                Order
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Quote className="w-4 h-4 mr-2" />
                Quote
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <CreditCard className="w-4 h-4 mr-2" />
                Invoice
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Customer
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}