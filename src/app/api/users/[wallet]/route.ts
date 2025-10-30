import { NextRequest, NextResponse } from 'next/server';
import { userService, tokenService, analyticsService } from '@/lib/db/services';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ wallet: string }> }
) {
  try {
    const { wallet } = await params;
    const walletAddress = wallet;

    // Get or create user
    let user = await userService.getUserByWallet(walletAddress);
    if (!user) {
      user = await userService.createUser({ walletAddress });
    }

    // Get user stats
    const stats = await userService.getUserStats(walletAddress);

    // Get recent purchases
    const purchases = await tokenService.getUserPurchases(walletAddress);

    // Get recent actions
    const actions = await analyticsService.getUserActions(walletAddress);

    return NextResponse.json({
      user,
      stats,
      purchases: purchases.slice(0, 10), // Last 10 purchases
      actions: actions.slice(0, 20) // Last 20 actions
    });
  } catch (error) {
    console.error('Error fetching user dashboard:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ wallet: string }> }
) {
  try {
    const { wallet } = await params;
    const body = await request.json();
    const { username, email, bio } = body;

    const user = await userService.updateUser(wallet, {
      username,
      email,
      bio
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
