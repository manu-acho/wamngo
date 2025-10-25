"use client";

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';

export function useWeb3() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Always call wagmi hooks (following Rules of Hooks)
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  
  const { data: balance, isLoading: balanceLoading } = useBalance({
    address: address,
    query: {
      enabled: mounted && !!address, // Only fetch when mounted and address exists
    }
  });

  const connectWallet = () => {
    if (mounted && openConnectModal) {
      openConnectModal();
    }
  };

  const disconnectWallet = () => {
    if (mounted) {
      disconnect();
    }
  };

  // Return safe values during SSR, but still use hook results
  return {
    address: mounted ? address : undefined,
    isConnected: mounted ? isConnected : false,
    isConnecting: mounted ? isConnecting : false,
    balance: mounted ? balance : undefined,
    balanceLoading: mounted ? balanceLoading : false,
    connectWallet,
    disconnectWallet,
    error: mounted ? error : undefined,
    isLoading: mounted ? isPending : false,
  };
}
