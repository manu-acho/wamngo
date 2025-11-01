import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Heart, 
  Sprout, 
  Globe, 
  Stethoscope, 
  TrendingUp, 
  Users, 
  Zap,
  ArrowRight,
  Target,
  Clock
} from "lucide-react";
import Link from "next/link";

// Planned projects - all in development/planning phase
const projects = [
  {
    id: 1,
    title: "AI-Powered Maternal Health System",
    slug: "maternal-health-ai",
    shortDescription: "Voice-first AI system designed to reduce maternal mortality through real-time health guidance in native languages, deployable offline on edge devices.",
    category: "health",
    fundingGoal: 3000000,
    fundingTarget: 3000000, // Target we aim to raise
    status: "planning", // Changed from "active"
    imageUrl: "/images/maternal-health-ai.jpg",
    projectedImpact: { // Changed from "impactGoals"
      primary: "Target: Reduce maternal mortality by 35%",
      users: "Projected reach: 500,000 women",
      regions: "5 underserved regions planned"
    },
    technologyStack: ["AI/ML", "Edge Computing", "Speech Recognition", "Blockchain"],
    partnerships: ["Ministry of Health", "Local NGOs", "Universities"]
  },
  {
    id: 2,
    title: "Smart Agricultural Advisory Network",
    slug: "smart-agriculture",
    shortDescription: "AI-powered platform designed to provide instant agricultural advice to smallholder farmers, combining computer vision, weather prediction, and local knowledge.",
    category: "agriculture",
    fundingGoal: 2500000,
    fundingTarget: 2500000,
    status: "planning",
    imageUrl: "/images/smart-agriculture.jpg",
    projectedImpact: {
      primary: "Target: Increase crop yields by 40%",
      users: "Planned reach: 100,000 farmers",
      regions: "10 agricultural regions targeted"
    },
    technologyStack: ["Computer Vision", "Predictive Analytics", "IoT", "Mobile AI"],
    partnerships: ["Ministry of Agriculture", "Research Institutes", "Cooperatives"]
  },
  {
    id: 3,
    title: "Digital Inclusion AI Platform",
    slug: "digital-inclusion-ai",
    shortDescription: "Multilingual AI platform planned to bridge the digital divide through culturally-aware services in health, education, and economic empowerment.",
    category: "education",
    fundingGoal: 1800000,
    fundingTarget: 1800000,
    status: "planning",
    imageUrl: "/images/digital-inclusion.jpg",
    projectedImpact: {
      primary: "Goal: Bridge digital divide for 5M+ users",
      users: "Projected reach: 5M+ underserved users",
      regions: "15 countries planned"
    },
    technologyStack: ["NLP", "Federated Learning", "Edge AI", "Blockchain"],
    partnerships: ["UNESCO", "Language Institutes", "Community NGOs"]
  },
  {
    id: 4,
    title: "Advanced Reconstruction Technology",
    slug: "reconstruction-technology",
    shortDescription: "Advanced radio frequency technology for FGM survivor reconstruction - pilot program with promising initial results, now seeking scale-up funding.",
    category: "health",
    fundingGoal: 4000000,
    fundingRaised: 400000, // Small pilot funding only
    status: "pilot", // More realistic status
    imageUrl: "/images/reconstruction-tech.jpg",
    projectedImpact: {
      primary: "Goal: 10K survivors supported",
      users: "Target: 10,000 reconstructions",
      regions: "20 treatment centers planned"
    },
    technologyStack: ["Medical Devices", "AI", "Blockchain", "Telemedicine"],
    partnerships: ["Medical Universities", "Clinics", "Health NGOs"]
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'health': return <Heart className="h-6 w-6" />;
    case 'agriculture': return <Sprout className="h-6 w-6" />;
    case 'education': return <Globe className="h-6 w-6" />;
    default: return <Brain className="h-6 w-6" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'health': return 'text-red-600 bg-red-100';
    case 'agriculture': return 'text-green-600 bg-green-100';
    case 'education': return 'text-blue-600 bg-blue-100';
    default: return 'text-purple-600 bg-purple-100';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-500';
    case 'proposed': return 'bg-blue-500';
    case 'completed': return 'bg-gray-500';
    default: return 'bg-yellow-500';
  }
};

export default function Projects() {
  const fundingProgress = (raised: number, goal: number) => (raised / goal) * 100;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-pink-900 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Innovation Projects</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Leveraging AI and Blockchain technology to create transformative solutions 
              in health, agriculture, and education for underserved communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/token-sale">
                <Button size="lg" className="wam-btn-primary">
                  <Zap className="mr-2 h-5 w-5" />
                  Fund Projects with WAMToken
                </Button>
              </Link>
              <Link href="/governance">
                <Button size="lg" variant="ghost" className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-purple-900 transition-all duration-200">
                  <Users className="mr-2 h-5 w-5" />
                  Join DAO Governance
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-16 wam-gradient-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold wam-text-gradient mb-4">Project Portfolio Goals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our Roadmap: Leveraging Technology to Create Meaningful Impact for Women Worldwide.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="wam-card text-center p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">4</div>
              <p className="text-gray-600">Projects Planned</p>
              <p className="text-xs text-gray-500 mt-1">1 in pilot phase</p>
            </div>
            <div className="wam-card text-center p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">$11.3M</div>
              <p className="text-gray-600">Funding Target</p>
              <p className="text-xs text-gray-500 mt-1">Total goal across all projects</p>
            </div>
            <div className="wam-card text-center p-6">
              <div className="text-3xl font-bold wam-text-gradient mb-2">5M+</div>
              <p className="text-gray-600">Projected Impact</p>
              <p className="text-xs text-gray-500 mt-1">Lives we aim to touch</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold wam-text-gradient mb-4">Our Project Portfolio</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each project represents a cutting-edge application of AI and blockchain technology 
              designed to create measurable impact for women worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="wam-card overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-full ${getCategoryColor(project.category)}`}>
                      {getCategoryIcon(project.category)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="secondary" 
                        className={`${getStatusColor(project.status)} text-white`}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {project.shortDescription}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Funding Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {project.fundingRaised ? "Funding Progress" : "Funding Target"}
                      </span>
                      <span className="text-sm text-gray-600 wam-hash-text">
                        {project.fundingRaised 
                          ? `$${(project.fundingRaised / 1000000).toFixed(1)}M / $${((project.fundingTarget || project.fundingGoal) / 1000000).toFixed(1)}M`
                          : `Target: $${((project.fundingTarget || project.fundingGoal) / 1000000).toFixed(1)}M`
                        }
                      </span>
                    </div>
                    <Progress 
                      value={project.fundingRaised ? fundingProgress(project.fundingRaised, project.fundingTarget || project.fundingGoal) : 0} 
                      className="h-2" 
                    />
                  </div>

                  {/* Projected Impact */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Projected Impact</h4>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Target className="h-3 w-3 text-purple-600" />
                        <span className="text-gray-600">{project.projectedImpact.primary}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Users className="h-3 w-3 text-pink-600" />
                        <span className="text-gray-600">{project.projectedImpact.users}</span>
                      </div>
                    </div>
                  </div>

                  {/* Technology Stack */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Technology</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologyStack.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologyStack.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologyStack.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href={`/projects/${project.slug}`}>
                    <Button className="w-full wam-btn-primary">
                      View Project Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 wam-gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 blur-xl animate-pulse animation-delay-1000"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">Join the Innovation Revolution</h2>
          <p className="text-xl text-purple-100 mb-8">
            Purchase WAMTokens to fund these groundbreaking projects and participate in 
            governance decisions that shape the future of humanitarian technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/token-sale">
              <Button size="lg" className="wam-btn-primary">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Token Sale
              </Button>
            </Link>
            <Link href="/governance">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Clock className="mr-2 h-5 w-5" />
                View Active Proposals
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
