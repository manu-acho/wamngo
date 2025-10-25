import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  ArrowLeft, 
  Calendar, 
  Target, 
  Users,
  MapPin,
  Stethoscope,
  Brain,
  Shield,
  Zap,
  Award,
  Activity
} from "lucide-react";
import Link from "next/link";

export default function ReconstructionTechnologyProject() {
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
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <Badge className="mb-2 bg-red-100 text-red-800">Health • Pilot Phase</Badge>
                <h1 className="text-4xl md:text-5xl font-bold">Advanced Reconstruction Technology</h1>
              </div>
            </div>
            
            <p className="text-xl text-purple-100 leading-relaxed">
              Advanced radio frequency technology for FGM survivor reconstruction. Our pilot program 
              shows promising initial results and we're now seeking scale-up funding to reach 
              thousands of survivors worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Project Status Notice */}
      <section className="py-8 bg-blue-50 border-l-4 border-blue-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-blue-800">Project Status: Scale-up Awaiting DAO Approval</h3>
              <p className="text-blue-700">
                While our pilot program has shown promising results with initial funding, the full-scale expansion 
                to 20 centers and 10,000 treatments requires community approval through our DAO governance system. 
                Scale-up funding has not been raised yet through WAM tokens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold wam-text-gradient mb-4">Current Pilot Status</h3>
            <p className="text-lg text-gray-600">Real progress in FGM survivor reconstruction</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Pilot Results */}
            <div>
              <h4 className="text-xl font-bold wam-text-gradient mb-6">Pilot Program Achievements</h4>
              <div className="space-y-4">
                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Award className="h-6 w-6 text-green-600 mt-1" />
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Promising Initial Results</h5>
                        <p className="text-gray-600">Early pilot testing shows significant improvement in patient outcomes and quality of life.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Shield className="h-6 w-6 text-blue-600 mt-1" />
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Safety Protocols Established</h5>
                        <p className="text-gray-600">Comprehensive safety and ethical protocols developed with medical ethics boards.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Stethoscope className="h-6 w-6 text-purple-600 mt-1" />
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Medical Partnerships</h5>
                        <p className="text-gray-600">Collaboration established with leading medical universities and specialized clinics.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Technology Approach */}
            <div>
              <h4 className="text-xl font-bold wam-text-gradient mb-6">Technology & Innovation</h4>
              <div className="space-y-4">
                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Zap className="h-6 w-6 text-indigo-600 mt-1" />
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Radio Frequency Technology</h5>
                        <p className="text-gray-600">Advanced RF technology for precision reconstruction with minimal invasive procedures.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Brain className="h-6 w-6 text-teal-600 mt-1" />
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">AI-Assisted Planning</h5>
                        <p className="text-gray-600">Machine learning algorithms to optimize treatment plans and predict outcomes.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="wam-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Activity className="h-6 w-6 text-orange-600 mt-1" />
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Telemedicine Integration</h5>
                        <p className="text-gray-600">Remote consultation and follow-up care through secure blockchain-verified systems.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Status */}
      <section className="py-16 wam-gradient-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold wam-text-gradient mb-4">Funding Status</h3>
            <p className="text-lg text-gray-600">Current pilot funding and scale-up requirements</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="wam-card text-center p-8">
              <div className="text-4xl font-bold wam-text-gradient mb-3">$400K</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Pilot Funding Secured</h4>
              <p className="text-gray-600">Initial funding for pilot program and safety validation completed.</p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full w-1/4"></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">10% of total funding goal</p>
            </Card>

            <Card className="wam-card text-center p-8">
              <div className="text-4xl font-bold wam-text-gradient mb-3">$4M</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Scale-up Target</h4>
              <p className="text-gray-600">Total funding needed for global expansion to 20 treatment centers.</p>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-3 rounded-full w-full"></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Full implementation goal</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold wam-text-gradient mb-4">Scale-up Projections</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="wam-card text-center p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">10K</div>
              <p className="text-gray-600">Survivors to Support</p>
            </div>
            <div className="wam-card text-center p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">20</div>
              <p className="text-gray-600">Treatment Centers</p>
            </div>
            <div className="wam-card text-center p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">40M</div>
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
          <h2 className="text-3xl font-bold mb-6 text-white">Support Life-Changing Technology</h2>
          <p className="text-xl mb-8 text-white/90">
            Help us scale this breakthrough technology to reach thousands of FGM survivors worldwide. 
            Your support makes healing and hope possible.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/token-sale">
              <Button size="lg" className="wam-btn-primary">
                Support This Project
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
