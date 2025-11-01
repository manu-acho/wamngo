import { NextRequest, NextResponse } from 'next/server';
import { adminService } from '@/lib/db/services';
import { withAdminAuth } from '@/lib/auth/admin';

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (req, adminContext) => {
    try {
      const body = await request.json();
      const { walletAddress, role, permissions } = body;

      if (!adminContext.walletAddress) {
        return NextResponse.json({ error: 'Admin wallet required' }, { status: 400 });
      }

      // Only super admins can grant roles
      if (adminContext.role !== 'super_admin') {
        return NextResponse.json({ error: 'Super admin access required' }, { status: 403 });
      }

      const adminRole = await adminService.createAdminRole({
        walletAddress,
        role,
        permissions,
        grantedBy: adminContext.walletAddress
      });

      return NextResponse.json(adminRole, { status: 201 });
    } catch (error) {
      console.error('Error creating admin role:', error);
      return NextResponse.json({ error: 'Failed to create admin role' }, { status: 500 });
    }
  });
}

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (req, adminContext) => {
    try {
      const admins = await adminService.getAllAdmins();
      return NextResponse.json(admins);
    } catch (error) {
      console.error('Error fetching admins:', error);
      return NextResponse.json({ error: 'Failed to fetch admins' }, { status: 500 });
    }
  });
}
