import React, { useState, useCallback } from 'react';
import { 
  Search, 
  Filter, 
  Calendar,
  MapPin,
  Route,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RefreshCw,
  Settings,
  Home,
  Wrench,
  Droplets,
  Package,
  CalendarDays,
  Target,
  PlayCircle,
  PauseCircle,
  XCircle,
  MoreHorizontal,
  Bell,
  Download,
  MessageSquare,
  Eye,
  Edit,
  Save,
  DollarSign,
  Camera,
  FileText,
  Star,
  Layers,
  ToggleLeft,
  ToggleRight,
  Truck
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

// Status colors configuration
const statusConfig = {
  'Unscheduled': { color: 'bg-gray-500', dotColor: 'bg-gray-500', textColor: 'text-gray-700', bgColor: 'bg-gray-50' },
  'Scheduled': { color: 'bg-blue-500', dotColor: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-50' },
  'In Progress': { color: 'bg-green-500', dotColor: 'bg-green-500', textColor: 'text-green-700', bgColor: 'bg-green-50' },
  'Done': { color: 'bg-teal-500', dotColor: 'bg-teal-500', textColor: 'text-teal-700', bgColor: 'bg-teal-50' },
  'Overdue': { color: 'bg-red-500', dotColor: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' },
  'QA': { color: 'bg-purple-500', dotColor: 'bg-purple-500', textColor: 'text-purple-700', bgColor: 'bg-purple-50' }
};

// Mock data for technicians
const mockTechnicians = [
  {
    id: 1,
    name: "Mike Rodriguez",
    avatar: null,
    initials: "MR",
    status: "Active",
    capacity: 8,
    currentLoad: 6.5,
    color: "bg-blue-500",
    jobsToday: 4,
    estimatedHours: 6.5,
    utilization: 81,
    phone: "(416) 555-0123",
    skills: ["Pool Opening/Closing", "Equipment Repair", "Chemical Balance"]
  },
  {
    id: 2,
    name: "Jennifer Park",
    avatar: null,
    initials: "JP",
    status: "Active",
    capacity: 8,
    currentLoad: 7.0,
    color: "bg-green-500",
    jobsToday: 5,
    estimatedHours: 7.0,
    utilization: 88,
    phone: "(416) 555-0124",
    skills: ["Weekly Maintenance", "Pool Inspection", "Equipment Install"]
  },
  {
    id: 3,
    name: "David Kim",
    avatar: null,
    initials: "DK",
    status: "Active",
    capacity: 8,
    currentLoad: 4.5,
    color: "bg-purple-500",
    jobsToday: 3,
    estimatedHours: 4.5,
    utilization: 56,
    phone: "(416) 555-0125",
    skills: ["Commercial Service", "Equipment Repair", "Chemical Balance"]
  },
  {
    id: 4,
    name: "Carlos Mendez",
    avatar: null,
    initials: "CM",
    status: "Active",
    capacity: 8,
    currentLoad: 5.5,
    color: "bg-orange-500",
    jobsToday: 4,
    estimatedHours: 5.5,
    utilization: 69,
    phone: "(416) 555-0126",
    skills: ["Pool Opening/Closing", "Weekly Maintenance", "Equipment Install"]
  }
];

// Mock data for unscheduled jobs
const mockUnscheduledJobs = [
  {
    id: 'job-1',
    orderNumber: 'ORD-2024-001',
    customer: "Sarah Johnson",
    address: "15420 Maple Ridge Dr, Richmond Hill",
    serviceType: "Pool Opening",
    jobType: "Opening/Closing",
    timeWindow: "AM",
    estimatedDuration: 4.0,
    priority: "High",
    status: "Unscheduled",
    price: 350,
    tags: ["High Priority", "Chemicals"],
    overdue: false,
    slaWarning: false,
    photosCount: 2,
    source: "Website",
    coordinates: { lat: 43.8828, lng: -79.4403 },
    createdAt: "2024-11-27T10:00:00Z",
    preferredTech: null
  },
  {
    id: 'job-2',
    orderNumber: 'ORD-2024-002',
    customer: "Thompson Family",
    address: "22156 Forest Hill Cres, Mississauga",
    serviceType: "Equipment Repair",
    jobType: "Repair",
    timeWindow: "All-day",
    estimatedDuration: 3.0,
    priority: "Urgent",
    status: "Unscheduled",
    price: 280,
    tags: ["Urgent", "Equipment"],
    overdue: true,
    slaWarning: true,
    photosCount: 5,
    source: "Phone",
    coordinates: { lat: 43.5890, lng: -79.6441 },
    createdAt: "2024-11-26T14:30:00Z",
    preferredTech: 1
  },
  {
    id: 'job-3',
    orderNumber: 'ORD-2024-003',
    customer: "Lisa Wong",
    address: "11234 Cedar Springs Ave, Oakville",
    serviceType: "Weekly Maintenance",
    jobType: "Maintenance",
    timeWindow: "PM",
    estimatedDuration: 2.5,
    priority: "Normal",
    status: "Unscheduled",
    price: 150,
    tags: ["Routine"],
    overdue: false,
    slaWarning: false,
    photosCount: 0,
    source: "App",
    coordinates: { lat: 43.4675, lng: -79.6877 },
    createdAt: "2024-11-27T09:15:00Z",
    preferredTech: 2
  },
  {
    id: 'job-4',
    orderNumber: 'ORD-2024-004',
    customer: "Michael Chen",
    address: "8934 Lakeshore Blvd, Toronto",
    serviceType: "Equipment Install",
    jobType: "Installation",
    timeWindow: "AM",
    estimatedDuration: 5.0,
    priority: "High",
    status: "Unscheduled",
    price: 480,
    tags: ["Installation", "Equipment"],
    overdue: false,
    slaWarning: true,
    photosCount: 3,
    source: "Website",
    coordinates: { lat: 43.6532, lng: -79.3832 },
    createdAt: "2024-11-27T11:45:00Z",
    preferredTech: 3
  }
];

// Mock data for assigned jobs - includes multiple days for week view testing
const mockAssignedJobs = [
  // Today's jobs
  {
    id: 'assigned-1',
    orderNumber: 'ORD-2024-010',
    customer: "Robert Taylor",
    address: "5678 Oak Valley Rd, Burlington",
    serviceType: "Weekly Maintenance",
    jobType: "Maintenance",
    timeWindow: "9:00 AM - 11:00 AM",
    estimatedDuration: 2.0,
    priority: "Normal",
    status: "Scheduled",
    technicianId: 1,
    startTime: "0900",
    endTime: "1100",
    date: (() => {
      const today = new Date();
      return today.toISOString().split('T')[0];
    })(),
    price: 140,
    tags: ["Routine"],
    overdue: false,
    slaWarning: false,
    photosCount: 1,
    source: "App",
    coordinates: { lat: 43.3255, lng: -79.7990 }
  },
  {
    id: 'assigned-2',
    orderNumber: 'ORD-2024-011',
    customer: "Emily Davis",
    address: "9876 Maple Ridge Dr, Brampton",
    serviceType: "Pool Closing",
    jobType: "Opening/Closing",
    timeWindow: "1:00 PM - 4:30 PM",
    estimatedDuration: 3.5,
    priority: "Normal",
    status: "In Progress",
    technicianId: 1,
    startTime: "1300",
    endTime: "1630",
    date: (() => {
      const today = new Date();
      return today.toISOString().split('T')[0];
    })(),
    price: 320,
    tags: ["Seasonal"],
    overdue: false,
    slaWarning: false,
    photosCount: 2,
    source: "Phone",
    coordinates: { lat: 43.7315, lng: -79.7624 }
  },
  {
    id: 'assigned-3',
    orderNumber: 'ORD-2024-012',
    customer: "Anderson Pool Co",
    address: "1234 Industrial Ave, Mississauga",
    serviceType: "Equipment Install",
    jobType: "Installation",
    timeWindow: "10:00 AM - 2:00 PM",
    estimatedDuration: 4.0,
    priority: "High",
    status: "Scheduled",
    technicianId: 2,
    startTime: "1000",
    endTime: "1400",
    date: (() => {
      const today = new Date();
      return today.toISOString().split('T')[0];
    })(),
    price: 520,
    tags: ["Commercial", "Equipment"],
    overdue: false,
    slaWarning: false,
    photosCount: 4,
    source: "Website",
    coordinates: { lat: 43.5890, lng: -79.6441 }
  },
  // Week jobs - dynamically calculated based on today's date
  {
    id: 'week-mon-1',
    orderNumber: 'ORD-WEEK-MON-1',
    customer: "Maria Santos",
    address: "4567 Pine Grove Ave, Richmond Hill", 
    serviceType: "Pool Opening",
    jobType: "Opening/Closing",
    timeWindow: "8:00 AM - 12:00 PM",
    estimatedDuration: 4.0,
    priority: "High",
    status: "Scheduled",
    technicianId: 1,
    startTime: "0800",
    endTime: "1200",
    date: (() => {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Monday
      return startOfWeek.toISOString().split('T')[0];
    })(),
    price: 380,
    tags: ["Opening", "Spring"],
    overdue: false,
    slaWarning: false,
    photosCount: 0,
    source: "Phone",
    coordinates: { lat: 43.8854, lng: -79.4132 }
  },
  {
    id: 'week-tue-1',
    orderNumber: 'ORD-WEEK-TUE-1',
    customer: "Kevin Liu",
    address: "7890 Garden Way, Markham",
    serviceType: "Equipment Repair",
    jobType: "Repair",
    timeWindow: "2:00 PM - 5:00 PM",
    estimatedDuration: 3.0,
    priority: "Urgent",
    status: "Scheduled",
    technicianId: 3,
    startTime: "1400",
    endTime: "1700",
    date: (() => {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay() + 2); // Tuesday
      return startOfWeek.toISOString().split('T')[0];
    })(),
    price: 295,
    tags: ["Urgent", "Pump"],
    overdue: false,
    slaWarning: true,
    photosCount: 3,
    source: "App",
    coordinates: { lat: 43.8561, lng: -79.3370 }
  },
  {
    id: 'week-thu-1',
    orderNumber: 'ORD-WEEK-THU-1',
    customer: "Johnson Family",
    address: "1234 Lakeview Dr, Aurora",
    serviceType: "Weekly Maintenance",
    jobType: "Maintenance",
    timeWindow: "9:00 AM - 11:00 AM",
    estimatedDuration: 2.0,
    priority: "Normal",
    status: "Scheduled",
    technicianId: 2,
    startTime: "0900",
    endTime: "1100",
    date: (() => {
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay() + 4); // Thursday
      return startOfWeek.toISOString().split('T')[0];
    })(),
    price: 150,
    tags: ["Weekly"],
    overdue: false,
    slaWarning: false,
    photosCount: 0,
    source: "Subscription",
    coordinates: { lat: 44.0065, lng: -79.4504 }
  }
];

// Job Card Component
interface JobCardProps {
  job: any;
  size?: 'small' | 'medium';
  isUnscheduled?: boolean;
  isSelected?: boolean;
  onSelect?: (job: any) => void;
  onToggleSelect?: (jobId: string, checked: boolean) => void;
  isDragging?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  size = 'medium', 
  isUnscheduled = false, 
  isSelected = false, 
  onSelect, 
  onToggleSelect,
  isDragging = false 
}) => {
  const statusInfo = statusConfig[job.status as keyof typeof statusConfig];
  const isSmall = size === 'small';
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'border-l-red-500';
      case 'High': return 'border-l-orange-500';
      case 'Normal': return 'border-l-blue-500';
      default: return 'border-l-gray-500';
    }
  };

  const getJobTypeIcon = (type: string) => {
    switch (type) {
      case 'Maintenance': return <Wrench className="w-3 h-3" />;
      case 'Opening/Closing': return <Home className="w-3 h-3" />;
      case 'Repair': return <Settings className="w-3 h-3" />;
      case 'Installation': return <Package className="w-3 h-3" />;
      default: return <Wrench className="w-3 h-3" />;
    }
  };

  return (
    <Card 
      className={`
        cursor-pointer transition-all duration-200 hover:shadow-md border-l-4 ${getPriorityColor(job.priority)}
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${isDragging ? 'opacity-50 transform rotate-2' : ''}
        ${isSmall ? 'mb-1' : 'mb-2'}
        bg-white shadow-sm rounded-lg
      `}
      onClick={() => onSelect?.(job)}
    >
      <CardContent className={isSmall ? "p-2" : "p-3"}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {getJobTypeIcon(job.jobType)}
            <div className={`w-2 h-2 rounded-full ${statusInfo.dotColor} shrink-0`}></div>
            <span className={`font-medium ${isSmall ? 'text-xs' : 'text-sm'} text-gray-900 truncate`}>
              {job.customer}
            </span>
            {job.preferredTech && (
              <Star className="w-3 h-3 text-orange-500 shrink-0" />
            )}
          </div>
          {isUnscheduled && onToggleSelect && (
            <Checkbox 
              checked={isSelected}
              onCheckedChange={(checked) => onToggleSelect(job.id, checked as boolean)}
              onClick={(e) => e.stopPropagation()}
              className="w-3 h-3 shrink-0"
            />
          )}
        </div>
        
        {!isSmall && (
          <p className="text-xs text-gray-600 truncate mb-1">{job.address}</p>
        )}
        
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className={`text-xs px-2 py-0 h-5 ${statusInfo.bgColor} ${statusInfo.textColor}`}>
            {job.serviceType}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            {job.estimatedDuration}h
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-600">{job.timeWindow}</span>
            {job.price && (
              <>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs font-medium text-green-600">${job.price}</span>
              </>
            )}
          </div>
          <div className="flex gap-1">
            {job.photosCount > 0 && (
              <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                <Camera className="w-2 h-2 mr-1" />
                {job.photosCount}
              </Badge>
            )}
            {job.overdue && (
              <Badge className="bg-red-100 text-red-800 text-xs px-1 py-0 h-4">
                Overdue
              </Badge>
            )}
            {job.slaWarning && (
              <Badge className="bg-orange-100 text-orange-800 text-xs px-1 py-0 h-4">
                SLA
              </Badge>
            )}
          </div>
        </div>
        
        {job.tags && job.tags.length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {job.tags.slice(0, 2).map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs px-1 py-0 h-4">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Technician Lane Component
interface TechnicianLaneProps {
  technician: any;
  timeSlots: string[];
  jobs: any[];
  viewMode: 'day' | 'week';
  selectedDate: Date;
  onJobSelect: (job: any) => void;
}

const TechnicianLane: React.FC<TechnicianLaneProps> = ({ 
  technician, 
  timeSlots, 
  jobs, 
  viewMode,
  selectedDate,
  onJobSelect 
}) => {
  return (
    <div className="flex border-b border-gray-100">
      {/* Technician Header */}
      <div className="w-60 p-3 border-r border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3 mb-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className={`text-xs text-white ${technician.color}`}>
              {technician.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm text-gray-900 truncate">{technician.name}</div>
            <div className="text-xs text-gray-500">{technician.phone}</div>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                <MoreHorizontal className="w-3 h-3" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48" align="start">
              <div className="space-y-1">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <Eye className="w-3 h-3 mr-2" />
                  View Route
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <MessageSquare className="w-3 h-3 mr-2" />
                  Message Tech
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <Clock className="w-3 h-3 mr-2" />
                  Block Time
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        {/* KPI Chips */}
        <div className="flex gap-2 mb-2">
          <Badge variant="outline" className="text-xs px-2 py-0 h-5">
            {technician.jobsToday} Jobs
          </Badge>
          <Badge variant="outline" className="text-xs px-2 py-0 h-5">
            {technician.estimatedHours}h Est.
          </Badge>
        </div>
        
        {/* Utilization Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Utilization</span>
            <span>{technician.utilization}%</span>
          </div>
          <Progress value={technician.utilization} className="h-2" />
        </div>
      </div>

      {/* Time Slots */}
      <div className="flex-1 flex">
        {timeSlots.map((timeSlot, index) => {
          let slotJobs = [];
          
          try {
            if (viewMode === 'day') {
              // Day mode: filter by start time
              const timeValue = timeSlot.replace(':', '');
              slotJobs = jobs.filter(job => 
                job.technicianId === technician.id && 
                job.startTime === timeValue
              );
            } else {
              // Week mode: filter by date
              const startOfWeek = new Date(selectedDate);
              startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
              const targetDate = new Date(startOfWeek);
              targetDate.setDate(startOfWeek.getDate() + index);
              const targetDateString = targetDate.toISOString().split('T')[0];
              
              slotJobs = jobs.filter(job => 
                job.technicianId === technician.id && 
                job.date === targetDateString
              );
            }
          } catch (error) {
            console.error('Error filtering jobs:', error);
            slotJobs = [];
          }
          
          return (
            <div 
              key={`${timeSlot}-${index}`}
              className="flex-1 min-w-28 p-2 border-r border-gray-100 min-h-24 bg-white hover:bg-gray-50 transition-colors relative group"
            >
              {slotJobs.map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  size="small" 
                  onSelect={onJobSelect}
                />
              ))}
              {slotJobs.length === 0 && (
                <div className="text-xs text-gray-400 text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Drop here
                </div>
              )}
              {/* Drop zone indicator */}
              <div className="absolute inset-0 border-2 border-dashed border-transparent hover:border-blue-300 transition-colors pointer-events-none rounded"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function JobAssignment() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [currentView, setCurrentView] = useState<'timeline' | 'list'>('timeline');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechnicians, setSelectedTechnicians] = useState<number[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false);
  const [mapSettings, setMapSettings] = useState({
    showTraffic: false,
    clusterMarkers: true,
    showUnassigned: true
  });
  const [savedViews, setSavedViews] = useState<string[]>(['Default View', 'Morning Schedule', 'High Priority Only']);

  const formatDate = (date: Date, mode: 'day' | 'week' = viewMode) => {
    try {
      if (mode === 'day') {
        return date.toLocaleDateString('en-CA', { 
          weekday: 'long', 
          month: 'short', 
          day: 'numeric',
          year: 'numeric'
        });
      } else {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        return `${startOfWeek.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    try {
      const newDate = new Date(selectedDate);
      if (viewMode === 'day') {
        newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 1 : -1));
      } else {
        newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 7 : -7));
      }
      setSelectedDate(newDate);
    } catch (error) {
      console.error('Error navigating date:', error);
    }
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const handleJobSelect = (job: any) => {
    setSelectedJob(job);
    setShowDetailsDrawer(true);
  };

  const handleJobToggleSelect = (jobId: string, checked: boolean) => {
    if (checked) {
      setSelectedJobs([...selectedJobs, jobId]);
    } else {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    }
  };

  const handleTechnicianToggle = (techId: number) => {
    if (selectedTechnicians.includes(techId)) {
      setSelectedTechnicians(selectedTechnicians.filter(id => id !== techId));
    } else {
      setSelectedTechnicians([...selectedTechnicians, techId]);
    }
  };

  const handleStatusToggle = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const filteredUnscheduledJobs = mockUnscheduledJobs.filter(job => {
    const matchesSearch = 
      job.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(job.status);
    
    return matchesSearch && matchesStatus;
  });

  // Generate time slots based on view mode
  const getTimeSlots = () => {
    try {
      if (viewMode === 'day') {
        return ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
      } else {
        // Week mode - generate days of the week
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
        
        const weekDays = [];
        for (let i = 0; i < 7; i++) {
          const day = new Date(startOfWeek);
          day.setDate(startOfWeek.getDate() + i);
          weekDays.push(day.toLocaleDateString('en-CA', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }));
        }
        return weekDays;
      }
    } catch (error) {
      console.error('Error generating time slots:', error);
      return viewMode === 'day' 
        ? ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
        : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
  };

  const timeSlots = getTimeSlots();

  const statusChips = ['Unscheduled', 'Today', 'Overdue', 'Completed'];

  const renderTimelineView = () => (
    <div className="flex-1 overflow-auto">
      {/* Time Header */}
      <div className="sticky top-0 bg-gray-50 border-b border-gray-200 flex z-10">
        <div className="w-60 p-3 font-medium text-sm text-gray-700 border-r border-gray-200">
          Technician
        </div>
        {timeSlots.map(timeSlot => (
          <div key={timeSlot} className="flex-1 min-w-28 p-3 text-center text-sm text-gray-600 border-r border-gray-200">
            {timeSlot}
          </div>
        ))}
      </div>

      {/* Technician Lanes */}
      {mockTechnicians
        .filter(tech => selectedTechnicians.length === 0 || selectedTechnicians.includes(tech.id))
        .map(technician => (
          <TechnicianLane
            key={technician.id}
            technician={technician}
            timeSlots={timeSlots}
            jobs={mockAssignedJobs}
            viewMode={viewMode}
            selectedDate={selectedDate}
            onJobSelect={handleJobSelect}
          />
        ))}
    </div>
  );

  const renderListView = () => (
    <div className="p-4">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer/Address</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Window</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Hours</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[...mockUnscheduledJobs, ...mockAssignedJobs].map((job, index) => {
                const technician = mockTechnicians.find(t => t.id === job.technicianId);
                const statusInfo = statusConfig[job.status as keyof typeof statusConfig];
                
                return (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {job.orderNumber}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div className="font-medium">{job.customer}</div>
                        <div className="text-gray-500">{job.address}</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge variant="secondary" className={`text-xs ${statusInfo.bgColor} ${statusInfo.textColor}`}>
                        {job.serviceType}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {job.timeWindow}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {technician ? (
                        <div className="flex items-center">
                          <Avatar className="w-6 h-6 mr-2">
                            <AvatarFallback className={`text-xs text-white ${technician.color}`}>
                              {technician.initials}
                            </AvatarFallback>
                          </Avatar>
                          {technician.name}
                        </div>
                      ) : (
                        <span className="text-gray-500">Unassigned</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge className={`${statusInfo.color}`}>
                        {job.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {job.estimatedDuration}h
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {job.source}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleJobSelect(job)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="h-full bg-[var(--content-bg)] flex">
        {/* Left Panel - Unscheduled Jobs */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Unscheduled Jobs</h2>
              <Badge variant="secondary" className="text-xs">
                {filteredUnscheduledJobs.length}
              </Badge>
            </div>
            
            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filters */}
            <div className="flex gap-2 flex-wrap mb-3">
              {statusChips.map(status => (
                <Button
                  key={status}
                  variant={selectedStatuses.includes(status) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleStatusToggle(status)}
                  className="text-xs h-7"
                >
                  {status}
                </Button>
              ))}
            </div>

            {/* Bulk Actions */}
            {selectedJobs.length > 0 && (
              <div className="flex gap-2 mb-3">
                <Button size="sm" className="text-xs">
                  Assign Selected ({selectedJobs.length})
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Calendar className="w-3 h-3 mr-1" />
                  Schedule
                </Button>
              </div>
            )}
          </div>

          {/* Jobs List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredUnscheduledJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                isUnscheduled={true}
                isSelected={selectedJobs.includes(job.id)}
                onSelect={handleJobSelect}
                onToggleSelect={handleJobToggleSelect}
              />
            ))}
            {filteredUnscheduledJobs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <CalendarDays className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-sm">No unscheduled jobs found</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Controls */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Date Navigation */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="min-w-48">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(selectedDate)}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          if (date) {
                            setSelectedDate(date);
                            setShowCalendar(false);
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  
                  <Button variant="outline" size="sm" onClick={() => navigateDate('next')}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="outline" size="sm" onClick={goToToday}>
                    Today
                  </Button>
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-md p-1">
                  <Button
                    variant={viewMode === 'day' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('day')}
                    className="text-xs"
                  >
                    Day
                  </Button>
                  <Button
                    variant={viewMode === 'week' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('week')}
                    className="text-xs"
                  >
                    Week
                  </Button>
                </div>

                {/* View Type Toggle */}
                <div className="flex bg-gray-100 rounded-md p-1">
                  <Button
                    variant={currentView === 'timeline' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentView('timeline')}
                    className="text-xs"
                  >
                    <CalendarDays className="w-3 h-3 mr-1" />
                    Timeline
                  </Button>
                  <Button
                    variant={currentView === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentView('list')}
                    className="text-xs"
                  >
                    <Layers className="w-3 h-3 mr-1" />
                    List
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Technician Filter */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Users className="w-4 h-4 mr-2" />
                      Technicians
                      {selectedTechnicians.length > 0 && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {selectedTechnicians.length}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56" align="end">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Filter by Technician</h4>
                      {mockTechnicians.map(tech => (
                        <div key={tech.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`tech-${tech.id}`}
                            checked={selectedTechnicians.includes(tech.id)}
                            onCheckedChange={() => handleTechnicianToggle(tech.id)}
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
                  </PopoverContent>
                </Popover>

                {/* Additional Controls */}
                <Button variant="outline" size="sm">
                  <Route className="w-4 h-4 mr-2" />
                  Optimize Routes
                </Button>
                
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Job
                </Button>
              </div>
            </div>
          </div>

          {/* Main View */}
          {currentView === 'timeline' ? renderTimelineView() : renderListView()}
        </div>

        {/* Job Details Drawer */}
        <Sheet open={showDetailsDrawer} onOpenChange={setShowDetailsDrawer}>
          <SheetContent side="right" className="w-96">
            <SheetHeader>
              <SheetTitle>Job Details</SheetTitle>
              <SheetDescription>
                {selectedJob?.orderNumber} - {selectedJob?.customer}
              </SheetDescription>
            </SheetHeader>
            
            {selectedJob && (
              <div className="py-4 space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Service Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Type:</span>
                      <span>{selectedJob.serviceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority:</span>
                      <Badge variant={selectedJob.priority === 'Urgent' ? 'destructive' : 'secondary'}>
                        {selectedJob.priority}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Duration:</span>
                      <span>{selectedJob.estimatedDuration}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium text-green-600">${selectedJob.price}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Customer & Location</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Customer:</span>
                      <p>{selectedJob.customer}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Address:</span>
                      <p>{selectedJob.address}</p>
                    </div>
                  </div>
                </div>

                {selectedJob.tags && selectedJob.tags.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex gap-1 flex-wrap">
                      {selectedJob.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  );
}