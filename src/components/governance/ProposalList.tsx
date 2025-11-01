"use client";

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Vote, Clock, CheckCircle, XCircle, Users, Calendar, TrendingUp } from 'lucide-react';
import EditProposalModal from '@/components/admin/EditProposalModal';

interface DatabaseProposal {
  id: string;
  title: string;
  description: string;
  category: string; // Maps to category field from DB
  createdBy: string; // Maps to createdBy field from DB  
  status: 'pending' | 'active' | 'passed' | 'rejected' | 'executed';
  votingEndsAt: string | null;
  fundingAmount: string | null;
  tokenAllocation: string | null;
  votesFor: number;
  votesAgainst: number;
  totalStakeFor: string;
  totalStakeAgainst: string;
  createdAt: string;
  metadata: any;
}

interface Proposal {
  id: string;
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

interface ProposalListProps {
  initialProposals?: DatabaseProposal[];
}

export default function ProposalList({ initialProposals = [] }: ProposalListProps) {
  // Initialize Web3 hooks conditionally
  let address: string | undefined;
  try {
    const account = useAccount();
    address = account.address;
  } catch (error) {
    // Not in wagmi context, address will be undefined
    address = undefined;
  }

  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingProposal, setEditingProposal] = useState<string | null>(null);
  const [loading, setLoading] = useState(!initialProposals.length);
  const [voting, setVoting] = useState<string | null>(null);

  useEffect(() => {
    if (initialProposals.length > 0) {
      // Transform database proposals to component format
      const transformedProposals = initialProposals.map(transformProposal);
      setProposals(transformedProposals);
      setLoading(false);
    } else {
      fetchProposals();
    }
    
    // Check admin status
    if (address) {
      checkAdminStatus();
    }
  }, [initialProposals, address]);

  const transformProposal = (dbProposal: DatabaseProposal): Proposal => {
    // Handle wallet address with null check
    const walletAddress = dbProposal.createdBy || '';
    const formattedCreator = walletAddress ? 
      `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}` : 
      'Unknown';
    
    return {
      id: dbProposal.id,
      title: dbProposal.title,
      description: dbProposal.description,
      category: dbProposal.category,
      creator: formattedCreator,
      status: dbProposal.status === 'active' ? 'active' : 
              dbProposal.status === 'passed' ? 'passed' : 'failed',
      votesFor: dbProposal.votesFor || 0,
      votesAgainst: dbProposal.votesAgainst || 0,
      totalVotes: (dbProposal.votesFor || 0) + (dbProposal.votesAgainst || 0),
      minVotes: 100, // Default value since not in DB schema
      endDate: dbProposal.votingEndsAt ? new Date(dbProposal.votingEndsAt).toLocaleDateString() : 'TBD',
      fundingAmount: dbProposal.fundingAmount ? `$${parseFloat(dbProposal.fundingAmount).toLocaleString()}` : undefined,
      projectType: dbProposal.category || 'General', // Map category to projectType
    };
  };

  const fetchProposals = async () => {
    try {
      const response = await fetch('/api/governance/proposals');
      if (response.ok) {
        const data = await response.json();
        const transformedProposals = data.proposals.map(transformProposal);
        setProposals(transformedProposals);
      }
    } catch (error) {
      console.error('Error fetching proposals:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAdminStatus = async () => {
    if (!address) return;
    
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'X-Wallet-Address': address,
        },
      });
      
      if (response.ok) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const deleteProposal = async (proposalId: string) => {
    if (!address || !isAdmin) return;
    
    const reason = prompt('Please provide a reason for deletion (optional):');
    
    try {
      const response = await fetch(`/api/admin/proposals/${proposalId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Wallet-Address': address,
        },
        body: JSON.stringify({ reason }),
      });
      
      if (response.ok) {
        // Remove from local state
        setProposals(proposals.filter(p => p.id !== proposalId));
        alert('Proposal deleted successfully');
      } else {
        alert('Failed to delete proposal');
      }
    } catch (error) {
      console.error('Error deleting proposal:', error);
      alert('Error deleting proposal');
    }
  };

  const handleEditProposal = (proposalId: string, updatedData: any) => {
    // Update the proposal in local state
    setProposals(proposals.map(p => 
      p.id === proposalId 
        ? { ...p, ...updatedData, fundingAmount: updatedData.fundingAmount ? `$${parseFloat(updatedData.fundingAmount).toLocaleString()}` : undefined }
        : p
    ));
  };

  const handleVote = async (proposalId: string, voteChoice: 'yes' | 'no' | 'abstain') => {
    if (!address) return;
    
    setVoting(proposalId);
    try {
      const response = await fetch(`/api/governance/proposals/${proposalId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: address,
          voteChoice,
          votingPower: 1 // This would be calculated based on user's stake
        })
      });

      if (response.ok) {
        // Refresh proposals to show updated vote counts
        await fetchProposals();
        // Update local state to show user's vote
        setUserVotes(prev => ({ ...prev, [proposalId]: voteChoice }));
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setVoting(null);
    }
  };

  const [filter, setFilter] = useState<string>('all');
  const [userVotes, setUserVotes] = useState<Record<string, 'yes' | 'no' | 'abstain' | null>>({});

  const filteredProposals = filter === 'all' 
    ? proposals 
    : proposals.filter(p => p.status === filter);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-48 bg-gray-300 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

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
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(proposal.status)}>
                        {getStatusIcon(proposal.status)}
                        <span className="ml-1 capitalize">{proposal.status}</span>
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {proposal.category}
                      </Badge>
                      {proposal.fundingAmount && (
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          {proposal.fundingAmount}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Admin Controls */}
                    {isAdmin && (
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingProposal(proposal.id)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteProposal(proposal.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          Delete
                        </Button>
                      </div>
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
                  {!address ? (
                    <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-sm font-medium text-amber-800 mb-1">Connect Wallet to Vote</p>
                      <p className="text-xs text-amber-600">You need to connect your Web3 wallet to participate in governance voting.</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2 flex-1">
                        <Button
                          onClick={() => handleVote(proposal.id, 'yes')}
                          variant={userVotes[proposal.id] === 'yes' ? 'default' : 'outline'}
                          className={`flex-1 ${userVotes[proposal.id] === 'yes' ? 'bg-green-600 hover:bg-green-700' : 'hover:bg-green-50 hover:border-green-300'}`}
                          disabled={voting === proposal.id}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          {voting === proposal.id ? 'Voting...' : 'Vote Yes'}
                        </Button>
                        <Button
                          onClick={() => handleVote(proposal.id, 'no')}
                          variant={userVotes[proposal.id] === 'no' ? 'default' : 'outline'}
                          className={`flex-1 ${userVotes[proposal.id] === 'no' ? 'bg-red-600 hover:bg-red-700' : 'hover:bg-red-50 hover:border-red-300'}`}
                          disabled={voting === proposal.id}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          {voting === proposal.id ? 'Voting...' : 'Vote No'}
                        </Button>
                        <Button
                          onClick={() => handleVote(proposal.id, 'abstain')}
                          variant={userVotes[proposal.id] === 'abstain' ? 'default' : 'outline'}
                          className="flex-1"
                          disabled={voting === proposal.id}
                        >
                          Abstain
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Ends {new Date(proposal.endDate).toLocaleDateString()}</span>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Vote Confirmation */}
              {userVotes[proposal.id] && (
                <div className={`p-3 rounded-lg ${
                  userVotes[proposal.id] === 'yes' ? 'bg-green-50 border border-green-200' : 
                  userVotes[proposal.id] === 'no' ? 'bg-red-50 border border-red-200' :
                  'bg-gray-50 border border-gray-200'
                }`}>
                  <p className={`text-sm font-medium ${
                    userVotes[proposal.id] === 'yes' ? 'text-green-800' : 
                    userVotes[proposal.id] === 'no' ? 'text-red-800' :
                    'text-gray-800'
                  }`}>
                    ✓ You voted {userVotes[proposal.id]?.toUpperCase()} on this proposal
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Proposal Modal */}
      {editingProposal && address && (
        <EditProposalModal
          proposal={proposals.find(p => p.id === editingProposal)!}
          onClose={() => setEditingProposal(null)}
          onSave={handleEditProposal}
          userWallet={address}
        />
      )}
    </div>
  );
}
