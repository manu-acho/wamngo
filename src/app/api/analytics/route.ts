import { NextRequest, NextResponse } from 'next/server';
import { analyticsService, userService, governanceService, tokenService } from '@/lib/db/services';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '7d';
    
    // Calculate date range
    const now = new Date();
    const daysBack = timeframe === '24h' ? 1 : 
                    timeframe === '7d' ? 7 :
                    timeframe === '30d' ? 30 : 90;
    
    const startDate = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));

    // Get basic statistics
    const [
      totalUsers,
      totalProposals,
      totalVotes,
      totalTokensPurchased,
      recentActivity
    ] = await Promise.all([
      userService.getTotalUsers(),
      governanceService.getTotalProposals(),
      governanceService.getTotalVotes(),
      tokenService.getTotalTokensPurchased(),
      analyticsService.getRecentActivity(50)
    ]);

    // Get active users (users with activity in the timeframe)
    const activeUsers = await analyticsService.getActiveUsersCount(startDate, now);

    // Get active proposals
    const activeProposals = await governanceService.getActiveProposalsCount();

    // Get proposal statistics
    const proposalStats = await governanceService.getProposalStats();

    // Calculate total volume
    const totalVolume = totalTokensPurchased * 0.10; // $0.10 per token

    // Transform recent activity for display
    const transformedActivity = recentActivity.map(activity => ({
      id: activity.id,
      type: activity.actionType,
      description: generateActivityDescription(activity),
      timestamp: activity.createdAt.toISOString(),
      user: activity.walletAddress ? 
        `${activity.walletAddress.substring(0, 6)}...${activity.walletAddress.substring(-4)}` : 
        undefined
    }));

    // Get user growth data (simplified)
    const userGrowth = await getUserGrowthData(startDate, now);

    const analyticsData = {
      totalUsers,
      activeUsers,
      totalProposals,
      activeProposals,
      totalVotes,
      totalTokensPurchased,
      totalVolume,
      recentActivity: transformedActivity,
      userGrowth,
      proposalStats: {
        passed: proposalStats.completed || 0,
        rejected: proposalStats.rejected || 0,
        active: proposalStats.active || 0
      }
    };

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}

function generateActivityDescription(activity: any): string {
  switch (activity.actionType) {
    case 'user_registered':
      return 'New user registered';
    case 'proposal_created':
      return `New proposal created: ${activity.metadata?.title || 'Proposal'}`;
    case 'proposal_voted':
      return `Vote cast on proposal (${activity.metadata?.voteChoice})`;
    case 'token_purchase':
      return `Purchased ${activity.metadata?.amountTokens || 0} WAM tokens`;
    case 'project_submitted':
      return `New project submitted: ${activity.metadata?.title || 'Project'}`;
    case 'contact_submitted':
      return 'New contact form submission';
    default:
      return `${activity.actionType.replace('_', ' ')}`;
  }
}

async function getUserGrowthData(startDate: Date, endDate: Date) {
  // This would typically query the database for user registration data over time
  // For now, return mock data structure
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));
  const growth = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate.getTime() + (i * 24 * 60 * 60 * 1000));
    growth.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 10) + 1 // Mock data
    });
  }
  
  return growth;
}
