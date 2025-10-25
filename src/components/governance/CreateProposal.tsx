"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText, DollarSign, Users, Clock } from 'lucide-react';

interface ProposalForm {
  title: string;
  description: string;
  category: string;
  projectType: string;
  fundingAmount: string;
  duration: string;
  milestones: string;
}

export default function CreateProposal() {
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<ProposalForm>({
    title: '',
    description: '',
    category: '',
    projectType: '',
    fundingAmount: '',
    duration: '',
    milestones: ''
  });

  const categories = ['Health', 'Education', 'Agriculture', 'Technology', 'Governance', 'Other'];
  const projectTypes = ['AI/Health', 'AgTech/AI', 'Education/Tech', 'Web3/DeFi', 'Tokenomics', 'Infrastructure'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating proposal:', form);
    // Here you would integrate with smart contract
    setIsCreating(false);
    // Reset form
    setForm({
      title: '',
      description: '',
      category: '',
      projectType: '',
      fundingAmount: '',
      duration: '',
      milestones: ''
    });
  };

  const handleInputChange = (field: keyof ProposalForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  if (!isCreating) {
    return (
      <Card className="wam-card">
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2 wam-text-gradient">Create New Proposal</h3>
          <p className="text-gray-600 mb-6">
            Submit a proposal for community voting. Proposals require a minimum of 1000 WAM tokens to create.
          </p>
          <Button 
            onClick={() => setIsCreating(true)}
            className="wam-btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Proposal
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="wam-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Create New Proposal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Proposal Title *</label>
            <Input
              value={form.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter a clear, descriptive title"
              required
            />
          </div>

          {/* Category and Project Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category *</label>
              <select
                value={form.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Type</label>
              <select
                value={form.projectType}
                onChange={(e) => handleInputChange('projectType', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select type</option>
                {projectTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description *</label>
            <Textarea
              value={form.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Provide a detailed description of your proposal, including objectives, methodology, and expected impact..."
              rows={6}
              required
            />
          </div>

          {/* Funding and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                Funding Amount (USD)
              </label>
              <Input
                value={form.fundingAmount}
                onChange={(e) => handleInputChange('fundingAmount', e.target.value)}
                placeholder="e.g., 500000"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Project Duration
              </label>
              <Input
                value={form.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="e.g., 12 months"
              />
            </div>
          </div>

          {/* Milestones */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Key Milestones</label>
            <Textarea
              value={form.milestones}
              onChange={(e) => handleInputChange('milestones', e.target.value)}
              placeholder="List key milestones and deliverables (one per line)..."
              rows={4}
            />
          </div>

          {/* Requirements Notice */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-800 mb-2">Proposal Requirements</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Minimum 1000 WAM tokens required to create proposal</li>
              <li>• Voting period: 7 days from submission</li>
              <li>• Minimum 1000 total votes required for passage</li>
              <li>• Simple majority (&gt;50%) needed to pass</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreating(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 wam-btn-primary"
            >
              <FileText className="w-4 h-4 mr-2" />
              Submit Proposal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
