import { Metadata } from 'next';
import { Layout } from '@/components/layout/layout';
import { Web3Provider } from '@/components/web3/Web3Provider';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard | WAM - Women Against Mutilations',
  description: 'Administrative dashboard for managing proposals, projects, and platform operations.',
};

export default function AdminPage() {
  return (
    <Layout>
      <Web3Provider>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
          <div className="container mx-auto px-4 py-8">
            <AdminDashboard />
          </div>
        </div>
      </Web3Provider>
    </Layout>
  );
}
