'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  Vote, 
  DollarSign, 
  Activity,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  totalProposals: number;
  activeProposals: number;
  totalVotes: number;
  totalTokensPurchased: number;
  totalVolume: number;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user?: string;
  }>;
  userGrowth: Array<{
    date: string;
    count: number;
  }>;
  proposalStats: {
    passed: number;
    rejected: number;
    active: number;
  };
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('7d');

  useEffect(() => {
    fetchAnalytics();
    const interval = setInterval(fetchAnalytics, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [timeframe]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics?timeframe=${timeframe}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-gray-300 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Unable to load analytics data.</p>
      </div>
    );
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registered': return <Users className="w-4 h-4 text-blue-600" />;
      case 'proposal_created': return <Vote className="w-4 h-4 text-purple-600" />;
      case 'proposal_voted': return <Activity className="w-4 h-4 text-green-600" />;
      case 'token_purchase': return <DollarSign className="w-4 h-4 text-yellow-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user_registered': return 'bg-blue-100 border-blue-200';
      case 'proposal_created': return 'bg-purple-100 border-purple-200';
      case 'proposal_voted': return 'bg-green-100 border-green-200';
      case 'token_purchase': return 'bg-yellow-100 border-yellow-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold wam-text-gradient">Platform Analytics</h2>
          <p className="text-gray-600">Real-time insights into platform activity</p>
        </div>
        
        <div className="flex gap-2">
          {['24h', '7d', '30d', '90d'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded-md text-sm ${
                timeframe === period 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="wam-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold wam-text-gradient">{analytics.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  +{analytics.activeUsers} active
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="wam-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Proposals</p>
                <p className="text-2xl font-bold wam-text-gradient">{analytics.totalProposals}</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Activity className="w-3 h-3 mr-1" />
                  {analytics.activeProposals} active
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Vote className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="wam-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Votes</p>
                <p className="text-2xl font-bold wam-text-gradient">{analytics.totalVotes.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Active governance
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="wam-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Token Volume</p>
                <p className="text-2xl font-bold wam-text-gradient">${analytics.totalVolume.toLocaleString()}</p>
                <p className="text-xs text-yellow-600 flex items-center mt-1">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {analytics.totalTokensPurchased.toLocaleString()} tokens
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Governance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="wam-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Proposal Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Passed</span>
                  <span className="text-sm text-gray-600">{analytics.proposalStats.passed}</span>
                </div>
                <Progress 
                  value={(analytics.proposalStats.passed / analytics.totalProposals) * 100} 
                  className="h-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Active</span>
                  <span className="text-sm text-gray-600">{analytics.proposalStats.active}</span>
                </div>
                <Progress 
                  value={(analytics.proposalStats.active / analytics.totalProposals) * 100} 
                  className="h-2"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Rejected</span>
                  <span className="text-sm text-gray-600">{analytics.proposalStats.rejected}</span>
                </div>
                <Progress 
                  value={(analytics.proposalStats.rejected / analytics.totalProposals) * 100} 
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="wam-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {analytics.recentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className={`flex items-start gap-3 p-3 rounded-lg border ${getActivityColor(activity.type)}`}
                >
                  {getActivityIcon(activity.type)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-gray-600">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                      {activity.user && (
                        <Badge variant="outline" className="text-xs">
                          {activity.user}
                        </Badge>
                      )}
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
