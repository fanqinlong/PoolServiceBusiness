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
  Phone
} from 'lucide-react';

export function DashboardOverview() {
  const todayStats = [
    {
      title: "Today's Tasks",
      value: "12",
      icon: <Calendar className="w-5 h-5 text-blue-600" />,
      change: "+2 from yesterday",
      changeType: "positive"
    },
    {
      title: "Pending Jobs", 
      value: "8",
      icon: <Clock className="w-5 h-5 text-orange-600" />,
      change: "-1 from yesterday",
      changeType: "positive"
    },
    {
      title: "Active Alerts",
      value: "3",
      icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
      change: "1 critical",
      changeType: "negative"
    },
    {
      title: "Completed Today",
      value: "18",
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      change: "+5 from yesterday",
      changeType: "positive"
    }
  ];

  const quickStats = [
    {
      title: "Total Customers",
      value: "247",
      icon: <Users className="w-5 h-5 text-blue-600" />,
      subtext: "15 new this month"
    },
    {
      title: "Monthly Revenue",
      value: "$18,450",
      icon: <DollarSign className="w-5 h-5 text-green-600" />,
      subtext: "+12% vs last month"
    },
    {
      title: "Service Efficiency",
      value: "94%",
      icon: <TrendingUp className="w-5 h-5 text-purple-600" />,
      subtext: "Above target (90%)"
    }
  ];

  const upcomingSchedules = [
    {
      id: 1,
      customer: "Johnson Family Pool",
      service: "Weekly Maintenance",
      time: "9:00 AM",
      status: "confirmed",
      technician: "Mike Rodriguez"
    },
    {
      id: 2,
      customer: "Riverside Community Pool",
      service: "Chemical Balance Check",
      time: "11:30 AM", 
      status: "pending",
      technician: "Sarah Chen"
    },
    {
      id: 3,
      customer: "Miller Residence",
      service: "Pool Equipment Repair",
      time: "2:00 PM",
      status: "confirmed",
      technician: "David Kim"
    },
    {
      id: 4,
      customer: "Sunset Apartments Pool",
      service: "Filter Replacement",
      time: "4:30 PM",
      status: "rescheduled",
      technician: "Mike Rodriguez"
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: "critical",
      title: "Pool Pump Failure",
      customer: "Johnson Family Pool",
      time: "5 min ago",
      icon: <Wrench className="w-4 h-4" />
    },
    {
      id: 2,
      type: "warning",
      title: "High Chlorine Levels",
      customer: "Community Center Pool",
      time: "23 min ago", 
      icon: <Droplet className="w-4 h-4" />
    },
    {
      id: 3,
      type: "info",
      title: "Customer Callback Request",
      customer: "Miller Residence",
      time: "1 hour ago",
      icon: <Phone className="w-4 h-4" />
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'rescheduled':
        return <Badge className="bg-orange-100 text-orange-800">Rescheduled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'critical':
        return 'border-l-4 border-red-500 bg-red-50';
      case 'warning':
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'info':
        return 'border-l-4 border-blue-500 bg-blue-50';
      default:
        return 'border-l-4 border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your pool services today.</p>
      </div>

      {/* Today's Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {todayStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  <p className={`text-xs mt-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-gray-50">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-xl font-semibold mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.subtext}</p>
                </div>
                <div className="p-2 rounded-full bg-gray-50">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Schedules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Today's Schedule
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSchedules.map((schedule) => (
                <div key={schedule.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{schedule.customer}</p>
                    <p className="text-xs text-gray-600">{schedule.service}</p>
                    <p className="text-xs text-gray-500">Technician: {schedule.technician}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{schedule.time}</p>
                    {getStatusBadge(schedule.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Alerts
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg ${getAlertStyle(alert.type)}`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {alert.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-gray-600">{alert.customer}</p>
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