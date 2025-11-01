import { NextRequest, NextResponse } from 'next/server';
import { partnerService } from '@/lib/db/services';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'organizationName', 
      'contactName', 
      'contactEmail', 
      'organizationType',
      'description',
      'capabilities',
      'motivation'
    ];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.contactEmail)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }
    
    const application = await partnerService.submitPartnerApplication(data);
    
    return NextResponse.json({ 
      message: 'Partner application submitted successfully',
      application 
    });
  } catch (error) {
    console.error('Error submitting partner application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
