import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, CreditCard, Building, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Donation() {
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-purple-900 via-pink-900 to-teal-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Make a Donation</h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Your contribution makes a real difference in the lives of women affected by FGM
            </p>
          </div>
        </div>
      </section>

      {/* Donation Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold wam-text-gradient mb-4">How to Donate</h2>
            <p className="text-lg text-gray-600">
              You can make a donation to our NGO, WAM, in various forms. You have the option to become a member or make a donation without membership. You are free to contribute any amount you wish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Bank Transfer */}
            <Card className="wam-card">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="wam-text-gradient">Bank Transfer</CardTitle>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-800">Recommended</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold text-gray-900">Bank Account:</p>
                  <p className="text-lg font-mono bg-gray-100 p-2 rounded">
                    CH66 0834 9000 1100 0331 8
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Bank:</p>
                  <p className="text-gray-600">Caisse Epargne Riviera</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Beneficiary:</p>
                  <p className="text-gray-600">WAM - Women Against Mutilations</p>
                </div>
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded">
                  ✓ You will receive documentation for tax deduction purposes
                </div>
              </CardContent>
            </Card>

            {/* Contact for Donation */}
            <Card className="wam-card">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="wam-text-gradient">Contact Us</CardTitle>
                    <Badge variant="outline" className="border-pink-200 text-pink-700">Alternative Method</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  You may contact us to arrange a donation by emailing us directly.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">info@ngowam.org</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">+41 (0)78 805 05 01</span>
                  </div>
                </div>
                <Link href="/contact">
                  <Button className="w-full wam-btn-primary">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Us for Donation
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Membership Option */}
          <Card className="mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Become a Member</CardTitle>
              <p className="text-gray-600">Join our mission with ongoing support</p>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Support our cause through membership and be part of our ongoing efforts to fight against FGM. 
                Members receive regular updates about our work and impact.
              </p>
              <Link href="mailto:info@ngowam.org?subject=Membership Application">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Mail className="mr-2 h-5 w-5" />
                  Become a Member
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Empower Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Empower. Protect. Act.</h2>
          <p className="text-xl text-blue-100 mb-8">
            Every donation helps us provide crucial support, medical care, and advocacy for women affected by FGM.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Medical Support</h3>
              <p className="text-blue-200">Radio frequency reconstruction techniques</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Psychological Care</h3>
              <p className="text-blue-200">Trauma counseling and support</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Global Advocacy</h3>
              <p className="text-blue-200">UN initiatives and awareness campaigns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Organization Details</h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Mailing Address</h3>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-medium">WAM - Women Against Mutilations</p>
                        <p className="text-gray-600">Case Postale 202</p>
                        <p className="text-gray-600">1820 Montreux 2</p>
                        <p className="text-gray-600">Switzerland</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Physical Address</h3>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Building className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-gray-600">Avenue Louis Casaï 71</p>
                        <p className="text-gray-600">CH-1216 Genève - Cointrin</p>
                        <p className="text-gray-600">Switzerland</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
