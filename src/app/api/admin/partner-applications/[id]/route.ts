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
      const { status, reviewNotes } = await request.json();
      
      if (!status || !['approved', 'rejected'].includes(status)) {
        return NextResponse.json(
          { error: 'Valid status (approved/rejected) is required' },
          { status: 400 }
        );
      }
      
      const application = await partnerService.reviewPartnerApplication(
        id,
        status,
        adminContext.walletAddress!,
        reviewNotes
      );
      
      if (!application) {
        return NextResponse.json(
          { error: 'Application not found' },
          { status: 404 }
        );
      }
      
      // If approved, create the partner
      if (status === 'approved') {
        const partner = await partnerService.createPartner({
          name: application.organizationName,
          description: application.description,
          shortDescription: application.description.substring(0, 500),
          capabilities: application.capabilities,
          partnerType: application.organizationType as any,
          location: application.location,
          establishedYear: application.establishedYear,
          teamSize: application.teamSize,
          websiteUrl: application.websiteUrl,
          contactEmail: application.contactEmail,
          specialization: [],
          achievements: [],
          projects: []
        });
        
        // Log partner creation
        await adminService.logAdminAction({
          adminWallet: adminContext.walletAddress!,
          actionType: 'approve_partner_application',
          targetType: 'partner',
          targetId: partner.id,
          metadata: { 
            applicationId: application.id,
            partnerName: partner.name 
          }
        });
      }
      
      // Log application review
      await adminService.logAdminAction({
        adminWallet: adminContext.walletAddress!,
        actionType: 'review_partner_application',
        targetType: 'application',
        targetId: application.id,
        metadata: { 
          status,
          organizationName: application.organizationName 
        }
      });
      
      return NextResponse.json({ 
        message: `Application ${status} successfully`,
        application 
      });
    } catch (error) {
      console.error('Error reviewing partner application:', error);
      return NextResponse.json(
        { error: 'Failed to review application' },
        { status: 500 }
      );
    }
  });
}
