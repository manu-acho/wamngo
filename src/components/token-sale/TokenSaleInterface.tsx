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

  const WAM_PRICE = 0.05; // $0.05 per WAM token
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Purchase Interface */}
      <div className="lg:col-span-2">
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Wallet className="w-6 h-6" />
              Purchase WAMTokens
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sale Progress</span>
                <span>75% Complete</span>
              </div>
              <Progress value={75} className="h-3" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>$2.1M Raised</span>
                <span>Goal: $3M</span>
              </div>
            </div>

            {/* Connection Status */}
            {!isConnected ? (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <span className="font-medium text-orange-800">Wallet Not Connected</span>
                </div>
                <p className="text-orange-700 text-sm mb-3">
                  Connect your wallet to participate in the token sale
                </p>
                <Button onClick={connectWallet} className="w-full">
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Wallet Connected</span>
                </div>
                <p className="text-green-700 text-sm">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
                {balance && (
                  <p className="text-green-700 text-sm">
                    Balance: {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                  </p>
                )}
              </div>
            )}

            {/* Purchase Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">You Pay (ETH)</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={ethAmount}
                  onChange={(e) => handleEthChange(e.target.value)}
                  step="0.000001"
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
                />
                <p className="text-xs text-gray-500">
                  @ $0.05 per token
                </p>
              </div>
            </div>

            {/* Purchase Button */}
            <Button
              onClick={purchaseTokens}
              className="w-full h-12 text-lg"
              disabled={!ethAmount || !wamAmount}
            >
              {!isConnected ? 'Connect Wallet' : 'Purchase WAM Tokens'}
            </Button>

            {/* Purchase Info */}
            <div className="text-xs text-gray-500 space-y-1">
              <p>• Minimum purchase: 1000 WAM tokens</p>
              <p>• Maximum purchase: 100,000 WAM tokens per transaction</p>
              <p>• Tokens will be distributed after TGE (Token Generation Event)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sale Information */}
      <div className="space-y-6">
        {/* Current Phase */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Phase</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="mb-4">
              <Clock className="w-4 h-4 mr-1" />
              Public Sale
            </Badge>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Price</span>
                <span className="font-semibold">$0.05</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Tokens Available</span>
                <span className="font-semibold">12.5M WAM</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Hard Cap</span>
                <span className="font-semibold">$3M</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Time Remaining</span>
                <span className="font-semibold text-orange-600">14 days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Token Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Governance voting rights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Staking rewards up to 12% APY</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Priority access to funded projects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Exclusive community features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Early access to new features</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">🔒</span>
                <span>Smart contract audited by CertiK</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">🔒</span>
                <span>Multi-signature treasury</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">🔒</span>
                <span>Transparent fund allocation</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
