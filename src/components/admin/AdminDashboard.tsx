"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, Settings, Activity, Shield, AlertTriangle } from 'lucide-react';

interface AdminStats {
  totalProposals: number;
  totalProjects: number;
  pendingProposals: number;
  pendingSubmissions: number;
  recentActions: number;
}

interface AdminAction {
  id: string;
  adminWallet: string;
  actionType: string;
  targetType: string;
  targetId?: string;
  reason?: string;
  createdAt: string;
  metadata?: any;
}

interface AdminRole {
  id: string;
  walletAddress: string;
  role: string;
  grantedAt: string;
  isActive: boolean;
}

interface AdminDashboardProps {
  userWallet?: string;
}

export default function AdminDashboard({ userWallet }: AdminDashboardProps) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentActions, setRecentActions] = useState<AdminAction[]>([]);
  const [admins, setAdmins] = useState<AdminRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (userWallet) {
      checkAdminAccess();
    }
  }, [userWallet]);

  const checkAdminAccess = async () => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'X-Wallet-Address': userWallet || '',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setRecentActions(data.recentActions);
        setAdmins(data.admins);
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error checking admin access:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const formatWallet = (wallet: string) => {
    return `${wallet.substring(0, 6)}...${wallet.substring(wallet.length - 4)}`;
  };

  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'delete_proposal':
      case 'delete_project':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'edit_proposal':
      case 'edit_project':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'grant_admin_role':
      case 'revoke_admin_role':
        return <Shield className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-800';
      case 'moderator':
        return 'bg-blue-100 text-blue-800';
      case 'reviewer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <Shield className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-600">You need admin privileges to view this dashboard.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold wam-text-gradient">Admin Dashboard</h1>
        <Badge variant="outline" className="bg-purple-100 text-purple-800">
          <Shield className="h-3 w-3 mr-1" />
          Admin Access
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Proposals</p>
                <p className="text-2xl font-bold">{stats?.totalProposals || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold">{stats?.totalProjects || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Proposals</p>
                <p className="text-2xl font-bold">{stats?.pendingProposals || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Submissions</p>
                <p className="text-2xl font-bold">{stats?.pendingSubmissions || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Actions</p>
                <p className="text-2xl font-bold">{stats?.recentActions || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Admin Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Admin Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActions.length > 0 ? (
                recentActions.slice(0, 5).map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getActionIcon(action.actionType)}
                      <div>
                        <p className="font-medium text-sm">
                          {action.actionType.replace('_', ' ').toUpperCase()}
                        </p>
                        <p className="text-xs text-gray-600">
                          by {formatWallet(action.adminWallet)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {action.targetType}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(action.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No recent actions</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Admin Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Admin Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <div key={admin.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">
                        {formatWallet(admin.walletAddress)}
                      </p>
                      <p className="text-xs text-gray-600">
                        Since {new Date(admin.grantedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getRoleBadgeColor(admin.role)}>
                      {admin.role.replace('_', ' ')}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No admin users</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Manage Proposals
            </Button>
            <Button variant="outline" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Manage Projects
            </Button>
            <Button variant="outline" className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
