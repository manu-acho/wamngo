import { NextRequest, NextResponse } from 'next/server';
import { adminService } from '@/lib/db/services';
import { withAdminAuth } from '@/lib/auth/admin';

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (req, adminContext) => {
    try {
      const dashboardStats = await adminService.getAdminDashboardStats();
      const recentActions = await adminService.getAdminActions(undefined, 10);
      const allAdmins = await adminService.getAllAdmins();

      return NextResponse.json({
        stats: dashboardStats,
        recentActions,
        admins: allAdmins
      });
    } catch (error) {
      console.error('Error fetching admin dashboard:', error);
      return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
    }
  });
}
