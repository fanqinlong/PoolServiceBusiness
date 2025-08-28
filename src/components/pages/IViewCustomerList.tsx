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
  RefreshCw,
  Settings
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function IViewCustomerList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

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
      lastService: "2024-01-10",
      totalSpent: "$1,850"
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
      lastService: "2024-01-08",
      totalSpent: "$12,450"
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
      lastService: "2023-12-15",
      totalSpent: "$650"
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
      lastService: "2024-01-09",
      totalSpent: "$8,950"
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
      lastService: "2024-01-11",
      totalSpent: "$2,150"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-50 text-green-700 border-green-200 text-xs px-2 py-0">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-xs px-2 py-0">Inactive</Badge>;
      case 'suspended':
        return <Badge className="bg-red-50 text-red-700 border-red-200 text-xs px-2 py-0">Suspended</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs px-2 py-0">{status}</Badge>;
    }
  };

  const getTagBadge = (tag: string) => {
    const colors = {
      'Premium': 'bg-purple-50 text-purple-700 border-purple-200',
      'VIP': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Commercial': 'bg-blue-50 text-blue-700 border-blue-200',
      'Contract': 'bg-green-50 text-green-700 border-green-200',
      'Seasonal': 'bg-orange-50 text-orange-700 border-orange-200',
      'Public': 'bg-indigo-50 text-indigo-700 border-indigo-200'
    };
    return (
      <Badge className={`${colors[tag as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200'} text-xs px-2 py-0 border`}>
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

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6 bg-[var(--content-bg)] min-h-full">
      <Card className="border border-[var(--border)] shadow-sm bg-white">
        {/* Header with filters */}
        <CardHeader className="px-6 py-4 border-b border-[var(--border)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-medium text-[var(--foreground)]">Customer Management</h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">
                Showing {paginatedCustomers.length} of {filteredCustomers.length} customers
              </p>
            </div>
            <Button className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white h-9 px-4 text-sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--muted-foreground)] w-4 h-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80 h-9 text-sm border-[var(--border)] focus:border-[var(--primary)]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36 h-9 text-sm border-[var(--border)]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-9 px-3 text-sm border-[var(--border)] hover:border-[var(--primary)]">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
            <Button variant="outline" className="h-9 px-3 text-sm border-[var(--border)] hover:border-[var(--primary)]">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="h-9 px-3 text-sm border-[var(--border)] hover:border-[var(--primary)]">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Table className="iview-table-striped iview-table-hover">
            <TableHeader>
              <TableRow className="bg-[var(--muted)] border-b border-[var(--border)]">
                <TableHead className="h-12 px-4 text-sm font-medium text-[var(--foreground)]">Customer</TableHead>
                <TableHead className="h-12 px-4 text-sm font-medium text-[var(--foreground)]">Contact Info</TableHead>
                <TableHead className="h-12 px-4 text-sm font-medium text-[var(--foreground)]">Location</TableHead>
                <TableHead className="h-12 px-4 text-sm font-medium text-[var(--foreground)]">Pools</TableHead>
                <TableHead className="h-12 px-4 text-sm font-medium text-[var(--foreground)]">Status</TableHead>
                <TableHead className="h-12 px-4 text-sm font-medium text-[var(--foreground)]">Tags</TableHead>
                <TableHead className="h-12 px-4 text-sm font-medium text-[var(--foreground)]">Last Service</TableHead>
                <TableHead className="h-12 px-4 text-sm font-medium text-[var(--foreground)] text-right">Total Spent</TableHead>
                <TableHead className="h-12 px-4 text-sm font-medium text-[var(--foreground)] w-20">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCustomers.map((customer, index) => (
                <TableRow key={customer.id} className="border-b border-[var(--border)] transition-colors">
                  <TableCell className="px-4 py-4">
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">{customer.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)] mt-1">{customer.contact}</p>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <Mail className="w-3 h-3 text-[var(--muted-foreground)]" />
                        <span className="text-[var(--foreground)]">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Phone className="w-3 h-3 text-[var(--muted-foreground)]" />
                        <span className="text-[var(--foreground)]">{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <div className="flex items-start gap-2 text-xs">
                      <MapPin className="w-3 h-3 text-[var(--muted-foreground)] mt-0.5 flex-shrink-0" />
                      <span className="text-[var(--foreground)] line-clamp-2 max-w-48">{customer.address}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <Badge variant="outline" className="text-xs px-2 py-0 border-[var(--border)]">
                      {customer.pools} Pool{customer.pools > 1 ? 's' : ''}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    {getStatusBadge(customer.status)}
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.map((tag, tagIndex) => (
                        <span key={tagIndex}>
                          {getTagBadge(tag)}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <span className="text-sm text-[var(--foreground)]">{customer.lastService}</span>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-right">
                    <span className="text-sm font-medium text-[var(--foreground)]">{customer.totalSpent}</span>
                  </TableCell>
                  <TableCell className="px-4 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-[var(--muted)]">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border border-[var(--border)] shadow-lg">
                        <DropdownMenuItem className="text-sm hover:bg-[var(--muted)]">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-sm hover:bg-[var(--muted)]">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Customer
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-sm hover:bg-[var(--muted)]">
                          <Phone className="w-4 h-4 mr-2" />
                          Call Customer
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-sm hover:bg-[var(--muted)]">
                          <Settings className="w-4 h-4 mr-2" />
                          Manage Pools
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border)]">
            <div className="text-sm text-[var(--muted-foreground)]">
              Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredCustomers.length)} of {filteredCustomers.length} results
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="h-8 px-3 text-sm border-[var(--border)]"
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 text-sm ${
                    page === currentPage 
                      ? 'bg-[var(--primary)] text-white' 
                      : 'border-[var(--border)] hover:border-[var(--primary)]'
                  }`}
                >
                  {page}
                </Button>
              ))}
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className="h-8 px-3 text-sm border-[var(--border)]"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}