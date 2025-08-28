import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  DollarSign,
  TrendingUp,
  Droplet,
  Wrench,
  Phone,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export function ElementDashboardOverview() {
  const quickStats = [
    {
      title: "Today's Tasks",
      value: "12",
      icon: <Calendar className="w-6 h-6 text-[var(--primary)]" />,
      change: "+2",
      changeType: "up" as const,
      changeLabel: "vs yesterday"
    },
    {
      title: "Pending Jobs", 
      value: "8",
      icon: <Clock className="w-6 h-6 text-orange-500" />,
      change: "-1",
      changeType: "down" as const,
      changeLabel: "vs yesterday"
    },
    {
      title: "Active Alerts",
      value: "3",
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      change: "+1",
      changeType: "up" as const,
      changeLabel: "critical"
    },
    {
      title: "Completed Today",
      value: "18",
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      change: "+5",
      changeType: "up" as const,
      changeLabel: "vs yesterday"
    }
  ];

  const businessStats = [
    {
      title: "Total Customers",
      value: "247",
      icon: <Users className="w-5 h-5 text-[var(--primary)]" />,
      subtext: "+15 this month"
    },
    {
      title: "Monthly Revenue",
      value: "$18,450",
      icon: <DollarSign className="w-5 h-5 text-green-500" />,
      subtext: "+12% vs last month"
    },
    {
      title: "Service Efficiency",
      value: "94%",
      icon: <TrendingUp className="w-5 h-5 text-purple-500" />,
      subtext: "Above target (90%)"
    }
  ];

  const todaySchedule = [
    {
      id: 1,
      time: "09:00",
      customer: "Johnson Family Pool",
      service: "Weekly Maintenance",
      technician: "Mike Rodriguez",
      status: "confirmed" as const
    },
    {
      id: 2,
      time: "11:30",
      customer: "Riverside Community Pool",
      service: "Chemical Balance Check",
      technician: "Sarah Chen",
      status: "pending" as const
    },
    {
      id: 3,
      time: "14:00",
      customer: "Miller Residence",
      service: "Pool Equipment Repair",
      technician: "David Kim",
      status: "confirmed" as const
    },
    {
      id: 4,
      time: "16:30",
      customer: "Sunset Apartments Pool",
      service: "Filter Replacement",
      technician: "Mike Rodriguez",
      status: "rescheduled" as const
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "error" as const,
      title: "Pool Pump Failure",
      customer: "Johnson Family Pool",
      time: "5 min ago",
      icon: <Wrench className="w-4 h-4" />
    },
    {
      id: 2,
      type: "warning" as const,
      title: "High Chlorine Levels",
      customer: "Community Center Pool",
      time: "23 min ago", 
      icon: <Droplet className="w-4 h-4" />
    },
    {
      id: 3,
      type: "info" as const,
      title: "Customer Callback Request",
      customer: "Miller Residence",
      time: "1 hour ago",
      icon: <Phone className="w-4 h-4" />
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 text-xs px-2 py-0">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0">Pending</Badge>;
      case 'rescheduled':
        return <Badge className="bg-orange-100 text-orange-800 text-xs px-2 py-0">Rescheduled</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs px-2 py-0">{status}</Badge>;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'error':
        return 'border-l-4 border-red-500 bg-red-50';
      case 'warning':
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'info':
        return 'border-l-4 border-blue-500 bg-blue-50';
      default:
        return 'border-l-4 border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="p-5 space-y-5 bg-[var(--background)]">
      {/* Quick Statistics Row */}
      <div className="grid grid-cols-4 gap-5">
        {quickStats.map((stat, index) => (
          <Card key={index} className="shadow-sm border border-[var(--border)]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-2xl font-semibold text-gray-900 mb-2">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.changeType === 'up' ? (
                      <ArrowUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-red-500" />
                    )}
                    <span className={`text-xs ${
                      stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500">{stat.changeLabel}</span>
                  </div>
                </div>
                <div className="ml-4">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Business Statistics Row */}
      <div className="grid grid-cols-3 gap-5">
        {businessStats.map((stat, index) => (
          <Card key={index} className="shadow-sm border border-[var(--border)]">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-xl font-semibold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.subtext}</p>
                </div>
                <div className="ml-4">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Today's Schedule */}
        <Card className="shadow-sm border border-[var(--border)]">
          <CardHeader className="px-5 py-4 border-b border-[var(--border)]">
            <CardTitle className="text-base font-medium flex items-center justify-between">
              Today's Schedule
              <Button variant="outline" size="sm" className="h-7 text-xs">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {todaySchedule.map((schedule, index) => (
                <div 
                  key={schedule.id} 
                  className={`flex items-center justify-between p-4 hover:bg-gray-50 ${
                    index !== todaySchedule.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-12">
                      <div className="text-sm font-medium text-gray-900">{schedule.time}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{schedule.customer}</p>
                      <p className="text-xs text-gray-500">{schedule.service}</p>
                      <p className="text-xs text-gray-400">Technician: {schedule.technician}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(schedule.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="shadow-sm border border-[var(--border)]">
          <CardHeader className="px-5 py-4 border-b border-[var(--border)]">
            <CardTitle className="text-base font-medium flex items-center justify-between">
              Recent Alerts
              <Button variant="outline" size="sm" className="h-7 text-xs">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded ${getAlertStyle(alert.type)}`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {alert.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{alert.customer}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}