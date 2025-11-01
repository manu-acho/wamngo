import { NextRequest, NextResponse } from 'next/server';
import { partnerService } from '@/lib/db/services';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const partner = await partnerService.getPartnerById(id);
    
    if (!partner) {
      return NextResponse.json(
        { error: 'Partner not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ partner });
  } catch (error) {
    console.error('Error fetching partner:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partner' },
      { status: 500 }
    );
  }
}
