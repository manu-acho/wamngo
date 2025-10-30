import { Metadata } from 'next';
import { Layout } from '@/components/layout/layout';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';

export const metadata: Metadata = {
  title: 'Platform Analytics | WAM - Women Against Mutilations',
  description: 'Real-time platform analytics showing user engagement, governance activity, and token metrics.',
};

// Disable static generation for real-time analytics
export const dynamic = 'force-dynamic';

export default function AnalyticsPage() {
  return (
    <Layout>
      <div className="min-h-screen wam-gradient-surface">
        {/* Header */}
        <section className="pt-24 pb-8 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold wam-text-gradient mb-4">
                Platform Analytics
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real-time insights into platform activity, user engagement, and governance participation.
              </p>
            </div>
          </div>
        </section>

        {/* Analytics Dashboard */}
        <section className="pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <AnalyticsDashboard />
          </div>
        </section>

        {/* Database Integration Info */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold wam-text-gradient mb-6">
              Powered by Advanced Database Integration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold text-lg mb-2">Real-time Tracking</h3>
                <p className="text-gray-600 text-sm">
                  Every user action, vote, and transaction is recorded in real-time with comprehensive metadata.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold text-lg mb-2">Governance Insights</h3>
                <p className="text-gray-600 text-sm">
                  Detailed proposal tracking, voting patterns, and community engagement metrics.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="font-semibold text-lg mb-2">Token Economics</h3>
                <p className="text-gray-600 text-sm">
                  Complete token purchase history, staking positions, and reward distribution tracking.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
