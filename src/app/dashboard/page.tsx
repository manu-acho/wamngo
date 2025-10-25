import { Metadata } from 'next';
import { Layout } from '@/components/layout/layout';
import { Web3Provider } from '@/components/web3/Web3Provider';
import UserDashboard from '@/components/dashboard/UserDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Wallet, AlertCircle, ArrowRight, TrendingUp, Vote, Award } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'User Dashboard | WAM - Women Against Mutilations',
  description: 'Track your WAM tokens, staking rewards, voting history, and portfolio performance in your personal dashboard.',
};

// Disable static generation for this page since it uses Web3 hooks
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  // In a real app, you would check wallet connection status here
  const isWalletConnected = false; // This would come from your Web3 context

  return (
    <Layout>
      <Web3Provider>
        <div className="min-h-screen wam-gradient-surface">
          {/* Header */}
          <section className="pt-24 pb-8 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold wam-text-gradient mb-4">
                  Your WAM Dashboard
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Track your portfolio, manage staking positions, view voting history, and monitor your rewards.
                </p>
              </div>
            </div>
          </section>

          {/* Main Content */}
          <section className="pb-16 px-4">
            <div className="max-w-7xl mx-auto">
              {!isWalletConnected ? (
                /* Wallet Connection Required */
                <div className="max-w-2xl mx-auto">
                  <Card className="wam-card text-center p-8">
                    <CardContent className="space-y-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto">
                        <Wallet className="w-10 h-10 text-white" />
                      </div>
                      
                      <div>
                        <h2 className="text-2xl font-bold wam-text-gradient mb-3">
                          Connect Your Wallet
                        </h2>
                        <p className="text-gray-600 mb-6">
                          Connect your Web3 wallet to access your personal dashboard and track your WAM tokens, staking rewards, and voting history.
                        </p>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                          <div className="text-left">
                            <p className="text-sm font-medium text-amber-800 mb-1">
                              Wallet Required
                            </p>
                            <p className="text-sm text-amber-700">
                              You need to connect a Web3 wallet (like MetaMask) to access your dashboard. 
                              Make sure you have WAM tokens to see your full portfolio.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Button size="lg" className="wam-button-gradient w-full">
                          <Wallet className="mr-2 h-5 w-5" />
                          Connect Wallet
                        </Button>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link href="/token-sale" className="flex-1">
                            <Button variant="outline" className="w-full">
                              <ArrowRight className="mr-2 h-4 w-4" />
                              Get WAM Tokens
                            </Button>
                          </Link>
                          <Link href="/governance" className="flex-1">
                            <Button variant="outline" className="w-full">
                              <ArrowRight className="mr-2 h-4 w-4" />
                              Explore Governance
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                /* Connected Dashboard */
                <UserDashboard />
              )}
            </div>
          </section>

          {/* Features Preview for Non-Connected Users */}
          {!isWalletConnected && (
            <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold wam-text-gradient mb-4">
                    What You'll See in Your Dashboard
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Get a preview of the powerful features available once you connect your wallet.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="wam-card text-center p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold wam-text-gradient mb-2">Portfolio Overview</h3>
                    <p className="text-sm text-gray-600">
                      Track your total WAM token balance, staked amounts, and portfolio value in real-time.
                    </p>
                  </Card>

                  <Card className="wam-card text-center p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-teal-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold wam-text-gradient mb-2">Staking Rewards</h3>
                    <p className="text-sm text-gray-600">
                      Monitor your staking positions, earned rewards, and APR rates across different pools.
                    </p>
                  </Card>

                  <Card className="wam-card text-center p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-purple-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Vote className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold wam-text-gradient mb-2">Voting History</h3>
                    <p className="text-sm text-gray-600">
                      Review your governance participation, voting power, and proposal outcomes.
                    </p>
                  </Card>

                  <Card className="wam-card text-center p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold wam-text-gradient mb-2">Achievements</h3>
                    <p className="text-sm text-gray-600">
                      Unlock milestones and earn bonus rewards for active participation in the community.
                    </p>
                  </Card>
                </div>
              </div>
            </section>
          )}
        </div>
      </Web3Provider>
    </Layout>
  );
}
