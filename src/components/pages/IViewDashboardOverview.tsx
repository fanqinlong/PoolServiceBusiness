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
  ArrowDown,
  MoreHorizontal
} from 'lucide-react';

export function IViewDashboardOverview() {
  const quickStats = [
    {
      title: "Today's Tasks",
      value: "12",
      icon: <Calendar className="w-5 h-5 text-[var(--primary)]" />,
      change: "+2",
      changeType: "up" as const,
      changeLabel: "vs yesterday",
      trend: "8.2%"
    },
    {
      title: "Pending Jobs", 
      value: "8",
      icon: <Clock className="w-5 h-5 text-[var(--chart-3)]" />,
      change: "-1",
      changeType: "down" as const,
      changeLabel: "vs yesterday",
      trend: "12.5%"
    },
    {
      title: "Active Alerts",
      value: "3",
      icon: <AlertTriangle className="w-5 h-5 text-[var(--destructive)]" />,
      change: "+1",
      changeType: "up" as const,
      changeLabel: "critical",
      trend: "33.3%"
    },
    {
      title: "Completed Today",
      value: "18",
      icon: <CheckCircle className="w-5 h-5 text-[var(--chart-2)]" />,
      change: "+5",
      changeType: "up" as const,
      changeLabel: "vs yesterday",
      trend: "38.5%"
    }
  ];

  const businessMetrics = [
    {
      title: "Total Revenue",
      value: "$18,450",
      icon: <DollarSign className="w-5 h-5 text-[var(--chart-2)]" />,
      subtext: "This month",
      trend: "+12.5%",
      trendUp: true
    },
    {
      title: "Active Customers",
      value: "247",
      icon: <Users className="w-5 h-5 text-[var(--primary)]" />,
      subtext: "Total registered",
      trend: "+15",
      trendUp: true
    },
    {
      title: "Service Efficiency",
      value: "94%",
      icon: <TrendingUp className="w-5 h-5 text-[var(--chart-4)]" />,
      subtext: "Performance rate",
      trend: "+4%",
      trendUp: true
    }
  ];

  const todaySchedule = [
    {
      id: 1,
      time: "09:00",
      customer: "Johnson Family Pool",
      service: "Weekly Maintenance",
      technician: "Mike Rodriguez",
      status: "confirmed" as const,
      location: "Riverside, CA"
    },
    {
      id: 2,
      time: "11:30",
      customer: "Riverside Community Pool",
      service: "Chemical Balance Check",
      technician: "Sarah Chen",
      status: "pending" as const,
      location: "Los Angeles, CA"
    },
    {
      id: 3,
      time: "14:00",
      customer: "Miller Residence",
      service: "Equipment Repair",
      technician: "David Kim",
      status: "confirmed" as const,
      location: "Santa Monica, CA"
    },
    {
      id: 4,
      time: "16:30",
      customer: "Sunset Apartments",
      service: "Filter Replacement",
      technician: "Mike Rodriguez",
      status: "rescheduled" as const,
      location: "Beverly Hills, CA"
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "error" as const,
      title: "Pool Pump Failure",
      customer: "Johnson Family Pool",
      time: "5 min ago",
      icon: <Wrench className="w-4 h-4" />,
      priority: "high"
    },
    {
      id: 2,
      type: "warning" as const,
      title: "High Chlorine Levels",
      customer: "Community Center Pool",
      time: "23 min ago", 
      icon: <Droplet className="w-4 h-4" />,
      priority: "medium"
    },
    {
      id: 3,
      type: "info" as const,
      title: "Customer Callback Request",
      customer: "Miller Residence",
      time: "1 hour ago",
      icon: <Phone className="w-4 h-4" />,
      priority: "low"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-50 text-green-700 border-green-200 text-xs px-2 py-0">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 text-xs px-2 py-0">Pending</Badge>;
      case 'rescheduled':
        return <Badge className="bg-orange-50 text-orange-700 border-orange-200 text-xs px-2 py-0">Rescheduled</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs px-2 py-0">{status}</Badge>;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'error':
        return 'border-l-4 border-red-400 bg-red-50';
      case 'warning':
        return 'border-l-4 border-yellow-400 bg-yellow-50';
      case 'info':
        return 'border-l-4 border-blue-400 bg-blue-50';
      default:
        return 'border-l-4 border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6 bg-[var(--content-bg)] min-h-full">
      {/* Quick Statistics Row */}
      <div className="grid grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="border border-[var(--border)] shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-[var(--muted-foreground)] mb-2">{stat.title}</p>
                  <p className="text-2xl font-semibold text-[var(--foreground)] mb-3">{stat.value}</p>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                      stat.changeType === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {stat.changeType === 'up' ? (
                        <ArrowUp className="w-3 h-3" />
                      ) : (
                        <ArrowDown className="w-3 h-3" />
                      )}
                      <span>{stat.trend}</span>
                    </div>
                    <span className="text-xs text-[var(--muted-foreground)]">{stat.changeLabel}</span>
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

      {/* Business Metrics Row */}
      <div className="grid grid-cols-3 gap-6">
        {businessMetrics.map((metric, index) => (
          <Card key={index} className="border border-[var(--border)] shadow-sm bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-gray-50">
                  {metric.icon}
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.trendUp ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trendUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  <span>{metric.trend}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-[var(--muted-foreground)] mb-1">{metric.title}</p>
                <p className="text-xl font-semibold text-[var(--foreground)] mb-1">{metric.value}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{metric.subtext}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card className="border border-[var(--border)] shadow-sm bg-white">
          <CardHeader className="px-6 py-4 border-b border-[var(--border)]">
            <CardTitle className="text-base font-medium flex items-center justify-between text-[var(--foreground)]">
              Today's Schedule
              <Button variant="outline" size="sm" className="h-7 text-xs border-[var(--border)] hover:border-[var(--primary)]">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {todaySchedule.map((schedule, index) => (
                <div 
                  key={schedule.id} 
                  className={`flex items-center justify-between p-4 hover:bg-[var(--muted)] transition-colors ${
                    index !== todaySchedule.length - 1 ? 'border-b border-[var(--border)]' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-12">
                      <div className="text-sm font-medium text-[var(--primary)]">{schedule.time}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[var(--foreground)]">{schedule.customer}</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">{schedule.service}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[var(--muted-foreground)]">Tech: {schedule.technician}</span>
                        <span className="text-xs text-[var(--muted-foreground)]">• {schedule.location}</span>
                      </div>
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
        <Card className="border border-[var(--border)] shadow-sm bg-white">
          <CardHeader className="px-6 py-4 border-b border-[var(--border)]">
            <CardTitle className="text-base font-medium flex items-center justify-between text-[var(--foreground)]">
              Recent Alerts
              <Button variant="outline" size="sm" className="h-7 text-xs border-[var(--border)] hover:border-[var(--primary)]">
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-md ${getAlertStyle(alert.type)}`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {alert.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[var(--foreground)]">{alert.title}</p>
                          <p className="text-xs text-[var(--muted-foreground)] mt-1">{alert.customer}</p>
                          <p className="text-xs text-[var(--muted-foreground)] mt-1">{alert.time}</p>
                        </div>
                        <Badge 
                          variant={alert.priority === 'high' ? 'destructive' : alert.priority === 'medium' ? 'secondary' : 'outline'}
                          className="text-xs ml-2"
                        >
                          {alert.priority}
                        </Badge>
                      </div>
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