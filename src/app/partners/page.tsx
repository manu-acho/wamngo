'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ExternalLink, 
  Mail, 
  MapPin, 
  Users, 
  Calendar,
  Building2,
  Code,
  Zap,
  Lightbulb,
  Globe,
  Heart
} from 'lucide-react';
import Link from 'next/link';
import PartnerApplicationForm from '@/components/partners/PartnerApplicationForm';

interface Partner {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  capabilities: string;
  logoUrl?: string;
  websiteUrl?: string;
  contactEmail?: string;
  partnerType: string;
  status: string;
  location?: string;
  establishedYear?: number;
  teamSize?: string;
  specialization?: string[];
  achievements?: string[];
  projects?: string[];
  createdAt: string;
}

const partnerTypeIcons = {
  technology: Code,
  implementation: Zap,
  government: Building2,
  academic: Lightbulb,
  infrastructure: Globe,
  nonprofit: Heart
};

const partnerTypeColors = {
  technology: 'bg-blue-100 text-blue-800 border-blue-200',
  implementation: 'bg-green-100 text-green-800 border-green-200',
  government: 'bg-purple-100 text-purple-800 border-purple-200',
  academic: 'bg-orange-100 text-orange-800 border-orange-200',
  infrastructure: 'bg-gray-100 text-gray-800 border-gray-200',
  nonprofit: 'bg-pink-100 text-pink-800 border-pink-200'
};

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredPartners(partners);
    } else {
      setFilteredPartners(partners.filter(partner => partner.partnerType === selectedType));
    }
  }, [partners, selectedType]);

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/partners');
      const data = await response.json();
      setPartners(data.partners || []);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const partnerTypes = [
    { value: 'all', label: 'All Partners' },
    { value: 'technology', label: 'Technology' },
    { value: 'implementation', label: 'Implementation' },
    { value: 'government', label: 'Government' },
    { value: 'academic', label: 'Academic' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'nonprofit', label: 'Non-Profit' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Partners
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We collaborate with leading organizations worldwide to advance women's rights 
            through innovative technology and community-driven solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setShowApplicationForm(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              Become a Partner
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about">Learn More About WAM</Link>
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {partnerTypes.map((type) => (
            <Button
              key={type.value}
              variant={selectedType === type.value ? "default" : "outline"}
              onClick={() => setSelectedType(type.value)}
              className={selectedType === type.value ? 
                "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : ""
              }
            >
              {type.label}
            </Button>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPartners.map((partner) => {
            const Icon = partnerTypeIcons[partner.partnerType as keyof typeof partnerTypeIcons] || Building2;
            const typeColor = partnerTypeColors[partner.partnerType as keyof typeof partnerTypeColors] || 'bg-gray-100 text-gray-800';
            
            return (
              <Card key={partner.id} className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2 flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        {partner.name}
                      </CardTitle>
                      <Badge className={`mb-3 ${typeColor}`}>
                        {partner.partnerType}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardDescription className="text-sm">
                    {partner.shortDescription || partner.description.substring(0, 150) + '...'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Capabilities */}
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Key Capabilities</h4>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {partner.capabilities}
                    </p>
                  </div>
                  
                  {/* Meta Information */}
                  <div className="space-y-2 text-sm text-gray-600">
                    {partner.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{partner.location}</span>
                      </div>
                    )}
                    
                    {partner.establishedYear && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Established {partner.establishedYear}</span>
                      </div>
                    )}
                    
                    {partner.teamSize && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{partner.teamSize} team members</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    {partner.websiteUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={partner.websiteUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Website
                        </a>
                      </Button>
                    )}
                    
                    {partner.contactEmail && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${partner.contactEmail}`}>
                          <Mail className="h-4 w-4 mr-1" />
                          Contact
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Partner Section - Addis AI */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Partnership</h2>
          <Card className="max-w-4xl mx-auto border-2 border-gradient-to-r from-purple-600 to-pink-600">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Addis AI</CardTitle>
                  <CardDescription className="text-lg">
                    Strategic AI technology partner advancing women's rights through innovation
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Partnership Overview</h3>
                <p className="text-gray-700 leading-relaxed">
                  Addis AI is our strategic technology partner, bringing cutting-edge AI capabilities to advance 
                  women's rights and community development. Together, we're developing innovative solutions that 
                  work offline and in local languages to serve underserved communities worldwide, with a focus 
                  on maternal health, agricultural advisory, and digital inclusion.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Core Capabilities</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Culture-aware, multimodal AI platforms</li>
                    <li>• Voice-first, offline AI solutions</li>
                    <li>• Multilingual support for indigenous languages</li>
                    <li>• Edge device deployment without internet dependency</li>
                    <li>• Developer ecosystem with 200+ contributors</li>
                    <li>• Enterprise-grade AI model deployment</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Impact & Reach</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• 75,000-80,000 active users</li>
                    <li>• 10,000 weekly active users</li>
                    <li>• 5M+ API calls per month</li>
                    <li>• NVIDIA Inception Program partner</li>
                    <li>• Enterprise deployments across multiple sectors</li>
                    <li>• Proven scalability across 4 continents</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Joint WAM-Addis AI Initiative Goals</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Maternal Health AI</h5>
                    <p className="text-sm text-gray-600">
                      Developing AI-powered health guidance systems that provide culturally-appropriate 
                      maternal health advice in local languages, accessible without internet connectivity.
                    </p>
                  </div>
                  
                  <div className="bg-pink-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Agricultural Innovation</h5>
                    <p className="text-sm text-gray-600">
                      Creating smart farming solutions that provide real-time agricultural guidance, 
                      climate-smart practices, and market information to women farmers.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Digital Inclusion</h5>
                    <p className="text-sm text-gray-600">
                      Breaking down digital barriers with voice-first technology that serves 
                      underserved populations through smartphone apps and IVR systems.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Partnership Achievements</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Technology Development</h5>
                    <p className="text-sm text-gray-600">
                      Co-developed offline AI models capable of running on edge devices, enabling 
                      real-time conversational AI without internet dependency.
                    </p>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h5 className="font-medium mb-2">Community Impact</h5>
                    <p className="text-sm text-gray-600">
                      Deployed solutions reaching thousands of users with culturally-accurate, 
                      language-appropriate AI assistance for critical health and livelihood needs.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <a href="https://platform.addisassistant.com/" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Addis AI Platform
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/projects">View Our Joint Projects</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-lg mb-6">
            Join our global network of partners working to advance women's rights through technology and innovation.
          </p>
          <Button 
            onClick={() => setShowApplicationForm(true)}
            variant="secondary"
            size="lg"
          >
            Apply to Become a Partner
          </Button>
        </div>
      </div>

      {/* Partner Application Modal */}
      {showApplicationForm && (
        <PartnerApplicationForm 
          onClose={() => setShowApplicationForm(false)}
          onSuccess={() => {
            setShowApplicationForm(false);
            // Optionally refresh partners list
          }}
        />
      )}
    </div>
  );
}
