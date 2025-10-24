import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Camera, Users, Heart } from "lucide-react";
import Link from "next/link";

export default function FashionForHope() {
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-pink-900 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Fashion For Hope</h1>
            <p className="text-xl text-pink-100 max-w-3xl mx-auto">
              A quarterly fashion show concept raising awareness about violence against women
            </p>
          </div>
        </div>
      </section>

      {/* About Fashion For Hope */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Fashion For Hope</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Fashion For Hope is a quarterly fashion show concept</strong> that serves as an artistic platform to address the critical issue of violence against women, particularly Female Genital Mutilation (FGM).
                </p>
                <p>
                  We consider it to be in the purview of each human being to feel concerned by the suffering of any other human beings. At this point, genital mutilations are particularly outraging. Often feeling ashamed and not allowed to talk, the victims are in most cases unable to communicate their pain, even less in a position to claim any right.
                </p>
                <p>
                  Women Against Mutilations (WAM) offers to come at their help by putting into place a multidisciplinary network to carry out the care needed.
                </p>
              </div>
            </div>
            <div>
              <Card className="border-pink-200">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-pink-600" />
                    <CardTitle className="text-pink-800">Event Schedule</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Frequency:</span>
                      <Badge variant="secondary">Quarterly</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Next Event:</span>
                      <span className="text-gray-600">To be announced</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Location:</span>
                      <span className="text-gray-600">Geneva, Switzerland</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Breaking the Taboo</h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-pink-600" />
            </div>
            <p className="text-lg text-gray-700 italic mb-4">
              "Violence towards women is a taboo topic."
            </p>
            <div className="text-left space-y-3 max-w-2xl mx-auto">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-600 rounded-full mt-2"></div>
                <p className="text-gray-700">
                  Series of documentaries to educate about the danger of this barbaric practice of FGM
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-pink-600 rounded-full mt-2"></div>
                <p className="text-gray-700">
                  Artistic Event: Fashion For Hope - quarterly fashion shows that combine art with advocacy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Gallery</h2>
            <p className="text-lg text-gray-600">
              Moments from our Fashion For Hope events showcasing the power of art in advocacy
            </p>
          </div>

          {/* Placeholder for photo gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                  <Camera className="h-12 w-12 text-gray-400" />
                </div>
                <CardContent className="p-3">
                  <p className="text-sm text-gray-600 text-center">
                    Fashion For Hope Event #{index}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              <Camera className="mr-2 h-4 w-4" />
              View Full Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-pink-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl text-purple-100 mb-8">
            Support our Fashion For Hope events and help us raise awareness about violence against women through the power of art and fashion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donation">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
                <Heart className="mr-2 h-5 w-5" />
                Support Our Cause
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white !text-white hover:!bg-white hover:!text-purple-900 transition-all duration-200">
                <Users className="mr-2 h-5 w-5" />
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Multilingual Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle>Fashion For Hope (English)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Fashion For Hope is a fashion trimestrial show concept. We consider it to be in the purview of each human being to feel concerned by the suffering of any other human beings. At this point, genital mutilations are particularly outraging. Often feeling ashamed and not allowed to talk, the victims are in most cases unable to communicate their pain, even less in a position to claim any right.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fashion For Hope (Français)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Fashion For Hope est un concept de défilé de mode trimestriel. Nous considérons du ressort de chaque être humain de se sentir concerné par la douleur de tout autre être humain. Les mutilations génitales sont à ce sujet particulièrement révoltantes. Souvent privées de parole et ressentant une honte en plus des graves lésions subies, les victimes sont pour la plupart dans l'incapacité de communiquer leur douleur.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
