"use client";

import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-purple-900 via-pink-900 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              We appreciate your feedback and are here to help
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold wam-text-gradient mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The first associative platform that helps women and their children who suffer violence. 
              Do not hesitate to contact us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="wam-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <span className="wam-text-gradient">Email Address</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">info@ngowam.org</p>
                    <p className="text-sm text-gray-600">Primary contact for all inquiries</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="wam-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-pink-600" />
                    <span className="wam-text-gradient">Telephone</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">+41 (0)78 805 05 01</p>
                    <p className="text-sm text-gray-600">Available during business hours</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="wam-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-teal-600" />
                    <span className="wam-text-gradient">Physical Address</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-medium">WAM - Women Against Mutilations</p>
                    <p className="text-gray-600">Avenue Louis Casaï 71</p>
                    <p className="text-gray-600">CH-1216 Genève - Cointrin</p>
                    <p className="text-gray-600">Switzerland</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="wam-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <span className="wam-text-gradient">Mailing Address</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <p className="font-medium">WAM - Women Against Mutilations</p>
                    <p className="text-gray-600">Case Postale 202</p>
                    <p className="text-gray-600">1820 Montreux 2</p>
                    <p className="text-gray-600">Switzerland</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="wam-card">
                <CardHeader>
                  <CardTitle className="wam-text-gradient">Send us a Message</CardTitle>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this about?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please describe how we can help you..."
                        rows={6}
                      />
                    </div>

                    {submitted ? (
                      <div className="text-center py-8">
                        <div className="text-green-600 text-lg font-semibold mb-4">
                          ✅ Message Sent Successfully!
                        </div>
                        <p className="text-gray-600 mb-4">
                          Thank you for your message! We will get back to you soon.
                        </p>
                        <Button 
                          type="button" 
                          onClick={() => setSubmitted(false)}
                          variant="outline"
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        type="submit" 
                        className="w-full wam-btn-primary" 
                        size="lg"
                        disabled={submitting}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        {submitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Can Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Support Services</h3>
              <p className="text-gray-600 text-sm">
                Counseling, medical support, and reconstruction services for FGM survivors
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Educational Resources</h3>
              <p className="text-gray-600 text-sm">
                Information about FGM prevention, awareness campaigns, and training programs
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Partnership Opportunities</h3>
              <p className="text-gray-600 text-sm">
                Collaborate with us on initiatives, events, and advocacy efforts
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
