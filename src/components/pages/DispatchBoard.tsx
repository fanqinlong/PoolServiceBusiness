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
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  RefreshCw,
  Settings,
  Home,
  Wrench,
  Droplets,
  Zap,
  Package,
  User,
  Navigation,
  CalendarDays
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar as CalendarComponent } from '../ui/calendar';

// Mock data for technicians
const mockTechnicians = [
  {
    id: 1,
    name: "Mike Rodriguez",
    avatar: null,
    initials: "MR",
    status: "Active",
    capacity: 8,
    currentLoad: 6.5
  },
  {
    id: 2,
    name: "Jennifer Park",
    avatar: null,
    initials: "JP",
    status: "Active",
    capacity: 8,
    currentLoad: 7.0
  },
  {
    id: 3,
    name: "David Kim",
    avatar: null,
    initials: "DK",
    status: "Active",
    capacity: 8,
    currentLoad: 4.5
  },
  {
    id: 4,
    name: "Carlos Mendez",
    avatar: null,
    initials: "CM",
    status: "Active",
    capacity: 8,
    currentLoad: 5.5
  }
];

// Mock data for unscheduled jobs
const mockUnscheduledJobs = [
  {
    id: 'unsch-1',
    customer: "Sarah Johnson",
    address: "15420 Maple Ridge Dr, Richmond Hill",
    serviceType: "Weekly Maintenance",
    timeWindow: "AM",
    estimatedDuration: 2.5,
    priority: "Normal",
    status: "Unscheduled",
    overdue: false,
    slaWarning: false,
    coordinates: { lat: 43.8828, lng: -79.4403 }
  },
  {
    id: 'unsch-2',
    customer: "Thompson Family",
    address: "22156 Forest Hill Cres, Mississauga",
    serviceType: "Equipment Repair",
    timeWindow: "All-day",
    estimatedDuration: 3.0,
    priority: "Urgent",
    status: "Unscheduled",
    overdue: true,
    slaWarning: true,
    coordinates: { lat: 43.5890, lng: -79.6441 }
  },
  {
    id: 'unsch-3',
    customer: "Lisa Wong",
    address: "11234 Cedar Springs Ave, Oakville",
    serviceType: "Pool Opening",
    timeWindow: "PM",
    estimatedDuration: 4.0,
    priority: "High",
    status: "Unscheduled",
    overdue: false,
    slaWarning: true,
    coordinates: { lat: 43.4675, lng: -79.6877 }
  },
  {
    id: 'unsch-4',
    customer: "Michael Chen",
    address: "8934 Lakeshore Blvd, Toronto",
    serviceType: "Chemical Balance",
    timeWindow: "AM",
    estimatedDuration: 1.5,
    priority: "Normal",
    status: "Unscheduled",
    overdue: false,
    slaWarning: false,
    coordinates: { lat: 43.6532, lng: -79.3832 }
  }
];

// Mock data for scheduled jobs - expanded for week view
const mockScheduledJobs = [
  // Monday
  {
    id: 'sch-1',
    customer: "Robert Taylor",
    address: "5678 Oak Valley Rd, Burlington",
    serviceType: "Weekly Maintenance",
    timeWindow: "9:00 AM",
    estimatedDuration: 2.0,
    priority: "Normal",
    status: "Scheduled",
    technicianId: 1,
    startTime: "09:00",
    date: "2024-11-25", // Monday
    overdue: false,
    slaWarning: false,
    coordinates: { lat: 43.3255, lng: -79.7990 }
  },
  {
    id: 'sch-2',
    customer: "Emily Davis",
    address: "9876 Maple Ridge Dr, Brampton",
    serviceType: "Pool Closing",
    timeWindow: "1:00 PM",
    estimatedDuration: 3.5,
    priority: "Normal",
    status: "In Progress",
    technicianId: 1,
    startTime: "13:00",
    date: "2024-11-25", // Monday
    overdue: false,
    slaWarning: false,
    coordinates: { lat: 43.7315, lng: -79.7624 }
  },
  // Tuesday
  {
    id: 'sch-3',
    customer: "Anderson Pool Co",
    address: "1234 Industrial Ave, Mississauga",
    serviceType: "Equipment Install",
    timeWindow: "10:00 AM",
    estimatedDuration: 4.0,
    priority: "High",
    status: "Scheduled",
    technicianId: 2,
    startTime: "10:00",
    date: "2024-11-26", // Tuesday
    overdue: false,
    slaWarning: false,
    coordinates: { lat: 43.5890, lng: -79.6441 }
  },
  // Wednesday
  {
    id: 'sch-4',
    customer: "Green Valley Resort",
    address: "7890 Resort Rd, Oakville",
    serviceType: "Commercial Service",
    timeWindow: "8:00 AM",
    estimatedDuration: 6.0,
    priority: "High",
    status: "Scheduled",
    technicianId: 3,
    startTime: "08:00",
    date: "2024-11-27", // Wednesday
    overdue: false,
    slaWarning: false,
    coordinates: { lat: 43.4675, lng: -79.6877 }
  },
  // Thursday
  {
    id: 'sch-5',
    customer: "Blue Wave Pools",
    address: "5555 Lake Ave, Toronto",
    serviceType: "Weekly Maintenance",
    timeWindow: "11:00 AM",
    estimatedDuration: 2.5,
    priority: "Normal",
    status: "Completed",
    technicianId: 2,
    startTime: "11:00",
    date: "2024-11-28", // Thursday
    overdue: false,
    slaWarning: false,
    coordinates: { lat: 43.6532, lng: -79.3832 }
  },
  // Friday
  {
    id: 'sch-6',
    customer: "Crystal Clear Service",
    address: "3333 Pine St, Burlington",
    serviceType: "Equipment Repair",
    timeWindow: "2:00 PM",
    estimatedDuration: 3.0,
    priority: "Urgent",
    status: "Scheduled",
    technicianId: 4,
    startTime: "14:00",
    date: "2024-11-29", // Friday
    overdue: false,
    slaWarning: false,
    coordinates: { lat: 43.3255, lng: -79.7990 }
  }
];

export function DispatchBoard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTechnician, setFilterTechnician] = useState("all");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const getServiceTypeIcon = (type: string) => {
    switch (type) {
      case 'Weekly Maintenance':
      case 'Bi-weekly Maintenance':
        return <Wrench className="w-3 h-3" />;
      case 'Pool Opening':
      case 'Pool Closing':
        return <Home className="w-3 h-3" />;
      case 'Equipment Repair':
      case 'Equipment Install':
        return <Settings className="w-3 h-3" />;
      case 'Chemical Balance':
        return <Droplets className="w-3 h-3" />;
      case 'Commercial Service':
        return <Package className="w-3 h-3" />;
      default:
        return <Wrench className="w-3 h-3" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-500';
      case 'In Progress':
        return 'bg-yellow-500';
      case 'Completed':
        return 'bg-green-500';
      case 'Overdue':
        return 'bg-red-500';
      case 'Unscheduled':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'border-l-red-500 bg-red-50';
      case 'High':
        return 'border-l-orange-500 bg-orange-50';
      case 'Normal':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatDate = (date: Date, mode: 'day' | 'week' = viewMode) => {
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
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (viewMode === 'day') {
      newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  const handleJobSelect = (jobId: string, checked: boolean) => {
    if (checked) {
      setSelectedJobs([...selectedJobs, jobId]);
    } else {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    }
  };

  const filteredUnscheduledJobs = mockUnscheduledJobs.filter(job => {
    const matchesSearch = 
      job.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = filterPriority === "all" || job.priority === filterPriority;
    const matchesStatus = filterStatus === "all" || job.status === filterStatus;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Get week dates for week view
  const getWeekDates = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      weekDates.push(currentDate);
    }
    return weekDates;
  };

  // Get jobs for specific date
  const getJobsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return mockScheduledJobs.filter(job => job.date === dateString);
  };

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const JobCard = ({ job, isUnscheduled = false, isCompact = false, onSelect }: any) => (
    <Card 
      className={`${isCompact ? 'mb-1' : 'mb-2'} cursor-pointer transition-all duration-200 hover:shadow-md border-l-4 ${getPriorityColor(job.priority)} ${
        selectedJob === job.id ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={() => {
        setSelectedJob(job.id);
        if (onSelect) onSelect(job);
      }}
    >
      <CardContent className={isCompact ? "p-2" : "p-3"}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {getServiceTypeIcon(job.serviceType)}
            <div className={`w-2 h-2 rounded-full ${getStatusColor(job.status)}`}></div>
            <span className={`font-medium ${isCompact ? 'text-xs' : 'text-sm'} text-gray-900 truncate`}>
              {job.customer}
            </span>
          </div>
          {isUnscheduled && (
            <Checkbox 
              checked={selectedJobs.includes(job.id)}
              onCheckedChange={(checked) => handleJobSelect(job.id, checked as boolean)}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </div>
        
        <div className="space-y-1">
          {!isCompact && (
            <p className="text-xs text-gray-600 truncate">{job.address}</p>
          )}
          <div className="flex items-center justify-between">
            <span className={`${isCompact ? 'text-xs' : 'text-xs'} font-medium text-blue-600 truncate`}>
              {job.serviceType}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {job.estimatedDuration}h
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs px-1 py-0">
              {job.timeWindow}
            </Badge>
            <div className="flex gap-1">
              {job.overdue && (
                <Badge className="bg-red-100 text-red-800 text-xs px-1 py-0">
                  <AlertTriangle className="w-2 h-2 mr-1" />
                  Overdue
                </Badge>
              )}
              {job.slaWarning && (
                <Badge className="bg-orange-100 text-orange-800 text-xs px-1 py-0">
                  SLA
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderDayView = () => (
    <div className="flex-1 overflow-auto">
      {/* Time Header */}
      <div className="sticky top-0 bg-gray-50 border-b border-gray-200 flex">
        <div className="w-48 p-3 font-medium text-sm text-gray-700 border-r border-gray-200">
          Technician
        </div>
        {timeSlots.map(time => (
          <div key={time} className="flex-1 min-w-24 p-3 text-center text-sm text-gray-600 border-r border-gray-200">
            {time}
          </div>
        ))}
      </div>

      {/* Technician Rows */}
      {mockTechnicians.map(technician => (
        <div key={technician.id} className="flex border-b border-gray-100">
          {/* Technician Info */}
          <div className="w-48 p-3 border-r border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="text-xs bg-blue-100 text-blue-800">
                  {technician.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm text-gray-900">{technician.name}</div>
                <div className="text-xs text-gray-500">
                  {technician.currentLoad}h / {technician.capacity}h
                </div>
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full"
                  style={{ width: `${(technician.currentLoad / technician.capacity) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="flex-1 flex">
            {timeSlots.map(time => {
              const selectedDateString = selectedDate.toISOString().split('T')[0];
              const scheduledJob = mockScheduledJobs.find(
                job => job.technicianId === technician.id && 
                       job.startTime === time.replace(':', '') &&
                       job.date === selectedDateString
              );
              
              return (
                <div 
                  key={time} 
                  className="flex-1 min-w-24 p-2 border-r border-gray-100 min-h-20 bg-white hover:bg-gray-50 transition-colors"
                >
                  {scheduledJob && (
                    <JobCard job={scheduledJob} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  const renderWeekView = () => {
    const weekDates = getWeekDates(selectedDate);
    
    return (
      <div className="flex-1 overflow-auto">
        {/* Week Header */}
        <div className="sticky top-0 bg-gray-50 border-b border-gray-200 flex">
          <div className="w-48 p-3 font-medium text-sm text-gray-700 border-r border-gray-200">
            Technician
          </div>
          {weekDates.map((date, index) => (
            <div key={index} className="flex-1 min-w-32 p-3 text-center border-r border-gray-200">
              <div className="font-medium text-sm text-gray-700">
                {weekDays[date.getDay()]}
              </div>
              <div className="text-xs text-gray-500">
                {date.getDate()}/{date.getMonth() + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Technician Week Rows */}
        {mockTechnicians.map(technician => (
          <div key={technician.id} className="flex border-b border-gray-100">
            {/* Technician Info */}
            <div className="w-48 p-3 border-r border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs bg-blue-100 text-blue-800">
                    {technician.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm text-gray-900">{technician.name}</div>
                  <div className="text-xs text-gray-500">
                    {technician.currentLoad}h / {technician.capacity}h
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${(technician.currentLoad / technician.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Week Days */}
            <div className="flex-1 flex">
              {weekDates.map((date, index) => {
                const dateString = date.toISOString().split('T')[0];
                const dayJobs = mockScheduledJobs.filter(
                  job => job.technicianId === technician.id && job.date === dateString
                );
                
                return (
                  <div 
                    key={index} 
                    className="flex-1 min-w-32 p-2 border-r border-gray-100 min-h-24 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="space-y-1">
                      {dayJobs.map(job => (
                        <JobCard key={job.id} job={job} isCompact={true} />
                      ))}
                      {dayJobs.length === 0 && (
                        <div className="text-xs text-gray-400 text-center py-2">
                          No jobs
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full bg-[var(--content-bg)] flex flex-col">
      {/* Sticky Header Toolbar */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-medium text-gray-900">Dispatch Board</h1>
            <p className="text-sm text-gray-600">Schedule and manage technician routes</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Route className="w-4 h-4 mr-2" />
              Optimize Routes
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <Users className="w-4 h-4 mr-2" />
              Assign Bulk
            </Button>
          </div>
        </div>

        {/* Date Navigation and Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Date Navigation */}
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="min-w-48 justify-start">
                    <CalendarDays className="w-4 h-4 mr-2" />
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
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Button 
                variant={viewMode === 'day' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('day')}
                className="rounded-r-none"
              >
                Day
              </Button>
              <Button 
                variant={viewMode === 'week' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('week')}
                className="rounded-l-none"
              >
                Week
              </Button>
            </div>

            {/* Filters */}
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Normal">Normal</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterTechnician} onValueChange={setFilterTechnician}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Technician" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Technicians</SelectItem>
                {mockTechnicians.map(tech => (
                  <SelectItem key={tech.id} value={tech.id.toString()}>
                    {tech.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Jobs Actions */}
          {selectedJobs.length > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">{selectedJobs.length} selected</span>
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-1" />
                Assign
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-1" />
                Reschedule
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Three-Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Unscheduled Jobs */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-medium text-gray-900">Unscheduled Jobs</h2>
              <Badge variant="outline" className="text-xs">
                {filteredUnscheduledJobs.length}
              </Badge>
            </div>
            
            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 h-8"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-6 text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Overdue ({mockUnscheduledJobs.filter(j => j.overdue).length})
              </Button>
              <Button variant="outline" size="sm" className="h-6 text-xs">
                SLA ({mockUnscheduledJobs.filter(j => j.slaWarning).length})
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {/* Group by Priority */}
            {['Urgent', 'High', 'Normal'].map(priority => {
              const jobs = filteredUnscheduledJobs.filter(job => job.priority === priority);
              if (jobs.length === 0) return null;
              
              return (
                <div key={priority} className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      priority === 'Urgent' ? 'bg-red-500' :
                      priority === 'High' ? 'bg-orange-500' : 'bg-blue-500'
                    }`}></div>
                    <span className="font-medium text-sm text-gray-700">{priority} Priority</span>
                    <Badge variant="outline" className="text-xs">{jobs.length}</Badge>
                  </div>
                  
                  {jobs.map(job => (
                    <JobCard key={job.id} job={job} isUnscheduled={true} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Panel - Timeline with Technician Swimlanes */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="border-b border-gray-200 p-4">
            <h2 className="font-medium text-gray-900">
              {viewMode === 'day' ? 'Daily Schedule' : 'Weekly Schedule'}
            </h2>
          </div>

          {/* Render Day or Week View */}
          {viewMode === 'day' ? renderDayView() : renderWeekView()}
        </div>

        {/* Right Panel - Map View */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-gray-900">Route Map</h2>
              <Button variant="outline" size="sm">
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="flex-1 bg-gray-100 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Map view showing</p>
                <p className="text-gray-500 text-sm">technician routes</p>
                <p className="text-gray-400 text-xs mt-2">
                  {viewMode === 'day' ? formatDate(selectedDate, 'day') : formatDate(selectedDate, 'week')}
                </p>
              </div>
            </div>

            {/* Route Legend */}
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg border shadow p-3">
              <h3 className="font-medium text-sm text-gray-900 mb-2">
                {viewMode === 'day' ? "Today's Routes" : "Week Routes"}
              </h3>
              <div className="space-y-2">
                {mockTechnicians.slice(0, 2).map(tech => (
                  <div key={tech.id} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-${tech.id === 1 ? 'blue' : 'green'}-500`}></div>
                    <span className="text-xs text-gray-700">{tech.name}</span>
                    <span className="text-xs text-gray-500">
                      ({viewMode === 'day' 
                        ? mockScheduledJobs.filter(j => j.technicianId === tech.id && j.date === selectedDate.toISOString().split('T')[0]).length
                        : mockScheduledJobs.filter(j => j.technicianId === tech.id).length
                      } stops)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Route Stats */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {viewMode === 'day' 
                    ? mockScheduledJobs.filter(j => j.date === selectedDate.toISOString().split('T')[0]).length + filteredUnscheduledJobs.length
                    : mockScheduledJobs.length + filteredUnscheduledJobs.length
                  }
                </div>
                <div className="text-xs text-gray-500">Total Jobs</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">
                  {viewMode === 'day' 
                    ? mockScheduledJobs.filter(j => j.date === selectedDate.toISOString().split('T')[0]).length
                    : mockScheduledJobs.length
                  }
                </div>
                <div className="text-xs text-gray-500">Scheduled</div>
              </div>
              <div>
                <div className="text-lg font-bold text-orange-600">{filteredUnscheduledJobs.length}</div>
                <div className="text-xs text-gray-500">Unscheduled</div>
              </div>
              <div>
                <div className="text-lg font-bold text-blue-600">4.2</div>
                <div className="text-xs text-gray-500">Avg. Route</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}