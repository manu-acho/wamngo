"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Wallet, Shield, Clock, TrendingUp } from 'lucide-react';
import { useWeb3 } from '@/hooks/useWeb3';

export default function TokenSaleInterface() {
  const [ethAmount, setEthAmount] = useState('');
  const [wamAmount, setWamAmount] = useState('');
  const { address, isConnected, connectWallet, balance } = useWeb3();

  const WAM_PRICE = 0.10; // $0.10 per WAM token
  const ETH_PRICE = 2300; // Mock ETH price

  const handleEthChange = (value: string) => {
    setEthAmount(value);
    const eth = parseFloat(value) || 0;
    const usdValue = eth * ETH_PRICE;
    const wamTokens = usdValue / WAM_PRICE;
    setWamAmount(wamTokens.toFixed(0));
  };

  const handleWamChange = (value: string) => {
    setWamAmount(value);
    const wam = parseFloat(value) || 0;
    const usdValue = wam * WAM_PRICE;
    const ethNeeded = usdValue / ETH_PRICE;
    setEthAmount(ethNeeded.toFixed(6));
  };

  const purchaseTokens = () => {
    if (!isConnected) {
      connectWallet();
      return;
    }
    
    // Here you would integrate with smart contract
    console.log('Purchasing tokens...', { ethAmount, wamAmount });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
      {/* Main Purchase Interface */}
      <div className="lg:col-span-3">
        <Card className="p-4 sm:p-6 h-fit sticky top-24">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
              <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />
              Purchase WAMTokens
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4 sm:space-y-6 px-0">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sale Progress</span>
                <span>0% Complete</span>
              </div>
              <Progress value={0} className="h-2 sm:h-3" key="progress-bar-0" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>$0 Raised</span>
                <span>Goal: $12M</span>
              </div>
            </div>

            {/* Connection Status */}
            {!isConnected ? (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                  <span className="font-medium text-orange-800 text-sm sm:text-base">Wallet Not Connected</span>
                </div>
                <p className="text-orange-700 text-xs sm:text-sm mb-3">
                  Connect your wallet to participate in the token sale
                </p>
                <Button onClick={connectWallet} className="w-full text-sm sm:text-base">
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <span className="font-medium text-green-800 text-sm sm:text-base">Wallet Connected</span>
                </div>
                <p className="text-green-700 text-xs sm:text-sm">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
                {balance && (
                  <p className="text-green-700 text-xs sm:text-sm">
                    Balance: {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                  </p>
                )}
              </div>
            )}

            {/* Purchase Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">You Pay (ETH)</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={ethAmount}
                  onChange={(e) => handleEthChange(e.target.value)}
                  step="0.000001"
                  className="text-sm sm:text-base"
                />
                <p className="text-xs text-gray-500">
                  ≈ ${(parseFloat(ethAmount) * ETH_PRICE).toFixed(2)} USD
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">You Receive (WAM)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={wamAmount}
                  onChange={(e) => handleWamChange(e.target.value)}
                  className="text-sm sm:text-base"
                />
                <p className="text-xs text-gray-500">
                  @ $0.10 per token
                </p>
              </div>
            </div>

            {/* Purchase Button */}
            <Button
              onClick={purchaseTokens}
              className="w-full h-10 sm:h-12 text-sm sm:text-lg"
              disabled={!ethAmount || !wamAmount}
            >
              {!isConnected ? 'Connect Wallet' : 'Purchase WAM Tokens'}
            </Button>

            {/* Purchase Info */}
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Minimum purchase: 100 WAM tokens ($10)</p>
              <p>• Maximum purchase: 100,000 WAM tokens per transaction</p>
              <p>• Tokens will be distributed after TGE (Token Generation Event)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sale Information Sidebar */}
      <div className="lg:col-span-2 space-y-6">
        {/* Current Phase */}
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Current Phase
              </CardTitle>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 px-3 py-1">
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-white/60 rounded-lg">
                <div className="text-lg font-bold text-purple-600">$0.10</div>
                <div className="text-xs text-gray-600">Token Price</div>
              </div>
              <div className="text-center p-3 bg-white/60 rounded-lg">
                <div className="text-lg font-bold text-purple-600">1B</div>
                <div className="text-xs text-gray-600">Total Supply</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Funding Goal</span>
                <span className="font-semibold">$12M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Launch Timeline</span>
                <span className="font-semibold text-purple-600">Q1 2026</span>
              </div>
            </div>

            {/* Security Info */}
            <div className="pt-3 border-t border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Secure & Transparent</span>
              </div>
              <div className="grid grid-cols-1 gap-1 text-xs text-purple-700">
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">🔒</span>
                  <span>Multi-signature treasury</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">🔒</span>
                  <span>NGO-compliant allocation</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Community Benefits
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                <span className="text-green-500 text-sm">✓</span>
                <span className="text-sm">Governance voting rights</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                <span className="text-purple-500 text-sm">✓</span>
                <span className="text-sm">Educational programs access</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                <span className="text-blue-500 text-sm">✓</span>
                <span className="text-sm">Bootcamp & scholarship opportunities</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/60 rounded">
                <span className="text-teal-500 text-sm">✓</span>
                <span className="text-sm">Volunteer & mentorship programs</span>
              </div>
            </div>

            {/* Mission statement */}
            <div className="pt-3 border-t border-green-200 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-2 bg-green-100 rounded-full">
                <span className="text-green-600">💚</span>
                <span className="text-sm font-medium text-green-800">Empowering Women's Rights</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
