import { Metadata } from 'next';
import { Layout } from '@/components/layout/layout';
import { Web3Provider } from '@/components/web3/Web3Provider';
import { Button } from '@/components/ui/button';
import TokenSaleWrapper from '@/components/token-sale/TokenSaleWrapper';
import TokenomicsChart from '@/components/token-sale/TokenomicsChart';
import RoadmapSection from '@/components/token-sale/RoadmapSection';
import FAQSection from '@/components/token-sale/FAQSection';

export const metadata: Metadata = {
  title: 'WAMToken Sale | Women Against Mutilations',
  description: 'Join the WAM ecosystem through our token sale. Empower change, drive innovation, and participate in decentralized funding for women\'s rights projects.',
};

// Disable static generation for this page since it uses Web3 hooks
export const dynamic = 'force-dynamic';

export default function TokenSalePage() {
  return (
    <Layout>
      <Web3Provider>
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-teal-50">
      {/* Hero Section */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-white/80 via-purple-50/50 to-pink-50/80 backdrop-blur-sm">
        {/* Floating background elements - adjusted for mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-32 sm:w-64 h-32 sm:h-64 rounded-full bg-gradient-to-r from-pink-400/20 to-purple-400/20 blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-10 sm:-right-20 w-40 sm:w-80 h-40 sm:h-80 rounded-full bg-gradient-to-r from-teal-400/20 to-blue-400/20 blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute -bottom-10 sm:-bottom-20 left-1/3 w-36 sm:w-72 h-36 sm:h-72 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-6 sm:mb-8 inline-flex items-center px-3 sm:px-4 py-2 rounded-full wam-card border-pink-200 text-sm sm:text-base">
            <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></span>
            Token Sale Coming Soon
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 wam-text-gradient leading-tight">
            WAMToken (WAM)
          </h1>
          
          {/* Decorative horizontal bar */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-transparent to-pink-400"></div>
            <div className="mx-3 sm:mx-4 w-2 h-2 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full animate-pulse"></div>
            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400"></div>
            <div className="mx-2 sm:mx-3 w-1.5 h-1.5 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full"></div>
            <div className="w-8 sm:w-12 h-0.5 bg-gradient-to-r from-purple-400 to-teal-400"></div>
            <div className="mx-3 sm:mx-4 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse animation-delay-1000"></div>
            <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-teal-400 to-transparent"></div>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Accelerate women's digital inclusion and economic empowerment through innovative blockchain governance. WAMToken unlocks community-driven funding for transformative AI and technology projects, targeting $12M to scale solutions that create lasting impact for women worldwide.
          </p>
          
          {/* Visual separator before stats */}
          <div className="flex items-center justify-center mb-8 sm:mb-12">
            <div className="w-6 h-px bg-gradient-to-r from-transparent to-purple-300"></div>
            <div className="mx-2 w-1 h-1 bg-purple-400 rounded-full"></div>
            <div className="w-16 h-px bg-gradient-to-r from-purple-300 via-pink-300 to-teal-300"></div>
            <div className="mx-2 w-1 h-1 bg-teal-400 rounded-full"></div>
            <div className="w-6 h-px bg-gradient-to-r from-teal-300 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="wam-card p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold wam-text-gradient mb-2">$0.10</div>
              <div className="text-gray-600 text-sm sm:text-base">Token Price</div>
              <div className="text-xs sm:text-sm text-purple-600 mt-1">Current offering price</div>
            </div>
            
            <div className="wam-card p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-bold wam-text-gradient mb-2">1B</div>
              <div className="text-gray-600 text-sm sm:text-base">Total Supply</div>
              <div className="text-xs sm:text-sm text-pink-600 mt-1">Fixed supply cap</div>
            </div>
            
            <div className="wam-card p-4 sm:p-6 sm:col-span-2 md:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold wam-text-gradient mb-2">$12M</div>
              <div className="text-gray-600 text-sm sm:text-base">Funding Goal</div>
              <div className="text-xs sm:text-sm text-teal-600 mt-1">Current phase target</div>
            </div>
          </div>
          
          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a 
              href="#tokenomics" 
              className="inline-flex items-center justify-center h-11 px-8 border-2 border-purple-300 bg-white/70 text-purple-700 hover:bg-purple-50 transition-all duration-200 rounded-md font-medium"
            >
              <span className="mr-2">📊</span>
              View Tokenomics
            </a>
          </div>
        </div>
      </section>

      {/* Token Sale Interface */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <TokenSaleWrapper />
        </div>
      </section>

      {/* Tokenomics */}
      <section id="tokenomics" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold wam-text-gradient mb-4">Tokenomics</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              WAMToken is designed for sustainable growth and community governance, with allocations that prioritize project funding and ecosystem development.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <TokenomicsChart />
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 wam-gradient-surface">
        <div className="max-w-7xl mx-auto">
          <RoadmapSection />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FAQSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 wam-gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 sm:w-32 h-16 sm:h-32 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-20 sm:w-40 h-20 sm:h-40 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 blur-xl animate-pulse animation-delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Join Our Mission?</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 opacity-90 px-2">
            Be part of building the future of decentralized funding for women's rights projects worldwide. Get notified when our token sale launches.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <button className="wam-btn-primary px-6 sm:px-8 py-3 text-sm sm:text-base">
              Get Notified
            </button>
            <button className="bg-white/10 border-2 border-white/30 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors text-sm sm:text-base">
              Read Whitepaper
            </button>
          </div>
        </div>
      </section>
    </div>
      </Web3Provider>
    </Layout>
  );
}
