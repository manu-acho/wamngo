import { NextRequest, NextResponse } from 'next/server';
import { partnerService } from '@/lib/db/services';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    let partners;
    if (type) {
      partners = await partnerService.getPartnersByType(type);
    } else {
      partners = await partnerService.getAllPartners();
    }
    
    return NextResponse.json({ partners });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json(
      { error: 'Failed to fetch partners' },
      { status: 500 }
    );
  }
}
