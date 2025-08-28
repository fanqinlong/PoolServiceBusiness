import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Edit,
  Camera,
  FileText,
  MessageSquare,
  Activity,
  CheckSquare,
  User,
  Users,
  List,
  CalendarDays,
  Download,
  Trash2,
  Archive,
  Star,
  MapPin,
  Phone,
  Mail,
  Paperclip,
  Play,
  Navigation,
  Upload,
  Settings,
  DollarSign,
  Package,
  FileX,
  ChevronDown,
  X,
  Droplets,
  Beaker,
  Wrench,
  Home,
  Target,
  AlertCircle,
  Info,
  ChevronUp
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Textarea } from '../ui/textarea';
import { Skeleton } from '../ui/skeleton';

// Status configurations with specific colors as requested
const statusConfig = {
  'To Start': { color: 'bg-gray-500', dotColor: 'bg-gray-500', textColor: 'text-gray-700', bgColor: 'bg-gray-50' },
  'In Progress': { color: 'bg-blue-500', dotColor: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-50' },
  'Needs Recheck': { color: 'bg-purple-500', dotColor: 'bg-purple-500', textColor: 'text-purple-700', bgColor: 'bg-purple-50' },
  'Completed': { color: 'bg-teal-500', dotColor: 'bg-teal-500', textColor: 'text-teal-700', bgColor: 'bg-teal-50' },
  'Overdue': { color: 'bg-red-500', dotColor: 'bg-red-500', textColor: 'text-red-700', bgColor: 'bg-red-50' }
};

const priorityConfig = {
  'Low': { color: 'border-l-gray-400', badge: 'bg-gray-100 text-gray-700' },
  'Medium': { color: 'border-l-yellow-500', badge: 'bg-yellow-100 text-yellow-800' },
  'High': { color: 'border-l-red-500', badge: 'bg-red-100 text-red-800' }
};

// Mock technicians data
const mockTechnicians = [
  { id: 1, name: 'Mike Rodriguez', initials: 'MR', color: 'bg-blue-500', phone: '(416) 555-0123' },
  { id: 2, name: 'Jennifer Park', initials: 'JP', color: 'bg-green-500', phone: '(416) 555-0124' },
  { id: 3, name: 'David Kim', initials: 'DK', color: 'bg-purple-500', phone: '(416) 555-0125' },
  { id: 4, name: 'Carlos Mendez', initials: 'CM', color: 'bg-orange-500', phone: '(416) 555-0126' },
  { id: 5, name: 'Sarah Thompson', initials: 'ST', color: 'bg-pink-500', phone: '(416) 555-0127' }
];

// Comprehensive seed data with mixed task types
const mockTasks = [
  {
    id: 'task-1',
    type: 'Work Order',
    orderNumber: 'WO-2024-001',
    title: 'Pool Opening Service',
    customer: 'Sarah Johnson',
    pool: 'Main Pool - Residential',
    address: '15420 Maple Ridge Dr, Richmond Hill',
    timeWindow: '9:00 AM - 11:00 AM',
    dueDate: '2024-12-30T09:00:00Z',
    slaStatus: 'On Time',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Mike Rodriguez',
    assigneeId: 1,
    source: 'Portal',
    estimatedHours: 2.5,
    completionRate: 65,
    tags: ['Opening', 'Seasonal'],
    description: 'Complete pool opening procedure including equipment startup and chemical balancing',
    city: 'Richmond Hill',
    billable: true,
    checklist: [
      { id: 1, item: 'Remove pool cover', completed: true },
      { id: 2, item: 'Clean and inspect equipment', completed: true },
      { id: 3, item: 'Start filtration system', completed: false },
      { id: 4, item: 'Test and balance chemicals', completed: false },
      { id: 5, item: 'Document readings', completed: false }
    ],
    notes: 'Customer requested early opening due to warm weather',
    photos: 3,
    customerPhone: '(416) 555-0123',
    customerEmail: 'sarah.johnson@email.com',
    materials: [
      { name: 'Chlorine Shock', quantity: 2, unit: 'lbs' },
      { name: 'pH Adjuster', quantity: 1, unit: 'bottle' }
    ]
  },
  {
    id: 'task-2',
    type: 'Task',
    orderNumber: null,
    title: 'Restock Chemical Supplies',
    customer: null,
    pool: null,
    address: 'Warehouse - 123 Industrial Ave',
    timeWindow: 'All Day',
    dueDate: '2024-12-30T17:00:00Z',
    slaStatus: 'Due Today',
    status: 'To Start',
    priority: 'Low',
    assignee: 'David Kim',
    assigneeId: 3,
    source: 'Manual',
    estimatedHours: 1.0,
    completionRate: 0,
    tags: ['Inventory', 'Non-billable'],
    description: 'Restock truck with chlorine, pH adjusters, and testing supplies',
    city: 'Mississauga',
    billable: false,
    checklist: [
      { id: 1, item: 'Check current inventory levels', completed: false },
      { id: 2, item: 'Load chlorine containers', completed: false },
      { id: 3, item: 'Load pH adjustment chemicals', completed: false },
      { id: 4, item: 'Update inventory system', completed: false }
    ],
    notes: 'Priority: chlorine is running low across all trucks',
    photos: 0,
    materials: []
  },
  {
    id: 'task-3',
    type: 'Work Order',
    orderNumber: 'WO-2024-002',
    title: 'Equipment Repair - Pump Replacement',
    customer: 'Thompson Family',
    pool: 'Backyard Pool - Residential',
    address: '22156 Forest Hill Cres, Mississauga',
    timeWindow: '2:00 PM - 5:00 PM',
    dueDate: '2024-12-29T14:00:00Z',
    slaStatus: 'Overdue',
    status: 'Overdue',
    priority: 'High',
    assignee: 'Jennifer Park',
    assigneeId: 2,
    source: 'Dispatcher',
    estimatedHours: 3.0,
    completionRate: 25,
    tags: ['Repair', 'Equipment', 'Urgent'],
    description: 'Replace malfunctioning pool pump - customer reports no water circulation',
    city: 'Mississauga',
    billable: true,
    checklist: [
      { id: 1, item: 'Diagnose pump issue', completed: true },
      { id: 2, item: 'Order replacement pump', completed: false },
      { id: 3, item: 'Install new pump', completed: false },
      { id: 4, item: 'Test system operation', completed: false },
      { id: 5, item: 'Update equipment records', completed: false }
    ],
    notes: 'Pump motor seized - replacement required. Customer approved estimate.',
    photos: 2,
    customerPhone: '(416) 555-0124',
    customerEmail: 'thompson.family@email.com',
    materials: [
      { name: 'Pool Pump 1.5HP', quantity: 1, unit: 'unit' },
      { name: 'PVC Coupling', quantity: 2, unit: 'pieces' }
    ]
  },
  {
    id: 'task-4',
    type: 'Task',
    orderNumber: null,
    title: 'Photo Upload Fix - Johnson Pool',
    customer: 'Sarah Johnson',
    pool: 'Main Pool - Residential',
    address: '15420 Maple Ridge Dr, Richmond Hill',
    timeWindow: 'All Day',
    dueDate: '2024-12-30T18:00:00Z',
    slaStatus: 'Due Today',
    status: 'To Start',
    priority: 'Low',
    assignee: 'Mike Rodriguez',
    assigneeId: 1,
    source: 'Rule',
    estimatedHours: 0.5,
    completionRate: 0,
    tags: ['Photo', 'Documentation', 'Non-billable'],
    description: 'Re-upload photos from yesterday\'s service visit - app sync failed',
    city: 'Richmond Hill',
    billable: false,
    checklist: [
      { id: 1, item: 'Locate photos on device', completed: false },
      { id: 2, item: 'Upload to customer record', completed: false },
      { id: 3, item: 'Verify photo sync', completed: false }
    ],
    notes: 'App crashed during photo upload - need to manually sync 4 photos',
    photos: 4,
    customerPhone: '(416) 555-0123',
    customerEmail: 'sarah.johnson@email.com',
    materials: []
  },
  {
    id: 'task-5',
    type: 'Work Order',
    orderNumber: 'WO-2024-003',
    title: 'Weekly Pool Maintenance',
    customer: 'Michael Chen',
    pool: 'Lap Pool - Residential',
    address: '8934 Lakeshore Blvd, Toronto',
    timeWindow: '10:00 AM - 11:30 AM',
    dueDate: '2024-12-30T10:00:00Z',
    slaStatus: 'On Time',
    status: 'Completed',
    priority: 'Medium',
    assignee: 'Carlos Mendez',
    assigneeId: 4,
    source: 'Portal',
    estimatedHours: 1.5,
    completionRate: 100,
    tags: ['Maintenance', 'Weekly'],
    description: 'Regular weekly maintenance including cleaning and chemical testing',
    city: 'Toronto',
    billable: true,
    checklist: [
      { id: 1, item: 'Skim surface debris', completed: true },
      { id: 2, item: 'Empty skimmer baskets', completed: true },
      { id: 3, item: 'Brush walls and floor', completed: true },
      { id: 4, item: 'Test water chemistry', completed: true },
      { id: 5, item: 'Add chemicals as needed', completed: true },
      { id: 6, item: 'Update service log', completed: true }
    ],
    notes: 'Pool in excellent condition. Slight pH adjustment made.',
    photos: 2,
    customerPhone: '(416) 555-0125',
    customerEmail: 'mchen@email.com',
    materials: [
      { name: 'pH Down', quantity: 0.5, unit: 'lbs' }
    ]
  },
  {
    id: 'task-6',
    type: 'Task',
    orderNumber: null,
    title: 'Customer Call-back - Equipment Question',
    customer: 'Lisa Wong',
    pool: 'Spa Pool - Residential',
    address: null,
    timeWindow: 'AM',
    dueDate: '2024-12-30T12:00:00Z',
    slaStatus: 'Due Today',
    status: 'In Progress',
    priority: 'Medium',
    assignee: 'Sarah Thompson',
    assigneeId: 5,
    source: 'Manual',
    estimatedHours: 0.5,
    completionRate: 50,
    tags: ['Call-back', 'Customer Service', 'Non-billable'],
    description: 'Customer has questions about new heater operation and maintenance schedule',
    city: 'Oakville',
    billable: false,
    checklist: [
      { id: 1, item: 'Review customer account', completed: true },
      { id: 2, item: 'Call customer', completed: false },
      { id: 3, item: 'Answer questions', completed: false },
      { id: 4, item: 'Update customer notes', completed: false }
    ],
    notes: 'Customer installed new heater last week - needs operational guidance',
    photos: 0,
    customerPhone: '(416) 555-0126',
    customerEmail: 'lisa.wong@email.com',
    materials: []
  },
  {
    id: 'task-7',
    type: 'Work Order',
    orderNumber: 'WO-2024-004',
    title: 'Pool Closing Service',
    customer: 'Robert Smith',
    pool: 'Main Pool - Residential',
    address: '456 Elm Street, Vaughan',
    timeWindow: '1:00 PM - 4:00 PM',
    dueDate: '2024-12-31T13:00:00Z',
    slaStatus: 'On Time',
    status: 'To Start',
    priority: 'Medium',
    assignee: 'Mike Rodriguez',
    assigneeId: 1,
    source: 'Portal',
    estimatedHours: 3.0,
    completionRate: 0,
    tags: ['Closing', 'Seasonal'],
    description: 'End-of-season pool closing including equipment winterization',
    city: 'Vaughan',
    billable: true,
    checklist: [
      { id: 1, item: 'Balance water chemistry', completed: false },
      { id: 2, item: 'Lower water level', completed: false },
      { id: 3, item: 'Drain equipment', completed: false },
      { id: 4, item: 'Add winterizing chemicals', completed: false },
      { id: 5, item: 'Install winter cover', completed: false }
    ],
    notes: 'Customer wants to schedule for next week if possible',
    photos: 0,
    customerPhone: '(416) 555-0127',
    customerEmail: 'robert.smith@email.com',
    materials: [
      { name: 'Winter Chemical Kit', quantity: 1, unit: 'kit' },
      { name: 'Pool Cover', quantity: 1, unit: 'cover' }
    ]
  },
  {
    id: 'task-8',
    type: 'Task',
    orderNumber: null,
    title: 'QA Review - Weekly Routes',
    customer: null,
    pool: null,
    address: 'Office - 789 Business Park Dr',
    timeWindow: 'PM',
    dueDate: '2024-12-30T16:00:00Z',
    slaStatus: 'Due Today',
    status: 'To Start',
    priority: 'Low',
    assignee: 'Jennifer Park',
    assigneeId: 2,
    source: 'Rule',
    estimatedHours: 1.0,
    completionRate: 0,
    tags: ['QA', 'Review', 'Non-billable'],
    description: 'Review this week\'s service reports for quality assurance',
    city: 'Mississauga',
    billable: false,
    checklist: [
      { id: 1, item: 'Review service reports', completed: false },
      { id: 2, item: 'Check photo documentation', completed: false },
      { id: 3, item: 'Verify chemical readings', completed: false },
      { id: 4, item: 'Flag any issues', completed: false }
    ],
    notes: 'Weekly QA review - focus on new technician work',
    photos: 0,
    materials: []
  },
  {
    id: 'task-9',
    type: 'Work Order',
    orderNumber: 'WO-2024-005',
    title: 'Equipment Installation - New Filter',
    customer: 'Anderson Pool Co',
    pool: 'Commercial Pool - Hotel',
    address: '1234 Hotel Drive, Brampton',
    timeWindow: '8:00 AM - 12:00 PM',
    dueDate: '2024-12-31T08:00:00Z',
    slaStatus: 'On Time',
    status: 'In Progress',
    priority: 'High',
    assignee: 'David Kim',
    assigneeId: 3,
    source: 'Dispatcher',
    estimatedHours: 4.0,
    completionRate: 40,
    tags: ['Installation', 'Commercial', 'Equipment'],
    description: 'Install new commercial-grade sand filter system',
    city: 'Brampton',
    billable: true,
    checklist: [
      { id: 1, item: 'Remove old filter system', completed: true },
      { id: 2, item: 'Install new filter tank', completed: true },
      { id: 3, item: 'Connect plumbing', completed: false },
      { id: 4, item: 'Install control valve', completed: false },
      { id: 5, item: 'Test system operation', completed: false },
      { id: 6, item: 'Train facility staff', completed: false }
    ],
    notes: 'Commercial installation - coordinate with hotel maintenance team',
    photos: 1,
    customerPhone: '(416) 555-0128',
    customerEmail: 'maintenance@andersonhotel.com',
    materials: [
      { name: 'Commercial Sand Filter', quantity: 1, unit: 'unit' },
      { name: 'Filter Sand', quantity: 500, unit: 'lbs' },
      { name: 'PVC Pipe', quantity: 20, unit: 'feet' }
    ]
  },
  {
    id: 'task-10',
    type: 'Task',
    orderNumber: null,
    title: 'Equipment Check - Service Vehicle',
    customer: null,
    pool: null,
    address: 'Depot - 555 Service Road',
    timeWindow: '7:00 AM - 8:00 AM',
    dueDate: '2024-12-30T07:00:00Z',
    slaStatus: 'Due Today',
    status: 'To Start',
    priority: 'Low',
    assignee: 'Carlos Mendez',
    assigneeId: 4,
    source: 'Rule',
    estimatedHours: 1.0,
    completionRate: 0,
    tags: ['Vehicle', 'Equipment', 'Non-billable'],
    description: 'Daily vehicle and equipment inspection before service calls',
    city: 'Mississauga',
    billable: false,
    checklist: [
      { id: 1, item: 'Check fluid levels', completed: false },
      { id: 2, item: 'Inspect equipment', completed: false },
      { id: 3, item: 'Verify chemical inventory', completed: false },
      { id: 4, item: 'Test equipment operation', completed: false }
    ],
    notes: 'Daily pre-service vehicle inspection',
    photos: 0,
    materials: []
  },
  {
    id: 'task-11',
    type: 'Work Order',
    orderNumber: 'WO-2024-006',
    title: 'Emergency Algae Treatment',
    customer: 'Green Valley Resort',
    pool: 'Resort Pool Complex',
    address: '999 Resort Blvd, Collingwood',
    timeWindow: 'All Day',
    dueDate: '2024-12-29T08:00:00Z',
    slaStatus: 'Overdue',
    status: 'Needs Recheck',
    priority: 'High',
    assignee: 'Sarah Thompson',
    assigneeId: 5,
    source: 'Portal',
    estimatedHours: 6.0,
    completionRate: 75,
    tags: ['Emergency', 'Algae', 'Commercial'],
    description: 'Treat severe algae outbreak in resort pool complex',
    city: 'Collingwood',
    billable: true,
    checklist: [
      { id: 1, item: 'Test water chemistry', completed: true },
      { id: 2, item: 'Shock treatment application', completed: true },
      { id: 3, item: 'Algaecide application', completed: true },
      { id: 4, item: 'Brush all surfaces', completed: true },
      { id: 5, item: 'Monitor filtration', completed: false },
      { id: 6, item: 'Retest and adjust', completed: false }
    ],
    notes: 'Initial treatment complete - needs recheck in 24h to verify clearing',
    photos: 8,
    customerPhone: '(705) 555-0129',
    customerEmail: 'maintenance@greenvalleyresort.com',
    materials: [
      { name: 'Liquid Chlorine', quantity: 20, unit: 'gallons' },
      { name: 'Algaecide', quantity: 4, unit: 'quarts' },
      { name: 'pH Adjuster', quantity: 10, unit: 'lbs' }
    ]
  },
  {
    id: 'task-12',
    type: 'Work Order',
    orderNumber: null,
    title: 'Hot Tub Service',
    customer: 'Maria Santos',
    pool: 'Spa/Hot Tub - Residential',
    address: '4567 Pine Grove Ave, Richmond Hill',
    timeWindow: '3:00 PM - 4:00 PM',
    dueDate: '2024-12-30T15:00:00Z',
    slaStatus: 'On Time',
    status: 'To Start',
    priority: 'Medium',
    assignee: null,
    assigneeId: null,
    source: 'Portal',
    estimatedHours: 1.0,
    completionRate: 0,
    tags: ['Hot Tub', 'Maintenance', 'Unscheduled'],
    description: 'Regular hot tub maintenance and chemical balancing',
    city: 'Richmond Hill',
    billable: true,
    checklist: [
      { id: 1, item: 'Clean filter cartridge', completed: false },
      { id: 2, item: 'Test water chemistry', completed: false },
      { id: 3, item: 'Add sanitizer', completed: false },
      { id: 4, item: 'Check jets operation', completed: false }
    ],
    notes: 'Customer reports cloudy water - likely needs filter cleaning',
    photos: 0,
    customerPhone: '(416) 555-0130',
    customerEmail: 'maria.santos@email.com',
    materials: [
      { name: 'Spa Shock', quantity: 1, unit: 'bottle' },
      { name: 'Spa pH Down', quantity: 1, unit: 'bottle' }
    ]
  }
];

// Task Card Component for calendar view
interface TaskCardProps {
  task: any;
  size?: 'small' | 'medium';
  onSelect?: (task: any) => void;
  showTime?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  size = 'small', 
  onSelect,
  showTime = true
}) => {
  const statusInfo = statusConfig[task.status as keyof typeof statusConfig];
  const priorityInfo = priorityConfig[task.priority as keyof typeof priorityConfig];
  
  const getTypeIcon = (type: string) => {
    if (type === 'Work Order') {
      return <Wrench className="w-3 h-3 text-blue-600" />;
    }
    return <CheckSquare className="w-3 h-3 text-gray-600" />;
  };

  const formatDuration = (hours: number) => {
    if (hours >= 1) return `${hours}h`;
    return `${Math.round(hours * 60)}m`;
  };

  return (
    <Card 
      className={`
        cursor-pointer transition-all duration-200 hover:shadow-md border-l-4 ${priorityInfo.color}
        bg-white shadow-sm rounded-lg mb-2 ${size === 'small' ? 'p-2' : 'p-3'}
      `}
      onClick={() => onSelect?.(task)}
    >
      <CardContent className="p-0">
        <div className="flex items-start justify-between mb-1">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {getTypeIcon(task.type)}
            <div className={`w-2 h-2 rounded-full ${statusInfo.dotColor} shrink-0`}></div>
            <Badge variant="outline" className="text-xs px-1 py-0 h-4 shrink-0">
              {task.type}
            </Badge>
            {task.priority === 'High' && <AlertTriangle className="w-3 h-3 text-red-500 shrink-0" />}
          </div>
        </div>
        
        <div className="mb-1">
          <p className="text-xs font-medium text-gray-900 truncate">{task.title}</p>
          {task.customer && (
            <p className="text-xs text-gray-600 truncate">{task.customer}</p>
          )}
          {task.address && (
            <p className="text-xs text-gray-500 truncate">{task.address}</p>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-gray-500">
            {showTime && (
              <>
                <Clock className="w-3 h-3" />
                <span>{task.timeWindow}</span>
                <span>•</span>
              </>
            )}
            <span>{formatDuration(task.estimatedHours)}</span>
          </div>
          <Badge className={`${statusInfo.color} text-white text-xs px-1 py-0 h-4`}>
            {task.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

// Skeleton loader components
const TableRowSkeleton = () => (
  <tr className="border-b border-gray-200">
    <td className="px-4 py-3"><Skeleton className="h-4 w-4" /></td>
    <td className="px-4 py-3">
      <div className="flex items-center gap-2">
        <Skeleton className="h-3 w-3 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
    </td>
    <td className="px-4 py-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-3 w-32 mt-1" />
    </td>
    <td className="px-4 py-3"><Skeleton className="h-4 w-20" /></td>
    <td className="px-4 py-3"><Skeleton className="h-5 w-16" /></td>
    <td className="px-4 py-3"><Skeleton className="h-5 w-14" /></td>
    <td className="px-4 py-3"><Skeleton className="h-5 w-12" /></td>
    <td className="px-4 py-3"><Skeleton className="h-6 w-16" /></td>
    <td className="px-4 py-3"><Skeleton className="h-4 w-16" /></td>
    <td className="px-4 py-3">
      <div className="flex gap-1">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
      </div>
    </td>
  </tr>
);

export function MyTasks() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateRange, setDateRange] = useState<{ from: Date; to?: Date }>({ from: new Date() });
  const [dateScope, setDateScope] = useState<'today' | 'week' | 'range'>('today');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [scope, setScope] = useState<'me' | 'team'>('me');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTaskDrawer, setShowTaskDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter states
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('');
  const [sourceFilter, setSourceFilter] = useState<string>('');
  const [cityFilter, setCityFilter] = useState<string>('');
  
  // Quick filter states
  const [quickFilter, setQuickFilter] = useState<string>('');
  
  // Unscheduled tray collapsed state
  const [unscheduledCollapsed, setUnscheduledCollapsed] = useState(false);

  const handleTaskSelect = (task: any) => {
    setSelectedTask(task);
    setShowTaskDrawer(true);
  };

  const handleTaskToggleSelect = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks([...selectedTasks, taskId]);
    } else {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    }
  };

  const handleBulkSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTasks(filteredTasks.map(t => t.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const formatDateDisplay = () => {
    if (dateScope === 'today') {
      return selectedDate.toLocaleDateString('en-CA', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } else if (dateScope === 'week') {
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    } else {
      if (dateRange.to) {
        return `${dateRange.from.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })} - ${dateRange.to.toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      }
      return dateRange.from.toLocaleDateString('en-CA', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    if (dateScope === 'today') {
      newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (dateScope === 'week') {
      newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    setSelectedDate(newDate);
  };

  const getDueBadgeColor = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 0) return 'bg-red-100 text-red-800'; // Overdue
    if (diffHours <= 24) return 'bg-orange-100 text-orange-800'; // Due ≤ 24h
    return 'bg-green-100 text-green-800'; // On time
  };

  const getDueBadgeText = (slaStatus: string, dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 0) return 'Overdue';
    if (diffHours <= 24) return 'Due Today';
    return slaStatus;
  };

  const filteredTasks = mockTasks.filter(task => {
    // Search filter
    const matchesSearch = !searchQuery || 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.customer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.pool?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.address?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type filter
    const matchesType = !typeFilter || task.type === typeFilter;
    
    // Status filter
    const matchesStatus = !statusFilter || task.status === statusFilter;
    
    // Priority filter
    const matchesPriority = !priorityFilter || task.priority === priorityFilter;
    
    // Assignee filter
    const matchesAssignee = !assigneeFilter || task.assignee === assigneeFilter;
    
    // Source filter
    const matchesSource = !sourceFilter || task.source === sourceFilter;
    
    // City filter
    const matchesCity = !cityFilter || task.city === cityFilter;
    
    // Scope filter
    const matchesScope = scope === 'team' || task.assignee === 'Mike Rodriguez'; // Assume current user is Mike
    
    // Quick filters
    const matchesQuick = !quickFilter || (
      (quickFilter === 'overdue' && task.status === 'Overdue') ||
      (quickFilter === 'due-today' && task.slaStatus === 'Due Today') ||
      (quickFilter === 'unscheduled' && !task.assigneeId) ||
      (quickFilter === 'completed' && task.status === 'Completed')
    );
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority && 
           matchesAssignee && matchesSource && matchesCity && matchesScope && matchesQuick;
  });

  const quickFilterCounts = {
    overdue: mockTasks.filter(t => t.status === 'Overdue').length,
    dueToday: mockTasks.filter(t => t.slaStatus === 'Due Today').length,
    unscheduled: mockTasks.filter(t => !t.assigneeId).length,
    completed: mockTasks.filter(t => t.status === 'Completed').length
  };

  const getTimeSlots = () => {
    if (dateScope === 'today') {
      return ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    } else {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }
  };

  const renderListView = () => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                <Checkbox 
                  checked={selectedTasks.length === filteredTasks.length && filteredTasks.length > 0}
                  onCheckedChange={handleBulkSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer / Pool</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Window</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SLA / Due</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => <TableRowSkeleton key={i} />)
            ) : filteredTasks.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center">
                    <CheckSquare className="w-12 h-12 text-gray-300 mb-4" />
                    <h3 className="text-sm font-medium text-gray-900 mb-2">No tasks found</h3>
                    <p className="text-sm text-gray-500 mb-4">Create a new task or adjust your filters</p>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Task
                    </Button>
                  </div>
                </td>
              </tr>
            ) : (
              filteredTasks.map((task) => {
                const statusInfo = statusConfig[task.status as keyof typeof statusConfig];
                const priorityInfo = priorityConfig[task.priority as keyof typeof priorityConfig];
                const isSelected = selectedTasks.includes(task.id);
                const assignee = mockTechnicians.find(t => t.id === task.assigneeId);
                
                return (
                  <tr 
                    key={task.id} 
                    className={`hover:bg-gray-50 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50' : ''}`}
                    onClick={() => handleTaskSelect(task)}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={(checked) => handleTaskToggleSelect(task.id, checked as boolean)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {task.type === 'Work Order' ? (
                          <Wrench className="w-4 h-4 text-blue-600" />
                        ) : (
                          <CheckSquare className="w-4 h-4 text-gray-600" />
                        )}
                        <div className={`w-2 h-2 rounded-full ${statusInfo.dotColor}`} aria-label={task.status}></div>
                        <div>
                          <Badge variant="outline" className="text-xs">
                            {task.type}
                          </Badge>
                          {task.orderNumber && (
                            <div className="text-xs text-gray-500 mt-1">{task.orderNumber}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {task.customer || 'Internal Task'}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-48">
                          {task.pool || task.address || 'No location'}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {task.timeWindow}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div>
                        <div className="text-sm text-gray-900">
                          {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <Badge 
                          className={`text-xs ${getDueBadgeColor(task.dueDate)}`}
                        >
                          {getDueBadgeText(task.slaStatus, task.dueDate)}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge className={`${statusInfo.color} text-white`}>
                        {task.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge className={priorityInfo.badge}>
                        {task.priority}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {assignee ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className={`text-xs text-white ${assignee.color}`}>
                              {assignee.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-900 truncate max-w-24">
                            {assignee.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Unassigned</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {task.source}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Play className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Start</TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Navigation className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Navigate</TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Upload className="w-4 h-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Upload Photo</TooltipContent>
                        </Tooltip>
                        
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-48" align="end">
                            <div className="space-y-1">
                              <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                                <CheckCircle className="w-3 h-3 mr-2" />
                                Complete
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                                <Edit className="w-3 h-3 mr-2" />
                                Edit
                              </Button>
                              <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                                <User className="w-3 h-3 mr-2" />
                                Reassign
                              </Button>
                              {task.billable && (
                                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                                  <DollarSign className="w-3 h-3 mr-2" />
                                  Create Invoice
                                </Button>
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCalendarView = () => {
    const timeSlots = getTimeSlots();
    const unscheduledTasks = filteredTasks.filter(t => !t.assigneeId);
    
    if (isLoading) {
      return (
        <div className="flex h-full">
          <div className="w-80 bg-white border-r border-gray-200 p-4">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className="h-12 bg-gray-50 border-b flex">
              <Skeleton className="w-60 h-full" />
              <div className="flex-1 flex">
                {timeSlots.map((_, i) => (
                  <Skeleton key={i} className="flex-1 h-full border-r" />
                ))}
              </div>
            </div>
            <div className="space-y-0">
              {mockTechnicians.slice(0, 3).map((_, i) => (
                <div key={i} className="flex border-b">
                  <Skeleton className="w-60 h-24" />
                  <div className="flex-1 flex">
                    {timeSlots.map((_, j) => (
                      <Skeleton key={j} className="flex-1 h-24 border-r" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (filteredTasks.length === 0) {
      return (
        <div className="flex h-full">
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900">Unscheduled</h3>
                <Badge variant="outline" className="text-xs">0</Badge>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-sm font-medium text-gray-900 mb-2">Nothing scheduled</h3>
                <p className="text-sm text-gray-500">Drag tasks from Unscheduled to schedule them</p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
              <p className="text-sm text-gray-500 mb-4">Create a new task or adjust your filters</p>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex h-full">
        {/* Unscheduled Tasks Tray */}
        <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${unscheduledCollapsed ? 'w-12' : 'w-80'}`}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            {!unscheduledCollapsed && (
              <>
                <h3 className="font-medium text-gray-900">Unscheduled</h3>
                <Badge variant="outline" className="text-xs">
                  {unscheduledTasks.length}
                </Badge>
              </>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setUnscheduledCollapsed(!unscheduledCollapsed)}
              className="h-6 w-6 p-0"
            >
              {unscheduledCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
          
          {!unscheduledCollapsed && (
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {unscheduledTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  size="small"
                  onSelect={handleTaskSelect}
                  showTime={false}
                />
              ))}
              {unscheduledTasks.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">All tasks assigned</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Calendar Timeline */}
        <div className="flex-1 overflow-auto">
          {/* Time Header */}
          <div className="sticky top-0 bg-gray-50 border-b border-gray-200 flex z-10">
            <div className="w-60 p-3 font-medium text-sm text-gray-700 border-r border-gray-200">
              {scope === 'team' ? 'Technician' : 'Schedule'}
            </div>
            {timeSlots.map(timeSlot => (
              <div key={timeSlot} className="flex-1 min-w-32 p-3 text-center text-sm text-gray-600 border-r border-gray-200">
                {timeSlot}
              </div>
            ))}
          </div>

          {/* Technician Lanes or Single Lane */}
          {scope === 'team' ? (
            mockTechnicians.map(technician => (
              <div key={technician.id} className="flex border-b border-gray-100">
                <div className="w-60 p-3 border-r border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={`text-xs text-white ${technician.color}`}>
                        {technician.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-900 truncate">{technician.name}</div>
                      <div className="text-xs text-gray-500">
                        {filteredTasks.filter(t => t.assigneeId === technician.id).length} tasks
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 flex">
                  {timeSlots.map((slot, index) => {
                    const slotTasks = filteredTasks.filter(task => 
                      task.assigneeId === technician.id && 
                      (dateScope === 'today' ? 
                        task.timeWindow.includes(slot) : 
                        index < 3 // Just show some tasks for demo
                      )
                    );
                    
                    return (
                      <div 
                        key={`${technician.id}-${slot}-${index}`}
                        className="flex-1 min-w-32 p-2 border-r border-gray-100 min-h-24 bg-white hover:bg-gray-50 relative group"
                      >
                        {slotTasks.slice(0, 2).map(task => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            size="small"
                            onSelect={handleTaskSelect}
                          />
                        ))}
                        {slotTasks.length === 0 && (
                          <div className="text-xs text-gray-400 text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            Drop here
                          </div>
                        )}
                        <div className="absolute inset-0 border-2 border-dashed border-transparent hover:border-blue-300 transition-colors pointer-events-none rounded"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="flex border-b border-gray-100">
              <div className="w-60 p-3 border-r border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-500 text-white text-xs">
                      MR
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Mike Rodriguez</div>
                    <div className="text-xs text-gray-500">
                      {filteredTasks.filter(t => t.assignee === 'Mike Rodriguez').length} tasks
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 flex">
                {timeSlots.map((slot, index) => {
                  const slotTasks = filteredTasks.filter(task => 
                    task.assignee === 'Mike Rodriguez' && 
                    (dateScope === 'today' ? 
                      task.timeWindow.includes(slot) : 
                      index < 4 // Just show some tasks for demo
                    )
                  );
                  
                  return (
                    <div 
                      key={`me-${slot}-${index}`}
                      className="flex-1 min-w-32 p-2 border-r border-gray-100 min-h-24 bg-white hover:bg-gray-50 relative group"
                    >
                      {slotTasks.slice(0, 2).map(task => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          size="small"
                          onSelect={handleTaskSelect}
                        />
                      ))}
                      {slotTasks.length === 0 && (
                        <div className="text-xs text-gray-400 text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          Drop here
                        </div>
                      )}
                      <div className="absolute inset-0 border-2 border-dashed border-transparent hover:border-blue-300 transition-colors pointer-events-none rounded"></div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <TooltipProvider>
      <div className="h-full bg-[var(--content-bg)] flex flex-col">
        {/* Sticky Page Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
          {/* Title and Main Controls */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-medium text-gray-900">My Tasks</h1>
              <div className="flex items-center gap-2">
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Task
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                {selectedTasks.length > 0 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        Bulk Actions ({selectedTasks.length})
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48" align="end">
                      <div className="space-y-1">
                        <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                          <User className="w-3 h-3 mr-2" />
                          Reassign
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                          <Settings className="w-3 h-3 mr-2" />
                          Change Status
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                          <Calendar className="w-3 h-3 mr-2" />
                          Reschedule
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                          <Bell className="w-3 h-3 mr-2" />
                          Notify
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                          <Download className="w-3 h-3 mr-2" />
                          Export
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Date Navigation */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateDate('prev')}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="min-w-64">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDateDisplay()}
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
                </div>

                {/* Date Scope */}
                <div className="flex bg-gray-100 rounded-md p-1">
                  <Button
                    variant={dateScope === 'today' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setDateScope('today')}
                    className="text-xs"
                  >
                    Today
                  </Button>
                  <Button
                    variant={dateScope === 'week' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setDateScope('week')}
                    className="text-xs"
                  >
                    This Week
                  </Button>
                  <Button
                    variant={dateScope === 'range' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setDateScope('range')}
                    className="text-xs"
                  >
                    Pick Range
                  </Button>
                </div>

                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-md p-1">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="text-xs"
                  >
                    <List className="w-3 h-3 mr-1" />
                    List
                  </Button>
                  <Button
                    variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('calendar')}
                    className="text-xs"
                  >
                    <CalendarDays className="w-3 h-3 mr-1" />
                    Calendar
                  </Button>
                </div>

                {/* Scope Toggle */}
                <div className="flex bg-gray-100 rounded-md p-1">
                  <Button
                    variant={scope === 'me' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setScope('me')}
                    className="text-xs"
                  >
                    <User className="w-3 h-3 mr-1" />
                    Me
                  </Button>
                  <Button
                    variant={scope === 'team' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setScope('team')}
                    className="text-xs"
                  >
                    <Users className="w-3 h-3 mr-1" />
                    Team
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search customer/pool/task/order #"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-72"
                  />
                </div>

                {/* Filters */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                      {(typeFilter || statusFilter || priorityFilter || assigneeFilter || sourceFilter || cityFilter) && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {[typeFilter, statusFilter, priorityFilter, assigneeFilter, sourceFilter, cityFilter].filter(Boolean).length}
                        </Badge>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">Filters</h4>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => {
                            setTypeFilter('');
                            setStatusFilter('');
                            setPriorityFilter('');
                            setAssigneeFilter('');
                            setSourceFilter('');
                            setCityFilter('');
                          }}
                          className="text-xs"
                        >
                          Clear All
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium mb-1 block">Type</label>
                          <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger className="text-xs">
                              <SelectValue placeholder="All types" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All types</SelectItem>
                              <SelectItem value="Task">Task</SelectItem>
                              <SelectItem value="Work Order">Work Order</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium mb-1 block">Status</label>
                          <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="text-xs">
                              <SelectValue placeholder="All statuses" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All statuses</SelectItem>
                              <SelectItem value="To Start">To Start</SelectItem>
                              <SelectItem value="In Progress">In Progress</SelectItem>
                              <SelectItem value="Needs Recheck">Needs Recheck</SelectItem>
                              <SelectItem value="Completed">Completed</SelectItem>
                              <SelectItem value="Overdue">Overdue</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium mb-1 block">Priority</label>
                          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                            <SelectTrigger className="text-xs">
                              <SelectValue placeholder="All priorities" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All priorities</SelectItem>
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium mb-1 block">Assignee</label>
                          <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                            <SelectTrigger className="text-xs">
                              <SelectValue placeholder="All assignees" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All assignees</SelectItem>
                              {mockTechnicians.map(tech => (
                                <SelectItem key={tech.id} value={tech.name}>
                                  {tech.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium mb-1 block">Source</label>
                          <Select value={sourceFilter} onValueChange={setSourceFilter}>
                            <SelectTrigger className="text-xs">
                              <SelectValue placeholder="All sources" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All sources</SelectItem>
                              <SelectItem value="Manual">Manual</SelectItem>
                              <SelectItem value="Rule">Rule</SelectItem>
                              <SelectItem value="Portal">Portal</SelectItem>
                              <SelectItem value="Dispatcher">Dispatcher</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-xs font-medium mb-1 block">City/Area</label>
                          <Select value={cityFilter} onValueChange={setCityFilter}>
                            <SelectTrigger className="text-xs">
                              <SelectValue placeholder="All cities" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">All cities</SelectItem>
                              <SelectItem value="Toronto">Toronto</SelectItem>
                              <SelectItem value="Mississauga">Mississauga</SelectItem>
                              <SelectItem value="Richmond Hill">Richmond Hill</SelectItem>
                              <SelectItem value="Vaughan">Vaughan</SelectItem>
                              <SelectItem value="Brampton">Brampton</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="px-6 py-3 flex gap-2">
            <Button
              variant={quickFilter === 'overdue' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setQuickFilter(quickFilter === 'overdue' ? '' : 'overdue')}
              className="text-xs"
            >
              <AlertTriangle className="w-3 h-3 mr-1" />
              Overdue ({quickFilterCounts.overdue})
            </Button>
            <Button
              variant={quickFilter === 'due-today' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setQuickFilter(quickFilter === 'due-today' ? '' : 'due-today')}
              className="text-xs"
            >
              <Clock className="w-3 h-3 mr-1" />
              Due Today ({quickFilterCounts.dueToday})
            </Button>
            <Button
              variant={quickFilter === 'unscheduled' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setQuickFilter(quickFilter === 'unscheduled' ? '' : 'unscheduled')}
              className="text-xs"
            >
              <Calendar className="w-3 h-3 mr-1" />
              Unscheduled ({quickFilterCounts.unscheduled})
            </Button>
            <Button
              variant={quickFilter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setQuickFilter(quickFilter === 'completed' ? '' : 'completed')}
              className="text-xs"
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Completed ({quickFilterCounts.completed})
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden p-6">
          {viewMode === 'list' ? renderListView() : renderCalendarView()}
        </div>

        {/* Task Details Drawer */}
        <Sheet open={showTaskDrawer} onOpenChange={setShowTaskDrawer}>
          <SheetContent side="right" className="w-[600px] overflow-y-auto">
            <SheetHeader className="pb-4">
              <SheetTitle className="text-lg">{selectedTask?.title}</SheetTitle>
              <SheetDescription className="flex items-center gap-2">
                {selectedTask?.type === 'Work Order' ? (
                  <Wrench className="w-4 h-4" />
                ) : (
                  <CheckSquare className="w-4 h-4" />
                )}
                {selectedTask?.orderNumber || 'Internal Task'} 
                {selectedTask?.customer && ` • ${selectedTask.customer}`}
              </SheetDescription>
            </SheetHeader>
            
            {selectedTask && (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-6 mb-6">
                  <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
                  <TabsTrigger value="checklist" className="text-xs">Checklist</TabsTrigger>
                  <TabsTrigger value="photos" className="text-xs">Photos & Files</TabsTrigger>
                  <TabsTrigger value="materials" className="text-xs">Chemicals</TabsTrigger>
                  <TabsTrigger value="notes" className="text-xs">Notes</TabsTrigger>
                  <TabsTrigger value="activity" className="text-xs">Activity</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Task Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Type:</span>
                        <Badge variant="outline" className="ml-2">
                          {selectedTask.type}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <Badge className={`ml-2 ${statusConfig[selectedTask.status as keyof typeof statusConfig].color} text-white`}>
                          {selectedTask.status}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-gray-600">Priority:</span>
                        <Badge className={`ml-2 ${priorityConfig[selectedTask.priority as keyof typeof priorityConfig].badge}`}>
                          {selectedTask.priority}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-gray-600">Source:</span>
                        <span className="ml-2">{selectedTask.source}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Due Date:</span>
                        <span className="ml-2">{new Date(selectedTask.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Time Window:</span>
                        <span className="ml-2">{selectedTask.timeWindow}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Est. Hours:</span>
                        <span className="ml-2">{selectedTask.estimatedHours}h</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Billable:</span>
                        <span className="ml-2">{selectedTask.billable ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>

                  {selectedTask.customer && (
                    <div>
                      <h4 className="font-medium mb-3">Customer & Location</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{selectedTask.customer}</span>
                        </div>
                        {selectedTask.pool && (
                          <div className="flex items-center gap-2">
                            <Droplets className="w-4 h-4 text-gray-400" />
                            <span>{selectedTask.pool}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{selectedTask.address}</span>
                        </div>
                        {selectedTask.customerPhone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{selectedTask.customerPhone}</span>
                          </div>
                        )}
                        {selectedTask.customerEmail && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <span>{selectedTask.customerEmail}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-gray-600 p-3 bg-gray-50 rounded-md">
                      {selectedTask.description}
                    </p>
                  </div>

                  {selectedTask.tags && selectedTask.tags.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Tags</h4>
                      <div className="flex gap-1 flex-wrap">
                        {selectedTask.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTask.completionRate > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Progress</h4>
                      <Progress value={selectedTask.completionRate} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">{selectedTask.completionRate}% complete</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-4 border-t">
                    <Button className="flex-1" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Start Task
                    </Button>
                    <Button variant="outline" size="sm">
                      <Navigation className="w-4 h-4 mr-2" />
                      Navigate
                    </Button>
                    {selectedTask.billable && (
                      <Button variant="outline" size="sm">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Invoice
                      </Button>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="checklist" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Task Checklist</h4>
                    <div className="text-sm text-gray-500">
                      {selectedTask.checklist.filter((item: any) => item.completed).length}/{selectedTask.checklist.length} completed
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {selectedTask.checklist.map((item: any) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 rounded-md border bg-white">
                        <Checkbox 
                          checked={item.completed} 
                          onCheckedChange={(checked) => {
                            // Update checklist item
                            console.log('Toggle item:', item.id, checked);
                          }}
                        />
                        <span className={`text-sm flex-1 ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {item.item}
                        </span>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Camera className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Checklist Item
                  </Button>
                  
                  <div className="pt-4 border-t">
                    <Progress value={selectedTask.completionRate} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{selectedTask.completionRate}% complete</span>
                      <span>{selectedTask.checklist.filter((item: any) => item.completed).length} of {selectedTask.checklist.length} items</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="photos" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Photos & Files</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Camera className="w-4 h-4 mr-2" />
                        Add Photo
                      </Button>
                      <Button variant="outline" size="sm">
                        <Paperclip className="w-4 h-4 mr-2" />
                        Add File
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {Array.from({ length: selectedTask.photos }).map((_, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-md border flex items-center justify-center group relative overflow-hidden">
                        <Camera className="w-8 h-8 text-gray-400" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Button variant="ghost" size="sm" className="text-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {selectedTask.photos === 0 && (
                      <div className="col-span-3 text-center py-8">
                        <Camera className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-500 mb-4">No photos uploaded</p>
                        <Button variant="outline" size="sm">
                          <Camera className="w-4 h-4 mr-2" />
                          Upload First Photo
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="text-blue-800 font-medium">Photo Guidelines</p>
                        <p className="text-blue-700 text-xs mt-1">
                          Take before/after photos, document equipment readings, and capture any issues or repairs made.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="materials" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Chemicals & Materials</h4>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Material
                    </Button>
                  </div>
                  
                  {selectedTask.materials && selectedTask.materials.length > 0 ? (
                    <div className="space-y-2">
                      {selectedTask.materials.map((material: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                          <div className="flex items-center gap-3">
                            <Beaker className="w-4 h-4 text-gray-600" />
                            <div>
                              <span className="text-sm font-medium">{material.name}</span>
                              <div className="text-xs text-gray-500">
                                {material.quantity} {material.unit}
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Beaker className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500 mb-4">No materials recorded</p>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Material
                      </Button>
                    </div>
                  )}
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="text-yellow-800 font-medium">Material Usage</p>
                        <p className="text-yellow-700 text-xs mt-1">
                          Record all chemicals and materials used for accurate billing and inventory tracking.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="notes" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Existing Notes</h4>
                    {selectedTask.notes ? (
                      <div className="p-3 bg-gray-50 rounded-md border">
                        <p className="text-sm text-gray-700">{selectedTask.notes}</p>
                        <div className="text-xs text-gray-500 mt-2">
                          Added by System • {new Date(selectedTask.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No notes yet</p>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Add Note</h4>
                    <Textarea 
                      placeholder="Add notes about the task, customer preferences, or special instructions..." 
                      rows={4} 
                      className="mb-2"
                    />
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Note
                    </Button>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-md p-3">
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 text-green-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="text-green-800 font-medium">Note Tips</p>
                        <p className="text-green-700 text-xs mt-1">
                          Include customer feedback, special requests, equipment conditions, and any issues encountered.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="activity" className="space-y-4">
                  <h4 className="font-medium">Activity Log</h4>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3 pb-3 border-b border-gray-100">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-blue-500 text-white">MR</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">Mike Rodriguez</span> started task
                        </p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Status Change
                      </Badge>
                    </div>
                    
                    <div className="flex gap-3 pb-3 border-b border-gray-100">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-blue-500 text-white">MR</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">Mike Rodriguez</span> completed checklist item "Remove pool cover"
                        </p>
                        <p className="text-xs text-gray-500">3 hours ago</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Checklist
                      </Badge>
                    </div>
                    
                    <div className="flex gap-3 pb-3 border-b border-gray-100">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-blue-500 text-white">MR</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">Mike Rodriguez</span> uploaded 3 photos
                        </p>
                        <p className="text-xs text-gray-500">4 hours ago</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Photos
                      </Badge>
                    </div>
                    
                    <div className="flex gap-3 pb-3">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-green-500 text-white">SJ</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">System</span> created task from customer request
                        </p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Created
                      </Badge>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  );
}