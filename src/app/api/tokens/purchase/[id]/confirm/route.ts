import { NextRequest, NextResponse } from 'next/server';
import { tokenService, analyticsService } from '@/lib/db/services';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { txHash } = body;

    if (!txHash) {
      return NextResponse.json({ error: 'Missing transaction hash' }, { status: 400 });
    }

    const purchase = await tokenService.confirmTokenPurchase(id, txHash);

    if (!purchase) {
      return NextResponse.json({ error: 'Purchase not found' }, { status: 404 });
    }

    // Record confirmation action
    await analyticsService.recordUserAction({
      walletAddress: purchase.walletAddress,
      actionType: 'token_purchase_confirmed',
      targetId: purchase.id,
      metadata: { txHash, amountTokens: purchase.amountTokens }
    });

    return NextResponse.json(purchase);
  } catch (error) {
    console.error('Error confirming token purchase:', error);
    return NextResponse.json({ error: 'Failed to confirm purchase' }, { status: 500 });
  }
}
