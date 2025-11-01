import { NextRequest, NextResponse } from 'next/server';
import { adminService } from '@/lib/db/services';
import { withAdminAuth } from '@/lib/auth/admin';

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (req, adminContext) => {
    try {
      const { searchParams } = new URL(request.url);
      const adminWallet = searchParams.get('admin');
      const limit = parseInt(searchParams.get('limit') || '50');

      const actions = await adminService.getAdminActions(adminWallet || undefined, limit);
      return NextResponse.json(actions);
    } catch (error) {
      console.error('Error fetching audit log:', error);
      return NextResponse.json({ error: 'Failed to fetch audit log' }, { status: 500 });
    }
  });
}
