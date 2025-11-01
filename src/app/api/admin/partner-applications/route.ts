import { NextRequest, NextResponse } from 'next/server';
import { partnerService, adminService } from '@/lib/db/services';
import { withAdminAuth } from '@/lib/auth/admin';

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (request, adminContext) => {
    try {
      const { searchParams } = new URL(request.url);
      const status = searchParams.get('status');
      
      const applications = await partnerService.getAllPartnerApplications(status || undefined);
      
      return NextResponse.json({ applications });
    } catch (error) {
      console.error('Error fetching partner applications:', error);
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      );
    }
  });
}
