import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sprout, 
  ArrowLeft, 
  Calendar, 
  Target, 
  Users,
  MapPin,
  TrendingUp,
  Brain,
  Eye,
  Smartphone
} from "lucide-react";
import Link from "next/link";

export default function SmartAgricultureProject() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-pink-900 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Link href="/projects">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
          
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center">
                <Sprout className="h-8 w-8 text-white" />
              </div>
              <div>
                <Badge className="mb-2 bg-green-100 text-green-800">Agriculture • Planning Phase</Badge>
                <h1 className="text-4xl md:text-5xl font-bold">Smart Agricultural Advisory Network</h1>
              </div>
            </div>
            
            <p className="text-xl text-purple-100 leading-relaxed">
              AI-powered platform designed to provide instant agricultural advice to smallholder farmers, 
              combining computer vision, weather prediction, and local knowledge to revolutionize farming 
              in underserved communities.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-16 wam-gradient-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="wam-card p-8 mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold wam-text-gradient mb-4">Detailed Information Coming Soon</h2>
            <p className="text-lg text-gray-600 mb-6">
              We're currently developing comprehensive documentation for this project. 
              Check back soon for complete technical specifications, implementation timeline, 
              and partnership details.
            </p>
            <div className="text-sm text-gray-500">
              Expected documentation release: Q1 2026
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Project Goals */}
            <div>
              <h3 className="text-2xl font-bold wam-text-gradient mb-6">Project Goals</h3>
              <div className="space-y-4">
                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Target className="h-6 w-6 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Increase Crop Yields</h4>
                        <p className="text-gray-600">Target 40% improvement in crop yields through AI-driven agricultural advice and predictive analytics.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Users className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Support Smallholder Farmers</h4>
                        <p className="text-gray-600">Planned reach of 100,000 farmers across 10 agricultural regions with accessible technology.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-purple-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Rural Accessibility</h4>
                        <p className="text-gray-600">Focus on underserved agricultural communities with limited access to modern farming techniques.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Technology & Approach */}
            <div>
              <h3 className="text-2xl font-bold wam-text-gradient mb-6">Technology Stack</h3>
              <div className="space-y-4">
                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Eye className="h-6 w-6 text-indigo-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Computer Vision</h4>
                        <p className="text-gray-600">AI-powered crop analysis, disease detection, and soil assessment through smartphone cameras.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <TrendingUp className="h-6 w-6 text-orange-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Predictive Analytics</h4>
                        <p className="text-gray-600">Weather prediction, market forecasting, and optimal planting/harvesting recommendations.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Smartphone className="h-6 w-6 text-teal-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Mobile AI Platform</h4>
                        <p className="text-gray-600">Offline-capable mobile app with IoT sensor integration for real-time monitoring.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="py-16 wam-gradient-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold wam-text-gradient mb-4">Projected Impact</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="wam-card text-center p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">$2.5M</div>
              <p className="text-gray-600">Funding Target</p>
            </div>
            <div className="wam-card text-center p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">100K</div>
              <p className="text-gray-600">Farmers to Reach</p>
            </div>
            <div className="wam-card text-center p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">1.25M</div>
              <p className="text-gray-600">WAM Tokens</p>
            </div>
            <div className="wam-card text-center p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">10</div>
              <p className="text-gray-600">Target Regions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 wam-gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 blur-xl animate-pulse animation-delay-1000"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 text-white">Stay Updated on This Project</h2>
          <p className="text-xl mb-8 text-white/90">
            Get notified when detailed project information becomes available and when our token sale launches.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/token-sale">
              <Button size="lg" className="wam-btn-primary">
                Get Notified
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
