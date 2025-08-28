import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Phone, 
  Mail,
  MapPin,
  Download,
  RefreshCw
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function ElementCustomerList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const customers = [
    {
      id: 1,
      name: "Johnson Family",
      contact: "Michael Johnson",
      email: "mjohnson@email.com",
      phone: "(555) 123-4567",
      address: "123 Oak Street, Riverside, CA 92501",
      pools: 1,
      status: "active",
      tags: ["Premium", "VIP"],
      joinDate: "2023-03-15",
      lastService: "2024-01-10"
    },
    {
      id: 2,
      name: "Sunset Apartments",
      contact: "Property Manager",
      email: "manager@sunsetapts.com", 
      phone: "(555) 234-5678",
      address: "456 Sunset Blvd, Los Angeles, CA 90028",
      pools: 3,
      status: "active",
      tags: ["Commercial", "Contract"],
      joinDate: "2022-11-08",
      lastService: "2024-01-08"
    },
    {
      id: 3,
      name: "Miller Residence",
      contact: "Sarah Miller",
      email: "sarah.miller@gmail.com",
      phone: "(555) 345-6789", 
      address: "789 Pine Avenue, Santa Monica, CA 90401",
      pools: 1,
      status: "inactive",
      tags: ["Seasonal"],
      joinDate: "2023-06-22",
      lastService: "2023-12-15"
    },
    {
      id: 4,
      name: "Community Center",
      contact: "David Chen",
      email: "dchen@communitycenter.org",
      phone: "(555) 456-7890",
      address: "321 Community Drive, Pasadena, CA 91101",
      pools: 2,
      status: "active",
      tags: ["Public", "Contract"],
      joinDate: "2021-09-12",
      lastService: "2024-01-09"
    },
    {
      id: 5,
      name: "Wilson Family Pool",
      contact: "James Wilson",
      email: "jwilson@outlook.com",
      phone: "(555) 567-8901",
      address: "654 Maple Lane, Beverly Hills, CA 90210",
      pools: 1,
      status: "active",
      tags: ["Premium"],
      joinDate: "2023-08-30",
      lastService: "2024-01-11"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 text-xs px-2 py-0">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 text-xs px-2 py-0">Inactive</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800 text-xs px-2 py-0">Suspended</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs px-2 py-0">{status}</Badge>;
    }
  };

  const getTagBadge = (tag: string) => {
    const colors = {
      'Premium': 'bg-purple-100 text-purple-800',
      'VIP': 'bg-yellow-100 text-yellow-800',
      'Commercial': 'bg-blue-100 text-blue-800',
      'Contract': 'bg-green-100 text-green-800',
      'Seasonal': 'bg-orange-100 text-orange-800',
      'Public': 'bg-indigo-100 text-indigo-800'
    };
    return (
      <Badge className={`${colors[tag as keyof typeof colors] || 'bg-gray-100 text-gray-800'} text-xs px-2 py-0`}>
        {tag}
      </Badge>
    );
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-5 bg-[var(--background)]">
      <Card className="shadow-sm border border-[var(--border)]">
        {/* Header with filters */}
        <CardHeader className="px-5 py-4 border-b border-[var(--border)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Customer Management</h2>
              <p className="text-sm text-gray-500 mt-1">Total {filteredCustomers.length} customers</p>
            </div>
            <Button className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white h-8 px-3 text-sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Customer
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 h-8 text-sm"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 h-8 text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-8 px-3 text-sm">
              <Filter className="w-4 h-4 mr-1" />
              Filter
            </Button>
            <Button variant="outline" className="h-8 px-3 text-sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" className="h-8 px-3 text-sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="h-10 px-4 text-xs font-medium text-gray-500">Customer</TableHead>
                <TableHead className="h-10 px-4 text-xs font-medium text-gray-500">Contact Info</TableHead>
                <TableHead className="h-10 px-4 text-xs font-medium text-gray-500">Address</TableHead>
                <TableHead className="h-10 px-4 text-xs font-medium text-gray-500">Pools</TableHead>
                <TableHead className="h-10 px-4 text-xs font-medium text-gray-500">Status</TableHead>
                <TableHead className="h-10 px-4 text-xs font-medium text-gray-500">Tags</TableHead>
                <TableHead className="h-10 px-4 text-xs font-medium text-gray-500">Last Service</TableHead>
                <TableHead className="h-10 px-4 text-xs font-medium text-gray-500 w-16">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer, index) => (
                <TableRow key={customer.id} className={`hover:bg-gray-50 ${index % 2 === 1 ? 'bg-gray-25' : ''}`}>
                  <TableCell className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.contact}</p>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-gray-600">{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-start gap-2 text-xs">
                      <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 line-clamp-2">{customer.address}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <Badge variant="outline" className="text-xs px-2 py-0">
                      {customer.pools} Pool{customer.pools > 1 ? 's' : ''}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    {getStatusBadge(customer.status)}
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.map((tag, tagIndex) => (
                        <span key={tagIndex}>
                          {getTagBadge(tag)}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span className="text-xs text-gray-600">{customer.lastService}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-xs">
                          <Eye className="w-3 h-3 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs">
                          <Edit className="w-3 h-3 mr-2" />
                          Edit Customer
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-xs">
                          <Phone className="w-3 h-3 mr-2" />
                          Call Customer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}