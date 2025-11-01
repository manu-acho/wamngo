'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  Building2, 
  Mail, 
  Globe, 
  MapPin, 
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  capabilities: string;
  websiteUrl?: string;
  contactEmail?: string;
  partnerType: string;
  status: string;
  location?: string;
  establishedYear?: number;
  teamSize?: string;
  createdAt: string;
  updatedAt: string;
}

interface PartnerApplication {
  id: string;
  organizationName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  websiteUrl?: string;
  description: string;
  capabilities: string;
  partnerType: string;
  location?: string;
  teamSize?: string;
  specialization?: string;
  status: string;
  submittedAt: string;
  reviewedAt?: string;
  adminFeedback?: string;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  approved: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  info_requested: 'bg-blue-100 text-blue-800 border-blue-200',
  active: 'bg-green-100 text-green-800 border-green-200',
  inactive: 'bg-gray-100 text-gray-800 border-gray-200'
};

const statusIcons = {
  pending: Clock,
  approved: CheckCircle,
  rejected: XCircle,
  info_requested: AlertCircle,
  active: CheckCircle,
  inactive: XCircle
};

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<PartnerApplication | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'request_info' | null>(null);
  const [feedback, setFeedback] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [partnersRes, applicationsRes] = await Promise.all([
        fetch('/api/admin/partners'),
        fetch('/api/admin/partner-applications')
      ]);

      const partnersData = await partnersRes.json();
      const applicationsData = await applicationsRes.json();

      setPartners(partnersData.partners || []);
      setApplications(applicationsData.applications || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationAction = async () => {
    if (!selectedApplication || !actionType) return;

    setProcessing(true);
    try {
      const response = await fetch('/api/admin/partner-applications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicationId: selectedApplication.id,
          action: actionType,
          feedback: feedback
        })
      });

      const result = await response.json();

      if (result.success) {
        await fetchData(); // Refresh data
        setSelectedApplication(null);
        setActionType(null);
        setFeedback('');
      } else {
        console.error('Error processing application:', result.error);
      }
    } catch (error) {
      console.error('Error processing application:', error);
    } finally {
      setProcessing(false);
    }
  };

  const updatePartnerStatus = async (partnerId: string, status: string) => {
    try {
      const response = await fetch('/api/admin/partners', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          partnerId,
          updates: { status }
        })
      });

      const result = await response.json();

      if (result.success) {
        await fetchData(); // Refresh data
      }
    } catch (error) {
      console.error('Error updating partner status:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partnership Management</h1>
          <p className="text-gray-600 mt-2">Manage partners and review applications</p>
        </div>
      </div>

      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="applications">
            Applications ({applications.filter(app => app.status === 'pending').length} pending)
          </TabsTrigger>
          <TabsTrigger value="partners">
            Partners ({partners.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="applications" className="space-y-6">
          <div className="grid gap-6">
            {applications.map((application) => {
              const StatusIcon = statusIcons[application.status as keyof typeof statusIcons] || Clock;
              
              return (
                <Card key={application.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="h-5 w-5" />
                          {application.organizationName}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {application.description.substring(0, 150)}...
                        </CardDescription>
                      </div>
                      <Badge className={statusColors[application.status as keyof typeof statusColors]}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {application.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span>{application.contactEmail}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{application.contactName}</span>
                        </div>
                        {application.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{application.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>Submitted {new Date(application.submittedAt).toLocaleDateString()}</span>
                        </div>
                        {application.websiteUrl && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-gray-500" />
                            <a 
                              href={application.websiteUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Website
                            </a>
                          </div>
                        )}
                        <Badge variant="outline">
                          {application.partnerType}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Capabilities</h4>
                      <p className="text-sm text-gray-600">{application.capabilities}</p>
                    </div>

                    {application.adminFeedback && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <h4 className="font-medium mb-1">Admin Feedback</h4>
                        <p className="text-sm text-gray-700">{application.adminFeedback}</p>
                      </div>
                    )}

                    {application.status === 'pending' && (
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => {
                                setSelectedApplication(application);
                                setActionType('approve');
                              }}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Approve Partnership Application</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p>Are you sure you want to approve {application.organizationName}?</p>
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Approval Message (optional)
                                </label>
                                <Textarea
                                  value={feedback}
                                  onChange={(e) => setFeedback(e.target.value)}
                                  placeholder="Welcome message or next steps..."
                                  rows={3}
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleApplicationAction} disabled={processing}>
                                  {processing ? 'Processing...' : 'Approve'}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedApplication(application);
                                setActionType('request_info');
                              }}
                            >
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Request Info
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Request Additional Information</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p>What additional information do you need from {application.organizationName}?</p>
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Information Request
                                </label>
                                <Textarea
                                  value={feedback}
                                  onChange={(e) => setFeedback(e.target.value)}
                                  placeholder="Please provide more details about..."
                                  rows={4}
                                  required
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleApplicationAction} disabled={processing || !feedback}>
                                  {processing ? 'Sending...' : 'Send Request'}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => {
                                setSelectedApplication(application);
                                setActionType('reject');
                              }}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reject Partnership Application</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p>Are you sure you want to reject {application.organizationName}?</p>
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Rejection Reason (optional)
                                </label>
                                <Textarea
                                  value={feedback}
                                  onChange={(e) => setFeedback(e.target.value)}
                                  placeholder="Reason for rejection or suggestions for improvement..."
                                  rows={3}
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                                  Cancel
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  onClick={handleApplicationAction} 
                                  disabled={processing}
                                >
                                  {processing ? 'Processing...' : 'Reject'}
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}

            {applications.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No partnership applications found.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="partners" className="space-y-6">
          <div className="grid gap-6">
            {partners.map((partner) => {
              const StatusIcon = statusIcons[partner.status as keyof typeof statusIcons] || CheckCircle;
              
              return (
                <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Building2 className="h-5 w-5" />
                          {partner.name}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {partner.shortDescription || partner.description.substring(0, 150)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={statusColors[partner.status as keyof typeof statusColors]}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {partner.status}
                        </Badge>
                        <Select
                          value={partner.status}
                          onValueChange={(value) => updatePartnerStatus(partner.id, value)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        {partner.contactEmail && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-gray-500" />
                            <span>{partner.contactEmail}</span>
                          </div>
                        )}
                        {partner.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span>{partner.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>Joined {new Date(partner.createdAt).toLocaleDateString()}</span>
                        </div>
                        {partner.websiteUrl && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-gray-500" />
                            <a 
                              href={partner.websiteUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Website
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Capabilities</h4>
                      <p className="text-sm text-gray-600">{partner.capabilities}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      {partner.status === 'inactive' && (
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {partners.length === 0 && (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">No partners found.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
