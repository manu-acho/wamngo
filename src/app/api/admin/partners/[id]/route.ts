import { NextRequest, NextResponse } from 'next/server';
import { partnerService, adminService } from '@/lib/db/services';
import { withAdminAuth } from '@/lib/auth/admin';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAdminAuth(request, async (request, adminContext) => {
    try {
      const { id } = await params;
      const data = await request.json();
      
      const partner = await partnerService.updatePartner(id, data);
      
      if (!partner) {
        return NextResponse.json(
          { error: 'Partner not found' },
          { status: 404 }
        );
      }
      
      // Log admin action
      await adminService.logAdminAction({
        adminWallet: adminContext.walletAddress!,
        actionType: 'update_partner',
        targetType: 'partner',
        targetId: partner.id,
        metadata: { partnerName: partner.name }
      });
      
      return NextResponse.json({ 
        message: 'Partner updated successfully',
        partner 
      });
    } catch (error) {
      console.error('Error updating partner:', error);
      return NextResponse.json(
        { error: 'Failed to update partner' },
        { status: 500 }
      );
    }
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAdminAuth(request, async (request, adminContext) => {
    try {
      const { id } = await params;
      const { reason } = await request.json();
      
      if (!reason) {
        return NextResponse.json(
          { error: 'Deletion reason is required' },
          { status: 400 }
        );
      }
      
      const partner = await partnerService.deletePartner(
        id, 
        adminContext.walletAddress!, 
        reason
      );
      
      if (!partner) {
        return NextResponse.json(
          { error: 'Partner not found' },
          { status: 404 }
        );
      }
      
      // Log admin action
      await adminService.logAdminAction({
        adminWallet: adminContext.walletAddress!,
        actionType: 'delete_partner',
        targetType: 'partner',
        targetId: partner.id,
        reason,
        metadata: { partnerName: partner.name }
      });
      
      return NextResponse.json({ 
        message: 'Partner deleted successfully',
        partner 
      });
    } catch (error) {
      console.error('Error deleting partner:', error);
      return NextResponse.json(
        { error: 'Failed to delete partner' },
        { status: 500 }
      );
    }
  });
}
