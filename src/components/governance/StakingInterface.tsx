"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Coins, Users, Clock, Zap, Lock, Unlock, Award, BookOpen, Globe, Heart } from 'lucide-react';

interface StakingPool {
  id: number;
  name: string;
  votingPowerMultiplier: number;
  lockPeriod: string;
  totalStaked: string;
  minStake: number;
  maxStake: number;
  description: string;
  benefits: string[];
  pointsPerDay: number;
  status: 'active' | 'paused' | 'full';
}

const stakingPools: StakingPool[] = [
  {
    id: 1,
    name: "Community Staking",
    votingPowerMultiplier: 1.0,
    lockPeriod: "No lock",
    totalStaked: "0 WAM",
    minStake: 100,
    maxStake: 100000,
    description: "Flexible staking for governance participation",
    benefits: ["1x Voting Power", "Community Access", "Monthly Newsletter"],
    pointsPerDay: 1,
    status: "paused"
  },
  {
    id: 2,
    name: "Advocate Staking",
    votingPowerMultiplier: 1.5,
    lockPeriod: "30 days",
    totalStaked: "0 WAM",
    minStake: 500,
    maxStake: 250000,
    description: "Enhanced governance power with commitment",
    benefits: ["1.5x Voting Power", "Bootcamp Priority", "Volunteer Events", "Educational Webinars"],
    pointsPerDay: 3,
    status: "paused"
  },
  {
    id: 3,
    name: "Champion Staking",
    votingPowerMultiplier: 2.0,
    lockPeriod: "90 days",
    totalStaked: "0 WAM",
    minStake: 1000,
    maxStake: 500000,
    description: "Maximum governance power for dedicated advocates",
    benefits: ["2x Voting Power", "Conference Tickets", "Scholarship Priority", "Mentorship Access", "Leadership Council"],
    pointsPerDay: 5,
    status: "paused"
  }
];

interface UserStaking {
  poolId: number;
  amount: number;
  startDate: string;
  endDate?: string;
  points: number;
  totalBenefitsEarned: string[];
}

const mockUserStaking: UserStaking[] = [];

export default function StakingInterface() {
  const [selectedPool, setSelectedPool] = useState<number | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [userBalance] = useState(0); // No tokens yet

  const totalStaked = mockUserStaking.reduce((sum, stake) => sum + stake.amount, 0);
  const totalPoints = mockUserStaking.reduce((sum, stake) => sum + stake.points, 0);

  const handleStake = (poolId: number) => {
    console.log(`Staking ${stakeAmount} WAM in pool ${poolId}`);
    // Here you would integrate with smart contract
    setStakeAmount('');
    setSelectedPool(null);
  };

  const handleUnstake = (poolId: number, amount: number) => {
    console.log(`Unstaking ${amount} WAM from pool ${poolId}`);
    // Here you would integrate with smart contract
  };

  const getPoolStatus = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'full': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* User Staking Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="wam-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coins className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold wam-text-gradient mb-1">
              {totalStaked.toLocaleString()} WAM
            </div>
            <div className="text-gray-600 text-sm">Total Staked</div>
            <div className="text-xs text-gray-500 mt-1">Available when DAO launches</div>
          </CardContent>
        </Card>

        <Card className="wam-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold wam-text-gradient mb-1">
              {totalPoints.toLocaleString()}
            </div>
            <div className="text-gray-600 text-sm">Total Points Earned</div>
            <div className="text-xs text-gray-500 mt-1">Earn points by staking</div>
          </CardContent>
        </Card>

        <Card className="wam-card">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold wam-text-gradient mb-1">
              {userBalance.toLocaleString()} WAM
            </div>
            <div className="text-gray-600 text-sm">Available Balance</div>
            <div className="text-xs text-gray-500 mt-1">Get tokens when sale launches</div>
          </CardContent>
        </Card>
      </div>

      {/* Staking Pools */}
      <div>
        <h3 className="text-2xl font-bold wam-text-gradient mb-6">Staking Pools</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {stakingPools.map((pool) => (
            <Card key={pool.id} className="wam-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{pool.name}</CardTitle>
                  <Badge className={getPoolStatus(pool.status)}>
                    {pool.status.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold wam-text-gradient mb-1">
                    {pool.votingPowerMultiplier}x
                  </div>
                  <div className="text-gray-600 text-sm">Voting Power</div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Lock Period:</span>
                    <span className="font-medium">{pool.lockPeriod}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total Staked:</span>
                    <span className="font-medium">{pool.totalStaked}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Points/Day:</span>
                    <span className="font-medium">{pool.pointsPerDay}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Min Stake:</span>
                    <span className="font-medium">{pool.minStake.toLocaleString()} WAM</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs font-medium text-gray-700 mb-2">Benefits Include:</div>
                  <div className="space-y-1">
                    {pool.benefits.slice(0, 3).map((benefit, index) => (
                      <div key={index} className="text-xs text-gray-600 flex items-center">
                        <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                        {benefit}
                      </div>
                    ))}
                    {pool.benefits.length > 3 && (
                      <div className="text-xs text-gray-500">+{pool.benefits.length - 3} more benefits</div>
                    )}
                  </div>
                </div>

                <p className="text-sm text-gray-600">{pool.description}</p>

                {selectedPool === pool.id ? (
                  <div className="space-y-3">
                    <Input
                      type="number"
                      placeholder={`Min: ${pool.minStake} WAM`}
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      min={pool.minStake}
                      max={Math.min(pool.maxStake, userBalance)}
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleStake(pool.id)}
                        className="flex-1 wam-btn-primary"
                        disabled={!stakeAmount || parseInt(stakeAmount) < pool.minStake}
                      >
                        Stake
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setSelectedPool(null)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => setSelectedPool(pool.id)}
                    className="w-full"
                    disabled={true}
                    variant="outline"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Available Q1 2026
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Stakes */}
      {mockUserStaking.length > 0 ? (
        <div>
          <h3 className="text-2xl font-bold wam-text-gradient mb-6">Your Active Stakes</h3>
          <div className="space-y-4">
            {mockUserStaking.map((stake, index) => {
              const pool = stakingPools.find(p => p.id === stake.poolId);
              const isLocked = stake.endDate ? new Date(stake.endDate) > new Date() : false;
              
              return (
                <Card key={index} className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{pool?.name}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
                          <div>
                            <span className="text-gray-600">Amount:</span>
                            <div className="font-medium">{stake.amount.toLocaleString()} WAM</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Points Earned:</span>
                            <div className="font-medium text-purple-600">{stake.points.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Started:</span>
                            <div className="font-medium">{new Date(stake.startDate).toLocaleDateString()}</div>
                          </div>
                          {stake.endDate && (
                            <div>
                              <span className="text-gray-600">Unlocks:</span>
                              <div className="font-medium">{new Date(stake.endDate).toLocaleDateString()}</div>
                            </div>
                          )}
                        </div>
                        
                        {stake.totalBenefitsEarned.length > 0 && (
                          <div className="mt-3 p-2 bg-green-50 rounded-lg">
                            <div className="text-xs font-medium text-green-800 mb-1">Benefits Unlocked:</div>
                            <div className="flex flex-wrap gap-1">
                              {stake.totalBenefitsEarned.map((benefit, index) => (
                                <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                  {benefit}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleUnstake(stake.poolId, stake.amount)}
                          variant={isLocked ? "outline" : "default"}
                          disabled={isLocked}
                          className={!isLocked ? "bg-orange-600 hover:bg-orange-700" : ""}
                        >
                          {isLocked ? (
                            <>
                              <Lock className="w-4 h-4 mr-2" />
                              Locked
                            </>
                          ) : (
                            <>
                              <Unlock className="w-4 h-4 mr-2" />
                              Unstake
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Coins className="w-10 h-10 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold wam-text-gradient mb-3">No Staking Positions Yet</h3>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Staking will be available when the DAO launches in Q1 2026. Stake WAM tokens to earn voting power and community benefits.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button disabled variant="outline" className="opacity-60">
              <Clock className="w-4 h-4 mr-2" />
              Staking Coming Soon
            </Button>
          </div>
        </div>
      )}

      {/* Points Redemption */}
      <div className="mt-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold wam-text-gradient mb-4">Redeem Your Points</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Use your earned points to access exclusive opportunities and contribute to the WAM community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="wam-card text-center p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold wam-text-gradient mb-2">Bootcamp Access</h4>
            <p className="text-sm text-gray-600 mb-3">
              Exclusive women's rights and Web3 technology bootcamps
            </p>
            <div className="text-lg font-bold text-purple-600 mb-2">500 Points</div>
            <Button size="sm" disabled className="w-full">
              Redeem
            </Button>
          </Card>

          <Card className="wam-card text-center p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold wam-text-gradient mb-2">Volunteer Camps</h4>
            <p className="text-sm text-gray-600 mb-3">
              Join field volunteer programs in partner communities
            </p>
            <div className="text-lg font-bold text-purple-600 mb-2">750 Points</div>
            <Button size="sm" disabled className="w-full">
              Redeem
            </Button>
          </Card>

          <Card className="wam-card text-center p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-pink-600" />
            </div>
            <h4 className="font-semibold wam-text-gradient mb-2">Scholarships</h4>
            <p className="text-sm text-gray-600 mb-3">
              Educational scholarships for women in technology
            </p>
            <div className="text-lg font-bold text-purple-600 mb-2">1,000 Points</div>
            <Button size="sm" disabled className="w-full">
              Redeem
            </Button>
          </Card>

          <Card className="wam-card text-center p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-6 w-6 text-teal-600" />
            </div>
            <h4 className="font-semibold wam-text-gradient mb-2">Conference Tickets</h4>
            <p className="text-sm text-gray-600 mb-3">
              Access to top Web3 and women's rights conferences
            </p>
            <div className="text-lg font-bold text-purple-600 mb-2">1,200 Points</div>
            <Button size="sm" disabled className="w-full">
              Redeem
            </Button>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full">
            <Heart className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm text-blue-800 font-medium">
              Point redemption available when DAO launches in Q1 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
