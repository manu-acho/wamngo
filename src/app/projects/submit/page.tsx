"use client";

import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Save, 
  Upload, 
  DollarSign, 
  Target, 
  Users, 
  Calendar,
  X
} from "lucide-react";
import { useState } from "react";

export default function ProjectSubmit() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    shortDescription: "",
    category: "health",
    fundingGoal: "",
    tokenAllocation: "",
    technologyStack: [] as string[],
    partnerships: [] as string[],
    impactGoals: {
      primary: "",
      users: "",
      regions: ""
    }
  });

  const [newTech, setNewTech] = useState("");
  const [newPartner, setNewPartner] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { value: "health", label: "Health Technology" },
    { value: "agriculture", label: "Agricultural Innovation" },
    { value: "education", label: "Educational Technology" },
    { value: "reconstruction", label: "Medical Reconstruction" }
  ];

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addTechnology = () => {
    if (newTech && !formData.technologyStack.includes(newTech)) {
      setFormData(prev => ({
        ...prev,
        technologyStack: [...prev.technologyStack, newTech]
      }));
      setNewTech("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologyStack: prev.technologyStack.filter(t => t !== tech)
    }));
  };

  const addPartnership = () => {
    if (newPartner && !formData.partnerships.includes(newPartner)) {
      setFormData(prev => ({
        ...prev,
        partnerships: [...prev.partnerships, newPartner]
      }));
      setNewPartner("");
    }
  };

  const removePartnership = (partner: string) => {
    setFormData(prev => ({
      ...prev,
      partnerships: prev.partnerships.filter(p => p !== partner)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const submissionData = {
        title: formData.title,
        description: formData.description,
        shortDescription: formData.shortDescription,
        category: formData.category,
        fundingGoal: parseFloat(formData.fundingGoal),
        tokenAllocation: parseFloat(formData.tokenAllocation),
        technologyStack: formData.technologyStack,
        partnerships: formData.partnerships,
        impactGoals: formData.impactGoals,
        submitterEmail: '', // This would come from user context
        submitterName: ''   // This would come from user context
      };

      const response = await fetch('/api/projects/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        setSubmitted(true);
        // Reset form
        setFormData({
          title: "",
          description: "",
          shortDescription: "",
          category: "health",
          fundingGoal: "",
          tokenAllocation: "",
          technologyStack: [],
          partnerships: [],
          impactGoals: {
            primary: "",
            users: "",
            regions: ""
          }
        });
      } else {
        throw new Error('Failed to submit project');
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      alert('Failed to submit project. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Submit New Project</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Propose innovative AI and blockchain solutions for health, agriculture, 
              and education that can be funded through the WAM ecosystem.
            </p>
          </div>
        </div>
      </section>

      {/* Project Submission Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., AI-Powered Maternal Health System"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="shortDescription">Short Description *</Label>
                  <Textarea
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    placeholder="Brief 1-2 sentence summary of the project"
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Comprehensive description including problem statement, solution, and expected impact..."
                    rows={8}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Funding Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5" />
                  <span>Funding Requirements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fundingGoal">Funding Goal (USD) *</Label>
                    <Input
                      id="fundingGoal"
                      type="number"
                      value={formData.fundingGoal}
                      onChange={(e) => handleInputChange('fundingGoal', e.target.value)}
                      placeholder="3000000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="tokenAllocation">WAMToken Allocation *</Label>
                    <Input
                      id="tokenAllocation"
                      type="number"
                      value={formData.tokenAllocation}
                      onChange={(e) => handleInputChange('tokenAllocation', e.target.value)}
                      placeholder="1500000"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technology Stack */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Technology Stack</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder="Add technology (e.g., AI/ML, Blockchain, IoT)"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                  />
                  <Button type="button" onClick={addTechnology}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.technologyStack.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Impact Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Impact Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="impactPrimary">Primary Impact Goal *</Label>
                  <Input
                    id="impactPrimary"
                    value={formData.impactGoals.primary}
                    onChange={(e) => handleInputChange('impactGoals.primary', e.target.value)}
                    placeholder="e.g., Reduce maternal mortality by 35%"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="impactUsers">Target Users</Label>
                    <Input
                      id="impactUsers"
                      value={formData.impactGoals.users}
                      onChange={(e) => handleInputChange('impactGoals.users', e.target.value)}
                      placeholder="e.g., 500,000 women reached"
                    />
                  </div>
                  <div>
                    <Label htmlFor="impactRegions">Target Regions</Label>
                    <Input
                      id="impactRegions"
                      value={formData.impactGoals.regions}
                      onChange={(e) => handleInputChange('impactGoals.regions', e.target.value)}
                      placeholder="e.g., 5 underserved regions"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Partnerships */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Strategic Partnerships</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newPartner}
                    onChange={(e) => setNewPartner(e.target.value)}
                    placeholder="Add partner organization"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPartnership())}
                  />
                  <Button type="button" onClick={addPartnership}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.partnerships.map((partner, index) => (
                    <Badge key={index} variant="outline" className="flex items-center space-x-1">
                      <span>{partner}</span>
                      <button
                        type="button"
                        onClick={() => removePartnership(partner)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center">
              {submitted ? (
                <div className="text-center">
                  <div className="mb-4 text-green-600 text-lg font-semibold">
                    ✅ Project Submitted Successfully!
                  </div>
                  <p className="text-gray-600 mb-4">
                    Your project proposal has been submitted for review. You'll be notified when it's approved for DAO voting.
                  </p>
                  <Button 
                    type="button" 
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                  >
                    Submit Another Project
                  </Button>
                </div>
              ) : (
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto"
                  disabled={submitting}
                >
                  <Save className="mr-2 h-5 w-5" />
                  {submitting ? 'Submitting...' : 'Submit Project Proposal'}
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Submission Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Project Requirements:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Must align with WAM's mission of health, education, or economic empowerment</li>
                  <li>Should leverage AI, blockchain, or other innovative technologies</li>
                  <li>Clear impact metrics and measurable outcomes</li>
                  <li>Realistic funding requirements and timeline</li>
                  <li>Strategic partnerships to ensure successful deployment</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold">Review Process:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                  <li>Initial review by WAM technical committee (2-3 weeks)</li>
                  <li>Community feedback period for published proposals</li>
                  <li>DAO voting by WAMToken holders for funding approval</li>
                  <li>Milestone-based funding release and progress tracking</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
