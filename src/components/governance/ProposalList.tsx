"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Vote, Clock, CheckCircle, XCircle, Users, Calendar, TrendingUp } from 'lucide-react';

interface Proposal {
  id: number;
  title: string;
  description: string;
  category: string;
  creator: string;
  status: 'active' | 'passed' | 'failed' | 'pending';
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  minVotes: number;
  endDate: string;
  fundingAmount?: string;
  projectType: string;
}

const mockProposals: Proposal[] = [
  {
    id: 1,
    title: "Fund AI-Powered Maternal Health System",
    description: "Proposal to allocate $3M for developing a comprehensive AI-powered maternal health system. Voice-first AI providing real-time health guidance in native languages, deployable offline on edge devices.",
    category: "Health",
    creator: "Community",
    status: "pending",
    votesFor: 0,
    votesAgainst: 0,
    totalVotes: 0,
    minVotes: 1000,
    endDate: "Q1 2026",
    fundingAmount: "$3,000,000",
    projectType: "AI/Health"
  },
  {
    id: 2,
    title: "Smart Agricultural Advisory Network",
    description: "AI-powered platform providing instant agricultural advice to smallholder farmers. Combining computer vision, weather prediction, and local knowledge to increase crop yields by 40%.",
    category: "Agriculture",
    creator: "Community",
    status: "pending",
    votesFor: 0,
    votesAgainst: 0,
    totalVotes: 0,
    minVotes: 1000,
    endDate: "Q1 2026",
    fundingAmount: "$2,500,000",
    projectType: "AgTech/AI"
  },
  {
    id: 3,
    title: "Digital Inclusion AI Platform",
    description: "Multilingual AI platform to bridge the digital divide through culturally-aware services in health, education, and economic empowerment. Targeting 5M+ underserved users.",
    category: "Education",
    creator: "Community",
    status: "pending",
    votesFor: 0,
    votesAgainst: 0,
    totalVotes: 0,
    minVotes: 1000,
    endDate: "Q1 2026",
    fundingAmount: "$1,800,000",
    projectType: "Education/AI"
  },
  {
    id: 4,
    title: "Advanced Reconstruction Technology Scale-Up",
    description: "Scale-up funding for advanced radio frequency technology for FGM survivor reconstruction. Expanding from pilot program to support 10,000 reconstructions across 20 treatment centers.",
    category: "Health",
    creator: "Community",
    status: "pending",
    votesFor: 0,
    votesAgainst: 0,
    totalVotes: 0,
    minVotes: 1000,
    endDate: "Q1 2026",
    fundingAmount: "$4,000,000",
    projectType: "Medical/Tech"
  }
];

export default function ProposalList() {
  const [filter, setFilter] = useState<string>('all');
  const [userVotes, setUserVotes] = useState<Record<number, 'for' | 'against' | null>>({});

  const filteredProposals = filter === 'all' 
    ? mockProposals 
    : mockProposals.filter(p => p.status === filter);

  const handleVote = (proposalId: number, vote: 'for' | 'against') => {
    setUserVotes(prev => ({ ...prev, [proposalId]: vote }));
    // Here you would integrate with smart contract
    console.log(`Voting ${vote} on proposal ${proposalId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Clock className="w-4 h-4" />;
      case 'passed': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Calendar className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending'].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status === 'all' ? 'All Projects' : 'Awaiting DAO Launch'}
          </Button>
        ))}
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        {filteredProposals.map((proposal) => (
          <Card key={proposal.id} className="wam-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getStatusColor(proposal.status)}>
                      {getStatusIcon(proposal.status)}
                      <span className="ml-1">{proposal.status.toUpperCase()}</span>
                    </Badge>
                    <Badge variant="outline">{proposal.category}</Badge>
                    {proposal.fundingAmount && (
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        {proposal.fundingAmount}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg sm:text-xl wam-text-gradient">
                    {proposal.title}
                  </CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    by {proposal.creator} • {proposal.projectType}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-gray-600 leading-relaxed">
                {proposal.description}
              </p>

              {/* Voting Progress */}
              {proposal.status === 'pending' ? (
                <div className="space-y-3">
                  <div className="text-center py-4">
                    <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 font-medium">Preview - Voting Not Yet Available</p>
                    <p className="text-xs text-gray-500">Voting will open when DAO launches in Q1 2026</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      For: {proposal.votesFor.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
                      Against: {proposal.votesAgainst.toLocaleString()}
                    </span>
                  </div>

                  <Progress 
                    value={(proposal.votesFor / (proposal.votesFor + proposal.votesAgainst)) * 100} 
                    className="h-2"
                  />

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{proposal.totalVotes.toLocaleString()} total votes</span>
                    <span>Min required: {proposal.minVotes.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Voting Actions */}
              {proposal.status === 'pending' && (
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-blue-800 mb-1">Voting Available When DAO Launches</p>
                    <p className="text-xs text-blue-600">Community voting begins in Q1 2026</p>
                  </div>
                </div>
              )}

              {proposal.status === 'active' && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <div className="flex gap-2 flex-1">
                    <Button
                      onClick={() => handleVote(proposal.id, 'for')}
                      variant={userVotes[proposal.id] === 'for' ? 'default' : 'outline'}
                      className={`flex-1 ${userVotes[proposal.id] === 'for' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-50 hover:border-green-300'}`}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Vote For
                    </Button>
                    <Button
                      onClick={() => handleVote(proposal.id, 'against')}
                      variant={userVotes[proposal.id] === 'against' ? 'default' : 'outline'}
                      className={`flex-1 ${userVotes[proposal.id] === 'against' ? 'bg-red-600 hover:bg-red-700' : 'hover:bg-red-50 hover:border-red-300'}`}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Vote Against
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Ends {new Date(proposal.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
              )}

              {/* Vote Confirmation */}
              {userVotes[proposal.id] && (
                <div className={`p-3 rounded-lg ${userVotes[proposal.id] === 'for' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className={`text-sm font-medium ${userVotes[proposal.id] === 'for' ? 'text-green-800' : 'text-red-800'}`}>
                    ✓ You voted {userVotes[proposal.id]?.toUpperCase()} this proposal
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
