import { NextRequest, NextResponse } from 'next/server';
import { governanceService, analyticsService } from '@/lib/db/services';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { voterWallet, voteType, stakeAmount, reason } = body;

    // Validate required fields
    if (!voterWallet || !voteType || !stakeAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if user has already voted
    const hasVoted = await governanceService.hasUserVoted(id, voterWallet);
    if (hasVoted) {
      return NextResponse.json({ error: 'User has already voted on this proposal' }, { status: 400 });
    }

    const vote = await governanceService.castVote({
      proposalId: id,
      voterWallet,
      voteType,
      stakeAmount,
      reason
    });

    // Record user action
    await analyticsService.recordUserAction({
      walletAddress: voterWallet,
      actionType: 'vote_cast',
      targetId: id,
      metadata: { voteType, stakeAmount }
    });

    return NextResponse.json(vote, { status: 201 });
  } catch (error) {
    console.error('Error casting vote:', error);
    return NextResponse.json({ error: 'Failed to cast vote' }, { status: 500 });
  }
}
