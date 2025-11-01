import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Globe } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-24 pb-16 wam-gradient-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 blur-xl animate-pulse animation-delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 wam-text-gradient">About WAM</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Women Against Mutilations - Pioneering AI and blockchain solutions for women's inclusivity, empowerment, and digital transformation
            </p>
          </div>
        </div>
      </section>

      {/* Words of the Founder */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold wam-text-gradient mb-8 text-center">Words of the Founder</h2>
          
          <div className="wam-card p-8">
            <div className="prose prose-lg mx-auto text-gray-700">
              <p className="text-lg leading-relaxed mb-6">
                <strong>I wish to extend my sincere thanks to those who helped me to create in such a short time Women Against Mutilation (WAM).</strong>
              </p>
              
              <p className="mb-6">
                I have dedicated my career to the crucial question of women's empowerment and inclusive development. Active with several associations and groups, I have always been passionate about creating technology solutions that foster women's inclusivity across all sectors - from healthcare and education to economic participation and leadership opportunities.
              </p>

              <p className="mb-6">
                The challenges facing women today are multifaceted and complex. From limited access to healthcare and education to economic exclusion and social discrimination, women worldwide face barriers that mutilate their opportunities and aspirations. These challenges require innovative, technology-driven solutions that can scale globally.
              </p>

              <p className="mb-6">
                Technology has the power to break down these barriers. Through AI-powered healthcare systems, blockchain-based economic inclusion platforms, and digital education initiatives, we can create pathways for women to overcome the mutilations imposed by traditional limitations.
              </p>

              <p className="mb-6">
                Our approach recognizes that true empowerment comes through providing women with the tools, knowledge, and opportunities they need to transform their lives. Whether it's through access to maternal health AI, agricultural advisory systems, or digital inclusion platforms, technology becomes the great equalizer.
              </p>

              <p className="font-semibold wam-text-gradient">
                WAM aims to establish for women worldwide a revolutionary approach combining human expertise with cutting-edge AI and blockchain technology. Our qualified and passionate collaborators offer customized support through scalable technology solutions. This innovative approach places the most advanced technology fully at the service of women's empowerment and personal integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WAM: NGO for Hope */}
      <section className="py-16 wam-gradient-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold wam-text-gradient mb-4">WAM: Technology for Hope</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to leveraging AI and blockchain technology for global women's empowerment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="wam-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl wam-text-gradient">UN Member</CardTitle>
                <Badge variant="secondary" className="mx-auto bg-purple-100 text-purple-800">Special ECOSOC Status</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  With the special ECOSOC statute, WAM is a full member of UN which allows us to deploy technology solutions globally and create sustainable impact at scale.
                </p>
              </CardContent>
            </Card>

            <Card className="wam-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl wam-text-gradient">Inclusivity</CardTitle>
                <Badge variant="secondary" className="mx-auto bg-pink-100 text-pink-800">Empowerment</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our mission centers on creating inclusive technology solutions that empower women through access, opportunity, and meaningful participation in the digital economy.
                </p>
              </CardContent>
            </Card>

            <Card className="wam-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl wam-text-gradient">AI & Blockchain</CardTitle>
                <Badge variant="secondary" className="mx-auto bg-teal-100 text-teal-800">Technology Innovation</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We're pioneering AI-powered healthcare, blockchain governance, and digital inclusion platforms that scale globally to empower women everywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
