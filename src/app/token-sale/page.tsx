import { Metadata } from 'next';
import { Layout } from '@/components/layout/layout';
import { Web3Provider } from '@/components/web3/Web3Provider';
import TokenSaleInterface from '@/components/token-sale/TokenSaleInterface';
import TokenomicsChart from '@/components/token-sale/TokenomicsChart';
import RoadmapSection from '@/components/token-sale/RoadmapSection';
import FAQSection from '@/components/token-sale/FAQSection';

export const metadata: Metadata = {
  title: 'WAMToken Sale | Women Against Mutilations',
  description: 'Join the WAM ecosystem through our token sale. Empower change, drive innovation, and participate in decentralized funding for women\'s rights projects.',
};

export default function TokenSalePage() {
  return (
    <Layout>
      <Web3Provider>
    <div className="min-h-screen wam-gradient-surface">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-pink-400/20 to-purple-400/20 blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-teal-400/20 to-blue-400/20 blur-3xl animate-pulse animation-delay-1000"></div>
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl animate-pulse animation-delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-8 inline-flex items-center px-4 py-2 rounded-full wam-card border-pink-200">
            <span className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></span>
            Token Sale Coming Soon
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 wam-text-gradient">
            WAMToken (WAM)
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Empower women's rights through blockchain technology. WAMToken will enable decentralized funding for projects that combat violence against women and promote gender equality worldwide.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="wam-card p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">$0.05</div>
              <div className="text-gray-600">Target Price</div>
              <div className="text-sm text-purple-600 mt-1">Initial offering goal</div>
            </div>
            
            <div className="wam-card p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">100M</div>
              <div className="text-gray-600">Total Supply</div>
              <div className="text-sm text-pink-600 mt-1">Fixed supply planned</div>
            </div>
            
            <div className="wam-card p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">$3M</div>
              <div className="text-gray-600">Funding Goal</div>
              <div className="text-sm text-teal-600 mt-1">Target for projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* Token Sale Interface */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <TokenSaleInterface />
        </div>
      </section>

      {/* Tokenomics */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold wam-text-gradient mb-4">Tokenomics</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              WAMToken is designed for sustainable growth and community governance, with allocations that prioritize project funding and ecosystem development.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <TokenomicsChart />
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-16 px-4 wam-gradient-surface">
        <div className="max-w-7xl mx-auto">
          <RoadmapSection />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <FAQSection />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 wam-gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 blur-xl animate-pulse animation-delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Our Mission?</h2>
          <p className="text-xl mb-8 opacity-90">
            Be part of building the future of decentralized funding for women's rights projects worldwide. Get notified when our token sale launches.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="wam-btn-primary px-8 py-3">
              Get Notified
            </button>
            <button className="bg-white/10 border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors">
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
