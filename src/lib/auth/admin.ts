import { NextRequest, NextResponse } from 'next/server';
import { adminService } from '@/lib/db/services';

export interface AdminContext {
  isAdmin: boolean;
  walletAddress?: string;
  role?: string;
  permissions?: any;
}

export async function withAdminAuth(
  request: NextRequest,
  handler: (request: NextRequest, adminContext: AdminContext) => Promise<NextResponse>
) {
  try {
    // Get wallet address from headers or request body
    const walletAddress = request.headers.get('x-wallet-address') || 
                         request.headers.get('authorization')?.replace('Bearer ', '');

    if (!walletAddress) {
      return NextResponse.json({ error: 'Wallet address required' }, { status: 401 });
    }

    // Check if user is admin
    const adminRole = await adminService.getAdminRole(walletAddress);
    
    if (!adminRole) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const adminContext: AdminContext = {
      isAdmin: true,
      walletAddress,
      role: adminRole.role,
      permissions: adminRole.permissions
    };

    return await handler(request, adminContext);
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export async function requirePermission(permission: string) {
  return async (
    request: NextRequest,
    handler: (request: NextRequest, adminContext: AdminContext) => Promise<NextResponse>
  ) => {
    return withAdminAuth(request, async (req, adminContext) => {
      if (!adminContext.walletAddress) {
        return NextResponse.json({ error: 'Wallet address required' }, { status: 401 });
      }

      const hasPermission = await adminService.hasPermission(adminContext.walletAddress, permission);
      
      if (!hasPermission) {
        return NextResponse.json({ 
          error: `Permission '${permission}' required` 
        }, { status: 403 });
      }

      return await handler(req, adminContext);
    });
  };
}

export function extractWalletFromRequest(request: NextRequest): string | null {
  // Try multiple sources for wallet address
  const authHeader = request.headers.get('authorization');
  const walletHeader = request.headers.get('x-wallet-address');
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.replace('Bearer ', '');
  }
  
  return walletHeader;
}
