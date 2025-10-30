'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wallet, 
  Vote, 
  TrendingUp, 
  Award, 
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  ArrowUpRight,
  Coins,
  Gift,
  Calendar,
  Target,
  BarChart3
} from 'lucide-react';

interface UserStats {
  walletBalance: number;
  stakedTokens: number;
  votingPower: number;
  proposalsVoted: number;
  totalPoints: number;
  portfolioValue: number;
}

interface StakePosition {
  id: string;
  pool: string;
  amount: number;
  votingMultiplier: number;
  points: number;
  lockPeriod: string;
  endDate: string;
  benefits: string[];
  status: 'active' | 'unlocking' | 'completed';
}

interface VotingHistory {
  id: string;
  proposalTitle: string;
  vote: 'yes' | 'no' | 'abstain';
  votingPower: number;
  date: string;
  result: 'passed' | 'failed' | 'pending';
}

interface UserDashboardData {
  profile: {
    id: string;
    walletAddress: string;
    displayName?: string;
    email?: string;
    totalTokens: number;
    totalStaked: number;
    totalVotingPower: number;
    reputationScore: number;
    profileImage?: string;
    joinedAt: string;
  };
  transactions: Array<{
    id: string;
    type: 'purchase' | 'stake' | 'reward' | 'unstake';
    amount: number;
    txHash?: string;
    timestamp: string;
  }>;
  votes: Array<{
    id: string;
    proposalId: string;
    proposalTitle: string;
    voteChoice: 'yes' | 'no' | 'abstain';
    votingPower: number;
    timestamp: string;
  }>;
  stakingPositions: Array<{
    id: string;
    amount: number;
    stakingPool: string;
    startDate: string;
    lockPeriod: number;
    currentRewards: number;
  }>;
}

export default function UserDashboard() {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState<UserDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!address) return;
      
      try {
        const response = await fetch(`/api/users/${address}`);
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [address]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Unable to load dashboard data. Please try again.</p>
      </div>
    );
  }

  const { profile, transactions, votes, stakingPositions } = dashboardData;

  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  // Calculate derived stats
  const userStats: UserStats = {
    walletBalance: profile.totalTokens - profile.totalStaked,
    stakedTokens: profile.totalStaked,
    votingPower: profile.totalVotingPower,
    proposalsVoted: votes.length,
    totalPoints: profile.reputationScore,
    portfolioValue: profile.totalTokens * 0.10 // $0.10 per WAM token
  };

  // Transform staking positions
  const stakePositions: StakePosition[] = stakingPositions.map(pos => ({
    id: pos.id,
    pool: pos.stakingPool,
    amount: pos.amount,
    votingMultiplier: 1.5, // Default multiplier
    points: Math.floor(pos.amount * 0.1),
    lockPeriod: `${pos.lockPeriod} days`,
    endDate: new Date(Date.now() + pos.lockPeriod * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    benefits: ['Voting Rights', 'Reward Multiplier', 'Governance Access'],
    status: 'active' as const
  }));

  // Transform voting history
  const votingHistory: VotingHistory[] = votes.map(vote => ({
    id: vote.id,
    proposalTitle: vote.proposalTitle,
    vote: vote.voteChoice,
    votingPower: vote.votingPower,
    date: new Date(vote.timestamp).toISOString().split('T')[0],
    result: 'passed' as const // Would need to be calculated from proposal results
  }));

  return (
    <div className="space-y-8">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="wam-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold wam-text-gradient">
              ${userStats.portfolioValue.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              <span className="text-green-600">+12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="wam-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-pink-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold wam-text-gradient">
              {userStats.walletBalance.toLocaleString()} WAM
            </div>
            <p className="text-xs text-gray-600 mt-1">Available for staking/voting</p>
          </CardContent>
        </Card>

        <Card className="wam-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community Points</CardTitle>
            <Gift className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold wam-text-gradient">
              {userStats.totalPoints.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              <span className="text-purple-600">+125</span> this week
            </p>
          </CardContent>
        </Card>

        <Card className="wam-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voting Power</CardTitle>
            <Vote className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold wam-text-gradient">
              {userStats.votingPower.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600 mt-1">
              {userStats.proposalsVoted} proposals voted
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="staking">Staking</TabsTrigger>
          <TabsTrigger value="voting">Voting</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Portfolio Performance */}
            <Card className="wam-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Portfolio Performance</span>
                  <div className="flex gap-2">
                    {['24h', '7d', '30d', '90d'].map((period) => (
                      <Button
                        key={period}
                        variant={selectedTimeframe === period ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setSelectedTimeframe(period)}
                        className="text-xs"
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Value</span>
                    <span className="font-semibold">${userStats.portfolioValue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Wallet Balance</span>
                    <span className="font-semibold">{userStats.walletBalance.toLocaleString()} WAM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Staked Tokens</span>
                    <span className="font-semibold">{userStats.stakedTokens.toLocaleString()} WAM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Community Points</span>
                    <span className="font-semibold text-purple-600">
                      {userStats.totalPoints.toLocaleString()} pts
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Portfolio Status</span>
                    <span className="text-sm text-gray-600">Ready for Launch</span>
                  </div>
                  <Progress value={0} className="h-2" />
                  <p className="text-xs text-gray-600 mt-2">
                    Your portfolio will grow when WAM tokens launch and you start participating in governance
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="wam-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Joined WAM Community</p>
                      <p className="text-xs text-gray-600">Today</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Welcome</Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Set up for DAO launch notifications</p>
                      <p className="text-xs text-gray-600">Ready for Q1 2026</p>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">Prepared</Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg opacity-60">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Vote className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">First governance vote</p>
                      <p className="text-xs text-gray-500">Available when DAO launches</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-600">Coming Soon</Badge>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg opacity-60">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Coins className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">First token staking</p>
                      <p className="text-xs text-gray-500">Available when tokens launch</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-600">Coming Soon</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Staking Tab */}
        <TabsContent value="staking" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Positions */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold wam-text-gradient">Active Staking Positions</h3>
              {stakePositions.map((position) => (
                <Card key={position.id} className="wam-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{position.pool}</CardTitle>
                      <Badge 
                        className={
                          position.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : position.status === 'unlocking'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }
                      >
                        {position.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Staked Amount</p>
                        <p className="font-semibold">{position.amount.toLocaleString()} WAM</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Voting Power</p>
                        <p className="font-semibold text-green-600">{position.votingMultiplier}x</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Points Earned</p>
                        <p className="font-semibold text-purple-600">{position.points}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Lock Period</p>
                        <p className="font-semibold">{position.lockPeriod}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      {position.status === 'active' && position.lockPeriod === 'None' && (
                        <Button size="sm" variant="outline">Unstake</Button>
                      )}
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        View Benefits
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Staking Summary */}
            <Card className="wam-card">
              <CardHeader>
                <CardTitle>Staking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Total Staked</span>
                    <span className="font-semibold">{userStats.stakedTokens.toLocaleString()} WAM</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Total Points</span>
                    <span className="font-semibold text-purple-600">{userStats.totalPoints.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span>Avg. Voting Power</span>
                    <span className="font-semibold">1.4x</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-gray-600 mt-2">
                    75% of available tokens staked
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button className="w-full wam-button-gradient" size="sm">
                      <Coins className="w-4 h-4 mr-2" />
                      Stake More Tokens
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      <Award className="w-4 h-4 mr-2" />
                      Redeem Points
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Voting Tab */}
        <TabsContent value="voting" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Voting History */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-lg font-semibold wam-text-gradient">Voting History</h3>
              <div className="space-y-3">
                {votingHistory.map((vote) => (
                  <Card key={vote.id} className="wam-card">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{vote.proposalTitle}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Voted: {vote.date}</span>
                            <span>Power: {vote.votingPower.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            className={
                              vote.vote === 'yes' 
                                ? 'bg-green-100 text-green-800' 
                                : vote.vote === 'no'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }
                          >
                            {vote.vote.toUpperCase()}
                          </Badge>
                          <Badge 
                            className={
                              vote.result === 'passed' 
                                ? 'bg-green-100 text-green-800' 
                                : vote.result === 'failed'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {vote.result}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Voting Stats */}
            <Card className="wam-card">
              <CardHeader>
                <CardTitle>Voting Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Total Votes Cast</span>
                    <span className="font-semibold">{userStats.proposalsVoted}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Voting Power</span>
                    <span className="font-semibold">{userStats.votingPower.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span>Participation Rate</span>
                    <span className="font-semibold text-green-600">85%</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Yes Votes</span>
                      <span>9 (75%)</span>
                    </div>
                    <Progress value={75} className="h-2 bg-green-100" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>No Votes</span>
                      <span>3 (25%)</span>
                    </div>
                    <Progress value={25} className="h-2 bg-red-100" />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full wam-button-gradient" size="sm">
                    <Vote className="w-4 h-4 mr-2" />
                    View Active Proposals
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Benefits Tab */}
        <TabsContent value="benefits" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Benefits Overview */}
            <Card className="wam-card">
              <CardHeader>
                <CardTitle>Community Benefits Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <p className="text-sm text-gray-600">Available to Redeem</p>
                    <p className="text-2xl font-bold wam-text-gradient">{userStats.totalPoints}</p>
                    <p className="text-xs text-gray-600">Community Points</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Benefits Unlocked</p>
                    <p className="text-2xl font-bold wam-text-gradient">7</p>
                    <p className="text-xs text-gray-600">Community Perks</p>
                  </div>
                </div>

                <Button className="w-full wam-button-gradient">
                  <Award className="w-4 h-4 mr-2" />
                  View Available Benefits ({userStats.totalPoints} Points)
                </Button>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Current Benefits</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Community Access</span>
                      <span className="font-semibold text-green-600">Active</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Bootcamp Priority</span>
                      <span className="font-semibold text-green-600">Active</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Volunteer Events</span>
                      <span className="font-semibold text-green-600">Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="wam-card">
              <CardHeader>
                <CardTitle>Achievements & Milestones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Active Voter</p>
                      <p className="text-xs text-gray-600">Cast 10+ votes in governance</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Coins className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Staking Pioneer</p>
                      <p className="text-xs text-gray-600">Staked tokens for 3+ months</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg opacity-50">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Governance Leader</p>
                      <p className="text-xs text-gray-500">Create a successful proposal</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg opacity-50">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Community Builder</p>
                      <p className="text-xs text-gray-500">Refer 5+ new members</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 text-center">
                    Complete achievements to earn bonus rewards!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
