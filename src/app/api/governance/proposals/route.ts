import { NextRequest, NextResponse } from 'next/server';
import { governanceService, analyticsService } from '@/lib/db/services';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const proposals = await governanceService.getProposals(status || undefined);

    return NextResponse.json({ proposals });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    
    // Return empty proposals array instead of 500 error for better UX
    return NextResponse.json({ 
      proposals: [],
      error: 'Database connection issue. Please check back later.' 
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, fundingAmount, tokenAllocation, category, createdBy, votingDuration } = body;

    // Validate required fields
    if (!title || !description || !category || !createdBy) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const votingEndsAt = new Date();
    votingEndsAt.setDate(votingEndsAt.getDate() + (votingDuration || 7)); // Default 7 days

    const proposal = await governanceService.createProposal({
      title,
      description,
      fundingAmount,
      tokenAllocation,
      category,
      createdBy,
      votingEndsAt
    });

    // Record user action
    await analyticsService.recordUserAction({
      walletAddress: createdBy,
      actionType: 'proposal_created',
      targetId: proposal.id,
      metadata: { title, category, fundingAmount }
    });

    return NextResponse.json(proposal, { status: 201 });
  } catch (error) {
    console.error('Error creating proposal:', error);
    return NextResponse.json({ error: 'Failed to create proposal' }, { status: 500 });
  }
}
