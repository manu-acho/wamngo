'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Send, Loader2 } from 'lucide-react';

interface PartnerApplicationFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function PartnerApplicationForm({ onClose, onSuccess }: PartnerApplicationFormProps) {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    contactEmail: '',
    websiteUrl: '',
    organizationType: '',
    description: '',
    capabilities: '',
    motivation: '',
    location: '',
    teamSize: '',
    establishedYear: '',
    previousExperience: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/partners/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          establishedYear: formData.establishedYear ? parseInt(formData.establishedYear) : null
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit application');
      }

      onSuccess();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999] overflow-y-auto">
      <div className="w-full max-w-2xl my-8">
        <Card className="w-full bg-white shadow-2xl border-0 relative z-10 max-h-[85vh] overflow-hidden flex flex-col">
          <CardHeader className="bg-white border-b border-gray-100 sticky top-0 z-20 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Partner Application</CardTitle>
                <CardDescription>
                  Join our network of organizations advancing women's rights through technology and innovation.
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="relative z-30">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

        <CardContent className="bg-white relative z-10 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative z-10">
                {error}
              </div>
            )}

            {/* Organization Information */}
            <div className="space-y-4 relative z-10">
              <h3 className="text-lg font-semibold bg-white relative z-20">Organization Information</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative z-10">
                  <Label htmlFor="organizationName" className="block mb-2 font-medium text-gray-700 bg-white relative z-20">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    className="bg-white relative z-10"
                    required
                  />
                </div>
                
                <div className="relative z-10">
                  <Label htmlFor="organizationType" className="block mb-2 font-medium text-gray-700 bg-white relative z-20">Organization Type *</Label>
                  <Select 
                    value={formData.organizationType} 
                    onValueChange={(value: string) => handleInputChange('organizationType', value)}
                  >
                    <SelectTrigger className="bg-white relative z-10">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-white border shadow-lg">
                      <SelectItem value="technology">Technology Provider</SelectItem>
                      <SelectItem value="implementation">Implementation Partner</SelectItem>
                      <SelectItem value="nonprofit">Non-Profit Organization</SelectItem>
                      <SelectItem value="academic">Academic Institution</SelectItem>
                      <SelectItem value="government">Government Agency</SelectItem>
                      <SelectItem value="infrastructure">Infrastructure Provider</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="relative z-10">
                <Label htmlFor="websiteUrl" className="block mb-2 font-medium text-gray-700 bg-white relative z-20">Website URL</Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                  placeholder="https://example.com"
                  className="bg-white relative z-10"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative z-10">
                  <Label htmlFor="location" className="block mb-2 font-medium text-gray-700 bg-white relative z-20">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, Country"
                    className="bg-white relative z-10"
                  />
                </div>
                
                <div className="relative z-10">
                  <Label htmlFor="establishedYear" className="block mb-2 font-medium text-gray-700 bg-white relative z-20">Established Year</Label>
                  <Input
                    id="establishedYear"
                    type="number"
                    value={formData.establishedYear}
                    onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                    placeholder="2020"
                    min="1900"
                    max={new Date().getFullYear()}
                    className="bg-white relative z-10"
                  />
                </div>
                
                <div className="relative z-10">
                  <Label htmlFor="teamSize" className="block mb-2 font-medium text-gray-700 bg-white relative z-20">Team Size</Label>
                  <Select 
                    value={formData.teamSize} 
                    onValueChange={(value: string) => handleInputChange('teamSize', value)}
                  >
                    <SelectTrigger className="bg-white relative z-10">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-white border shadow-lg">
                      <SelectItem value="1-10">1-10 people</SelectItem>
                      <SelectItem value="11-50">11-50 people</SelectItem>
                      <SelectItem value="51-200">51-200 people</SelectItem>
                      <SelectItem value="201-1000">201-1000 people</SelectItem>
                      <SelectItem value="1000+">1000+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 relative z-10">
              <h3 className="text-lg font-semibold bg-white relative z-20">Contact Information</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative z-10">
                  <Label htmlFor="contactName" className="block mb-2 font-medium text-gray-700 bg-white relative z-20">Contact Person *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className="bg-white relative z-10"
                    required
                  />
                </div>
                
                <div className="relative z-10">
                  <Label htmlFor="contactEmail" className="block mb-2 font-medium text-gray-700 bg-white relative z-20">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="bg-white relative z-10"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Partnership Details */}
            <div className="space-y-4 relative z-10">
              <h3 className="text-lg font-semibold bg-white relative z-20">Partnership Details</h3>
              
              <div className="relative z-10">
                <Label htmlFor="description" className="block mb-2 font-medium text-gray-700 bg-white relative z-20">Organization Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your organization's mission, vision, and current activities..."
                  className="min-h-[100px] bg-white relative z-10"
                  required
                />
              </div>

              <div className="relative z-10">
                <Label htmlFor="capabilities" className="block mb-2 font-medium text-gray-700 bg-white relative z-20">Key Capabilities *</Label>
                <Textarea
                  id="capabilities"
                  value={formData.capabilities}
                  onChange={(e) => handleInputChange('capabilities', e.target.value)}
                  placeholder="What are your organization's core strengths and capabilities that would benefit our partnership?"
                  className="min-h-[100px] bg-white relative z-10"
                  required
                />
              </div>

              <div className="relative z-10">
                <Label htmlFor="motivation" className="block mb-2 font-medium text-gray-700 bg-white relative z-20">Why Partner with WAM? *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  placeholder="What motivates your organization to partner with WAM, and how do you envision contributing to our mission?"
                  className="min-h-[100px] bg-white relative z-10"
                  required
                />
              </div>

              <div className="relative z-10">
                <Label htmlFor="previousExperience" className="block mb-2 font-medium text-gray-700 bg-white relative z-20">Relevant Experience</Label>
                <Textarea
                  id="previousExperience"
                  value={formData.previousExperience}
                  onChange={(e) => handleInputChange('previousExperience', e.target.value)}
                  placeholder="Describe any previous experience working on women's rights, international development, or related initiatives..."
                  className="min-h-[80px] bg-white relative z-10"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Application
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}
