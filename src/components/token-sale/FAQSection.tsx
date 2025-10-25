"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqData = [
  {
    question: "What is WAMToken and how does it work?",
    answer: "WAMToken (WAM) is a utility token that powers our decentralized platform for funding women's rights projects. Token holders can vote on project proposals, stake tokens for rewards, and participate in governance decisions that shape the future of the platform."
  },
  {
    question: "How can I purchase WAM tokens?",
    answer: "You can purchase WAM tokens during our public sale by connecting your Web3 wallet (MetaMask, WalletConnect, etc.) and exchanging ETH for WAM tokens. The current price is $0.10 per token with a minimum purchase of 100 WAM tokens ($10 minimum)."
  },
  {
    question: "What are the benefits of holding WAM tokens?",
    answer: "WAM token holders enjoy governance voting rights, staking rewards up to 12% APY, priority access to funded projects, exclusive community features, and early access to new platform developments."
  },
  {
    question: "When will tokens be distributed?",
    answer: "Tokens will be distributed after the Token Generation Event (TGE), which is scheduled for Q2 2026. All purchasers will receive their tokens directly to their connected wallet addresses."
  },
  {
    question: "What blockchains does WAM support?",
    answer: "WAM tokens will be deployed on Base network, Coinbase's Layer 2 solution built on Optimism. This ensures low transaction fees, fast processing, and seamless integration with the broader Ethereum ecosystem while maintaining security and decentralization."
  },
  {
    question: "How does the governance system work?",
    answer: "WAM token holders can submit project proposals and vote on funding decisions. The voting power is proportional to the number of tokens held, ensuring that major stakeholders have appropriate influence while maintaining democratic participation."
  },
  {
    question: "What happens to the funds raised?",
    answer: "Funds are transparently allocated as follows: 52% directly funds women's rights projects, 20% for public sale, 15% for community rewards and education, 10% for operations & development, and 3% for emergency reserves. No team allocation ensures all funds serve our humanitarian mission."
  },
  {
    question: "Is the smart contract audited?",
    answer: "Our smart contracts will undergo comprehensive security audits by reputable blockchain security firms before deployment. The audit reports will be published before the TGE, and we maintain a multi-signature treasury for additional security."
  },
  {
    question: "Can I stake my WAM tokens?",
    answer: "Yes, WAM tokens can be staked to earn rewards up to 12% APY. Staking also increases your voting power in governance decisions and provides additional benefits within the ecosystem."
  },
  {
    question: "What if I need help with my purchase?",
    answer: "Our support team is available 24/7 through our Discord community and support portal. We also provide comprehensive guides for first-time Web3 users to help with wallet setup and token purchases."
  }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Get answers to common questions about WAM tokens, the purchase process, and our platform.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </div>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4 bg-gray-50">
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6">
            Join our community or reach out to our support team for personalized assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Join Discord Community
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
