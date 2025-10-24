import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  ArrowLeft, 
  Calendar, 
  Target, 
  Users,
  MapPin,
  Languages,
  Brain,
  BookOpen,
  Smartphone
} from "lucide-react";
import Link from "next/link";

export default function DigitalInclusionProject() {
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
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <div>
                <Badge className="mb-2 bg-blue-100 text-blue-800">Education • Planning Phase</Badge>
                <h1 className="text-4xl md:text-5xl font-bold">Digital Inclusion AI Platform</h1>
              </div>
            </div>
            
            <p className="text-xl text-purple-100 leading-relaxed">
              Multilingual AI platform planned to bridge the digital divide through culturally-aware services 
              in health, education, and economic empowerment, making technology accessible to underserved 
              communities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="py-16 wam-gradient-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="wam-card p-8 mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold wam-text-gradient mb-4">Comprehensive Details Coming Soon</h2>
            <p className="text-lg text-gray-600 mb-6">
              We're developing detailed technical documentation, partnership agreements, and implementation 
              strategies for this ambitious digital inclusion initiative. Full project details will be 
              available soon.
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
            {/* Project Vision */}
            <div>
              <h3 className="text-2xl font-bold wam-text-gradient mb-6">Project Vision</h3>
              <div className="space-y-4">
                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Globe className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Bridge Digital Divide</h4>
                        <p className="text-gray-600">Goal to bridge digital divide for 5M+ underserved users across 15 countries worldwide.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Languages className="h-6 w-6 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Multilingual AI</h4>
                        <p className="text-gray-600">Culturally-aware AI services that speak local languages and understand regional contexts.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Users className="h-6 w-6 text-purple-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Empowerment Focus</h4>
                        <p className="text-gray-600">Integrated health, education, and economic empowerment services for comprehensive development.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Technology & Innovation */}
            <div>
              <h3 className="text-2xl font-bold wam-text-gradient mb-6">Technology Innovation</h3>
              <div className="space-y-4">
                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Brain className="h-6 w-6 text-indigo-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Natural Language Processing</h4>
                        <p className="text-gray-600">Advanced NLP for multiple languages and dialects, enabling natural communication.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Smartphone className="h-6 w-6 text-teal-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Federated Learning</h4>
                        <p className="text-gray-600">Privacy-preserving AI that learns locally while maintaining data sovereignty.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <BookOpen className="h-6 w-6 text-orange-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Edge AI & Blockchain</h4>
                        <p className="text-gray-600">Offline-capable AI with blockchain verification for trust and accessibility.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Focus Areas */}
      <section className="py-16 wam-gradient-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold wam-text-gradient mb-4">Key Focus Areas</h3>
            <p className="text-lg text-gray-600">Three core pillars of digital empowerment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="wam-card text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold wam-text-gradient mb-3">Health Services</h4>
              <p className="text-gray-600">AI-powered health guidance, telemedicine access, and preventive care information in local languages.</p>
            </Card>

            <Card className="wam-card text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold wam-text-gradient mb-3">Education Platform</h4>
              <p className="text-gray-600">Digital literacy, skill development, and educational resources adapted to cultural contexts.</p>
            </Card>

            <Card className="wam-card text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-xl font-bold wam-text-gradient mb-3">Economic Empowerment</h4>
              <p className="text-gray-600">Financial literacy, microfinance access, and entrepreneurship support through digital channels.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold wam-text-gradient mb-4">Projected Impact</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="wam-card text-center p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">$1.8M</div>
              <p className="text-gray-600">Funding Target</p>
            </div>
            <div className="wam-card text-center p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">5M+</div>
              <p className="text-gray-600">Users to Reach</p>
            </div>
            <div className="wam-card text-center p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">900K</div>
              <p className="text-gray-600">WAM Tokens</p>
            </div>
            <div className="wam-card text-center p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">15</div>
              <p className="text-gray-600">Countries Planned</p>
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
          <h2 className="text-3xl font-bold mb-6 text-white">Join the Digital Inclusion Movement</h2>
          <p className="text-xl mb-8 text-white/90">
            Be part of bridging the digital divide. Get updates on this project and join our mission 
            to make technology accessible to everyone.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/token-sale">
              <Button size="lg" className="wam-btn-primary">
                Get Project Updates
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
