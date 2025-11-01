import { NextRequest, NextResponse } from 'next/server';
import { partnerService, adminService } from '@/lib/db/services';
import { withAdminAuth } from '@/lib/auth/admin';

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (request, adminContext) => {
    try {
      const partners = await partnerService.getAllPartners();
      const stats = await partnerService.getPartnerStats();
      
      return NextResponse.json({ partners, stats });
    } catch (error) {
      console.error('Error fetching admin partners:', error);
      return NextResponse.json(
        { error: 'Failed to fetch partners' },
        { status: 500 }
      );
    }
  });
}

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (request, adminContext) => {
    try {
      const data = await request.json();
      
      const partner = await partnerService.createPartner(data);
      
      // Log admin action
      await adminService.logAdminAction({
        adminWallet: adminContext.walletAddress!,
        actionType: 'create_partner',
        targetType: 'partner',
        targetId: partner.id,
        metadata: { partnerName: partner.name }
      });
      
      return NextResponse.json({ 
        message: 'Partner created successfully',
        partner 
      });
    } catch (error) {
      console.error('Error creating partner:', error);
      return NextResponse.json(
        { error: 'Failed to create partner' },
        { status: 500 }
      );
    }
  });
}
