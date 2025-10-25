"use client";

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { createConfig, WagmiProvider, http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, sepolia, base, baseSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

// Configure chains
const chains = [mainnet, polygon, optimism, arbitrum, base, sepolia, baseSepolia] as const;

// Configure wallets
const { connectors } = getDefaultWallets({
  appName: 'WAM - Women Against Mutilations',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo',
});

// Create wagmi config
const wagmiConfig = createConfig({
  chains,
  connectors,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(), 
    [arbitrum.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
});

// Create QueryClient outside component to prevent hydration issues
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Disable automatic refetching during SSR
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

interface Web3ProviderProps {
  children: React.ReactNode;
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering Web3 components on server
  if (!mounted) {
    return <div>{children}</div>;
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          initialChain={mainnet}
          showRecentTransactions={true}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
