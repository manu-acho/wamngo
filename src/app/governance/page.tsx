import { Metadata } from 'next';
import Link from 'next/link';
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Vote, Users, Calendar, CheckCircle, Clock, TrendingUp, Shield, Coins } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DAO Governance | WAM - Women Against Mutilations',
  description: 'Participate in decentralized governance. Vote on project proposals, shape funding decisions, and help build a better future for women\'s rights.',
};

export default function GovernancePage() {
  return (
    <Layout>
      <div className="min-h-screen wam-gradient-surface">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8 inline-flex items-center px-4 py-2 rounded-full wam-card border-purple-200">
              <Vote className="w-4 h-4 mr-2 text-purple-600" />
              DAO Governance - Coming Soon
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 wam-text-gradient">
              Shape the Future
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join our decentralized autonomous organization (DAO) to have your say in which projects receive funding. Your voice will matter in creating lasting change.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
              <div className="wam-card p-6 text-center">
                <div className="text-3xl font-bold wam-text-gradient mb-2">1,000+</div>
                <div className="text-gray-600">Target Voters</div>
                <div className="text-sm text-purple-600 mt-1">Goal for launch</div>
              </div>
              
              <div className="wam-card p-6 text-center">
                <div className="text-3xl font-bold wam-text-gradient mb-2">50+</div>
                <div className="text-gray-600">Planned Proposals</div>
                <div className="text-sm text-pink-600 mt-1">Annual target</div>
              </div>
              
              <div className="wam-card p-6 text-center">
                <div className="text-3xl font-bold wam-text-gradient mb-2">$5M</div>
                <div className="text-gray-600">Funding Goal</div>
                <div className="text-sm text-teal-600 mt-1">Community treasury target</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold wam-text-gradient mb-4">How DAO Governance Will Work</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our planned decentralized governance will ensure transparency, community involvement, and democratic decision-making in funding women's rights projects.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold wam-text-gradient mb-2">Hold WAM Tokens</h3>
                <p className="text-gray-600">Purchase WAM tokens to gain voting rights. More tokens = more voting power.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold wam-text-gradient mb-2">Review Proposals</h3>
                <p className="text-gray-600">Examine project proposals with detailed budgets, timelines, and impact metrics.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Vote className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold wam-text-gradient mb-2">Cast Your Vote</h3>
                <p className="text-gray-600">Vote on proposals during the voting period. All votes will be recorded on blockchain.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold wam-text-gradient mb-2">Track Impact</h3>
                <p className="text-gray-600">Monitor funded projects' progress and see the real-world impact of your decisions.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Proposals */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold wam-text-gradient mb-4">Sample Proposals</h2>
              <p className="text-xl text-gray-600">
                Examples of the types of proposals that will be voted on once our DAO launches.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sample Proposal 1 */}
              <Card className="wam-card hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2 wam-text-gradient">Expand Safe Houses Network in Kenya</CardTitle>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                        <Clock className="w-3 h-3 mr-1" />
                        Sample Proposal
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold wam-text-gradient">Example</div>
                      <div className="text-sm text-gray-500">Future voting</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Fund the establishment of 5 additional safe houses across rural Kenya, providing shelter and support for women escaping FGM and domestic violence.
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Funding Requested</span>
                      <span className="font-semibold">$185,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Projected Impact</span>
                      <span className="font-semibold">500+ women helped</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full w-0"></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button disabled className="flex-1 bg-gray-300 text-gray-500 cursor-not-allowed">
                      DAO Coming Soon
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Sample Proposal 2 */}
              <Card className="wam-card hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2 wam-text-gradient">Digital Literacy Program for Rural Women</CardTitle>
                      <Badge variant="secondary" className="bg-pink-100 text-pink-800">
                        <Clock className="w-3 h-3 mr-1" />
                        Sample Proposal
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold wam-text-gradient">Example</div>
                      <div className="text-sm text-gray-500">Future voting</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Launch a comprehensive digital literacy program targeting 1,000 rural women across 3 countries, providing technology skills and online safety training.
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Funding Requested</span>
                      <span className="font-semibold">$120,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Projected Impact</span>
                      <span className="font-semibold">1,000+ women trained</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full w-0"></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button disabled className="flex-1 bg-gray-300 text-gray-500 cursor-not-allowed">
                      DAO Coming Soon
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Governance Goals */}
        <section className="py-16 px-4 wam-gradient-surface">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold wam-text-gradient mb-4">Governance Goals</h2>
              <p className="text-xl text-gray-600">
                Our ambitious targets for how community governance will shape WAM's funding decisions and global impact.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="wam-card p-6 text-center">
                <div className="text-3xl font-bold wam-text-gradient mb-2">100+</div>
                <div className="text-gray-600">Annual Proposals</div>
                <div className="text-sm text-purple-600 mt-1">Target for year 1</div>
              </div>
              
              <div className="wam-card p-6 text-center">
                <div className="text-3xl font-bold wam-text-gradient mb-2">$5M</div>
                <div className="text-gray-600">Treasury Goal</div>
                <div className="text-sm text-pink-600 mt-1">Total allocation target</div>
              </div>
              
              <div className="wam-card p-6 text-center">
                <div className="text-3xl font-bold wam-text-gradient mb-2">50K+</div>
                <div className="text-gray-600">Women to Help</div>
                <div className="text-sm text-teal-600 mt-1">Direct beneficiaries goal</div>
              </div>
              
              <div className="wam-card p-6 text-center">
                <div className="text-3xl font-bold wam-text-gradient mb-2">25</div>
                <div className="text-gray-600">Countries Target</div>
                <div className="text-sm text-purple-600 mt-1">Global reach goal</div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started */}
        <section className="py-16 px-4 wam-gradient-bg relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 blur-xl animate-pulse animation-delay-1000"></div>
          </div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Shape the Future?</h2>
            <p className="text-xl mb-8 text-white/90">
              Be among the first to join our DAO when it launches. Get notified and help shape the future of women's rights through decentralized governance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/token-sale">
                <Button size="lg" className="wam-btn-primary">
                  <Coins className="mr-2 h-5 w-5" />
                  Get Notified for WAM Tokens
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="bg-white/10 border-2 border-white/30 text-white hover:bg-white/20">
                  <Users className="mr-2 h-5 w-5" />
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
