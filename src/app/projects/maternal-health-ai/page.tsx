import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Brain, 
  Smartphone, 
  Globe, 
  Users, 
  Target, 
  TrendingUp, 
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowLeft,
  Zap
} from "lucide-react";
import Link from "next/link";

// This would come from database in real implementation
const project = {
  id: 1,
  title: "AI-Powered Maternal Health System",
  slug: "maternal-health-ai",
  description: `A revolutionary voice-first AI system designed to reduce maternal mortality rates by providing real-time health guidance in native languages. The system works offline on edge devices, ensuring access even in remote areas without internet connectivity.

The platform addresses the critical problem of 412 maternal deaths per 100,000 births in underserved regions by providing immediate access to life-saving health information and emergency guidance.`,
  category: "health",
  fundingGoal: 3000000,
  fundingRaised: 750000,
  tokenAllocation: 1500000,
  status: "active",
  startDate: "2025-01-15",
  estimatedCompletion: "2026-12-31",
  impactGoals: {
    primary: "Reduce maternal mortality by 35%",
    users: "500,000 women reached in first 2 years",
    regions: "Deploy across 5 underserved regions",
    languages: "Support for 5+ African languages",
    response_time: "Reduce emergency response time to under 2 minutes"
  },
  technologyStack: [
    { name: "AI/ML", description: "Quantized Language Models (Gemma 3 architecture)" },
    { name: "Edge Computing", description: "Offline deployment on smartphones and feature phones" },
    { name: "Speech Recognition", description: "ASR fine-tuned for local dialects" },
    { name: "Text-to-Speech", description: "Natural voice synthesis in native languages" },
    { name: "Blockchain", description: "Transparent impact tracking and data integrity" },
    { name: "Mobile Development", description: "Cross-platform app for Android and feature phones" }
  ],
  keyFeatures: [
    "Voice-first interface supporting multiple African languages",
    "Offline capability with quantized AI models",
    "Emergency detection and routing to medical professionals",
    "Cultural sensitivity and local health practices integration",
    "Real-time vital signs monitoring and risk assessment",
    "Community health worker training and support tools"
  ],
  partnerships: [
    { name: "Ministry of Health", role: "Policy integration and content validation" },
    { name: "Local NGOs", role: "Community engagement and deployment" },
    { name: "Regional Universities", role: "Language data and evaluation" },
    { name: "Telecom Partners", role: "Infrastructure and connectivity support" }
  ],
  milestones: [
    {
      title: "AI Model Development",
      description: "Complete development and testing of voice-first AI models",
      targetDate: "2025-06-30",
      status: "in_progress",
      fundingRequired: 800000
    },
    {
      title: "Pilot Deployment",
      description: "Deploy system in 2 pilot regions for testing",
      targetDate: "2025-09-30", 
      status: "pending",
      fundingRequired: 500000
    },
    {
      title: "Full Scale Deployment",
      description: "Roll out across all target regions",
      targetDate: "2026-06-30",
      status: "pending", 
      fundingRequired: 1200000
    },
    {
      title: "Impact Evaluation",
      description: "Comprehensive impact assessment and optimization",
      targetDate: "2026-12-31",
      status: "pending",
      fundingRequired: 500000
    }
  ],
  currentMetrics: [
    { name: "Women Reached", current: 25000, target: 500000, unit: "users" },
    { name: "Emergency Response Time", current: 8.5, target: 2.0, unit: "minutes" },
    { name: "Languages Supported", current: 2, target: 5, unit: "languages" },
    { name: "Health Centers Connected", current: 12, target: 100, unit: "centers" }
  ]
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'in_progress': return <Clock className="h-5 w-5 text-blue-600" />;
    case 'pending': return <Calendar className="h-5 w-5 text-gray-400" />;
    default: return <Clock className="h-5 w-5 text-gray-400" />;
  }
};

export default function MaternalHealthAI() {
  const fundingProgress = (project.fundingRaised / project.fundingGoal) * 100;

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-red-900 to-pink-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/projects" className="inline-flex items-center text-pink-200 hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <Badge className="bg-green-500 text-white">Active Project</Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-red-100 mb-6">
                {project.description.split('\n')[0]}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-red-900 hover:bg-red-50">
                  <Zap className="mr-2 h-5 w-5" />
                  Fund This Project
                </Button>
                <Button size="lg" variant="outline" className="border-white !text-white hover:!bg-white hover:!text-red-900 transition-all duration-200">
                  <Users className="mr-2 h-5 w-5" />
                  Join Community
                </Button>
              </div>
            </div>
            
            <div className="space-y-6">
              {/* Funding Card */}
              <Card className="bg-white/10 border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Funding Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>${(project.fundingRaised / 1000000).toFixed(1)}M Raised</span>
                    <span>${(project.fundingGoal / 1000000).toFixed(1)}M Goal</span>
                  </div>
                  <Progress value={fundingProgress} className="h-3" />
                  <div className="text-center">
                    <span className="text-2xl font-bold">{fundingProgress.toFixed(1)}%</span>
                    <span className="text-sm text-red-200 block">Funded</span>
                  </div>
                </CardContent>
              </Card>
              
              {/* Token Allocation */}
              <Card className="bg-white/10 border-white/20 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      <span className="font-medium">WAMToken Allocation</span>
                    </div>
                    <span className="text-xl font-bold">{(project.tokenAllocation / 1000000).toFixed(1)}M WAM</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Current Impact Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.currentMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-red-600 mb-2">
                    {metric.current.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{metric.name}</div>
                  <div className="text-xs text-gray-500">
                    Target: {metric.target.toLocaleString()} {metric.unit}
                  </div>
                  <Progress 
                    value={(metric.current / metric.target) * 100} 
                    className="h-1 mt-3" 
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Technology Stack */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Technology Innovation</h2>
              <div className="space-y-4">
                {project.technologyStack.map((tech, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Brain className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{tech.name}</h3>
                          <p className="text-sm text-gray-600">{tech.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              <div className="space-y-3">
                {project.keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Impact Goals */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Goals</h3>
                <div className="space-y-2">
                  {Object.entries(project.impactGoals).map(([key, value], index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-red-600" />
                      <span className="text-sm text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Project Milestones</h2>
          <div className="space-y-6">
            {project.milestones.map((milestone, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {getStatusIcon(milestone.status)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">
                            ${(milestone.fundingRequired / 1000000).toFixed(1)}M required
                          </span>
                          <Badge 
                            variant={milestone.status === 'completed' ? 'default' : 'secondary'}
                            className={milestone.status === 'in_progress' ? 'bg-blue-500 text-white' : ''}
                          >
                            {milestone.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{milestone.description}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>Target: {new Date(milestone.targetDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Strategic Partnerships</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.partnerships.map((partner, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Users className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                      <p className="text-sm text-gray-600">{partner.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-red-900 to-pink-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Support This Life-Saving Initiative</h2>
          <p className="text-xl text-red-100 mb-8">
            Your investment in WAMTokens directly funds the development and deployment of 
            this maternal health AI system, potentially saving thousands of lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-900 hover:bg-red-50">
              <TrendingUp className="mr-2 h-5 w-5" />
              Purchase WAMTokens
            </Button>
            <Button size="lg" variant="outline" className="border-white !text-white hover:!bg-white hover:!text-red-900 transition-all duration-200">
              <Heart className="mr-2 h-5 w-5" />
              Join DAO Governance
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
