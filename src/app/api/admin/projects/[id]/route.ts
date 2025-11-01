import { NextRequest, NextResponse } from 'next/server';
import { adminService } from '@/lib/db/services';
import { withAdminAuth } from '@/lib/auth/admin';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withAdminAuth(request, async (req, adminContext) => {
    try {
      const { id } = await params;
      const body = await request.json();
      const { title, description, shortDescription, category, status, fundingGoal, imageUrl } = body;

      if (!adminContext.walletAddress) {
        return NextResponse.json({ error: 'Admin wallet required' }, { status: 400 });
      }

      const project = await adminService.updateProject(
        id,
        { title, description, shortDescription, category, status, fundingGoal, imageUrl },
        adminContext.walletAddress
      );

      return NextResponse.json(project);
    } catch (error) {
      console.error('Error updating project:', error);
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
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

      const project = await adminService.deleteProject(
        id,
        adminContext.walletAddress,
        reason
      );

      return NextResponse.json({ message: 'Project deleted', project });
    } catch (error) {
      console.error('Error deleting project:', error);
      return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
  });
}
