import { NextRequest, NextResponse } from 'next/server';
import { tokenService, analyticsService } from '@/lib/db/services';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, amountUsd, amountTokens, tokenPrice, referralCode } = body;

    // Validate required fields
    if (!walletAddress || !amountUsd || !amountTokens || !tokenPrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const purchase = await tokenService.recordTokenPurchase({
      walletAddress,
      amountUsd,
      amountTokens,
      tokenPrice,
      referralCode
    });

    // Record user action
    await analyticsService.recordUserAction({
      walletAddress,
      actionType: 'token_purchase_initiated',
      targetId: purchase.id,
      metadata: { amountUsd, amountTokens, tokenPrice }
    });

    return NextResponse.json(purchase, { status: 201 });
  } catch (error) {
    console.error('Error recording token purchase:', error);
    return NextResponse.json({ error: 'Failed to record purchase' }, { status: 500 });
  }
}
