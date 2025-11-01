import { NextRequest, NextResponse } from 'next/server';
import { adminService } from '@/lib/db/services';
import { withAdminAuth, extractWalletFromRequest } from '@/lib/auth/admin';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAdminAuth(request, async (req, adminContext) => {
    try {
      const { id } = await params;
      const body = await request.json();
      const { title, description, fundingAmount, tokenAllocation, category, status } = body;

      if (!adminContext.walletAddress) {
        return NextResponse.json({ error: 'Admin wallet required' }, { status: 400 });
      }

      const proposal = await adminService.updateProposal(
        id,
        { title, description, fundingAmount, tokenAllocation, category, status },
        adminContext.walletAddress
      );

      return NextResponse.json(proposal);
    } catch (error) {
      console.error('Error updating proposal:', error);
      return NextResponse.json({ error: 'Failed to update proposal' }, { status: 500 });
    }
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAdminAuth(request, async (req, adminContext) => {
    try {
      const { id } = await params;
      const body = await request.json();
      const { reason } = body;

      if (!adminContext.walletAddress) {
        return NextResponse.json({ error: 'Admin wallet required' }, { status: 400 });
      }

      const proposal = await adminService.deleteProposal(
        id,
        adminContext.walletAddress,
        reason
      );

      return NextResponse.json({ message: 'Proposal deleted', proposal });
    } catch (error) {
      console.error('Error deleting proposal:', error);
      return NextResponse.json({ error: 'Failed to delete proposal' }, { status: 500 });
    }
  });
}
