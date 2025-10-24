import { Layout } from "@/components/layout/layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-8">
            This Privacy Policy describes how WAM (Women Against Mutilations) collects, uses, and protects your information when you visit our website.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect information you provide directly to us, such as when you contact us through our contact form, subscribe to our newsletter, or make a donation.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We may use the information we collect to:
          </p>
          <ul>
            <li>Respond to your inquiries and provide customer service</li>
            <li>Send you updates about our work and impact</li>
            <li>Process donations and provide tax receipts</li>
            <li>Improve our website and services</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this policy or with your consent.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>5. Cookies</h2>
          <p>
            Our website may use cookies to enhance user experience. You can choose to accept or decline cookies through your browser settings.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at info@ngowam.org.
          </p>
        </div>
      </div>
    </Layout>
  );
}
