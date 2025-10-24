"use client";

import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

export function useWeb3() {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { openConnectModal } = useConnectModal();
  
  const { data: balance, isLoading: balanceLoading } = useBalance({
    address: address,
  });

  const connectWallet = () => {
    if (openConnectModal) {
      openConnectModal();
    }
  };

  const disconnectWallet = () => {
    disconnect();
  };

  return {
    address,
    isConnected,
    isConnecting,
    balance,
    balanceLoading,
    connectWallet,
    disconnectWallet,
    error,
    isLoading: isPending,
  };
}
