import { NextRequest, NextResponse } from 'next/server';
import { governanceService, analyticsService } from '@/lib/db/services';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const proposal = await governanceService.getProposal(id);
    if (!proposal) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }

    const votes = await governanceService.getProposalVotes(id);
    return NextResponse.json({ proposal, votes });
  } catch (error) {
    console.error('Error fetching proposal:', error);
    return NextResponse.json({ error: 'Failed to fetch proposal' }, { status: 500 });
  }
}
