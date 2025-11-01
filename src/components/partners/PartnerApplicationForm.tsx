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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Partner Application</CardTitle>
              <CardDescription>
                Join our network of organizations advancing women's rights through technology and innovation.
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Organization Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Organization Information</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="organizationType">Organization Type *</Label>
                  <Select 
                    value={formData.organizationType} 
                    onValueChange={(value: string) => handleInputChange('organizationType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
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

              <div>
                <Label htmlFor="websiteUrl">Website URL</Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
                
                <div>
                  <Label htmlFor="establishedYear">Established Year</Label>
                  <Input
                    id="establishedYear"
                    type="number"
                    value={formData.establishedYear}
                    onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                    placeholder="2020"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
                
                <div>
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Select 
                    value={formData.teamSize} 
                    onValueChange={(value: string) => handleInputChange('teamSize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
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
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contactName">Contact Person *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Partnership Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Partnership Details</h3>
              
              <div>
                <Label htmlFor="description">Organization Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your organization's mission, vision, and current activities..."
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="capabilities">Key Capabilities *</Label>
                <Textarea
                  id="capabilities"
                  value={formData.capabilities}
                  onChange={(e) => handleInputChange('capabilities', e.target.value)}
                  placeholder="What are your organization's core strengths and capabilities that would benefit our partnership?"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="motivation">Why Partner with WAM? *</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  placeholder="What motivates your organization to partner with WAM, and how do you envision contributing to our mission?"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="previousExperience">Relevant Experience</Label>
                <Textarea
                  id="previousExperience"
                  value={formData.previousExperience}
                  onChange={(e) => handleInputChange('previousExperience', e.target.value)}
                  placeholder="Describe any previous experience working on women's rights, international development, or related initiatives..."
                  className="min-h-[80px]"
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
  );
}
