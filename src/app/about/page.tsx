import { Layout } from "@/components/layout/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Globe } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-24 pb-16 wam-gradient-surface relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 blur-xl animate-pulse animation-delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 wam-text-gradient">About WAM</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Women Against Mutilations - Fighting for women's rights and dignity for over two decades
            </p>
          </div>
        </div>
      </section>

      {/* Words of the Founder */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold wam-text-gradient mb-8 text-center">Words of the Founder</h2>
          
          <div className="wam-card p-8">
            <div className="prose prose-lg mx-auto text-gray-700">
              <p className="text-lg leading-relaxed mb-6">
                <strong>I wish to extend my sincere thanks to those who helped me to create in such a short time Women Against Mutilation (WAM).</strong>
              </p>
              
              <p className="mb-6">
                I have worked for twenty years on the crucial question of the identity of migrant women. Active with several associations and groups, I have always been sensitive to the issue of female genital mutilation (FGM) and militée to break this taboo. I thus directly involved in information, training and advice, both from civil society and various state commissions.
              </p>

              <p className="mb-6">
                Complications of FGM are many and the people involved do speak little or no. These complications may differ depending on the type of circumcision according to WHO and the way it is practiced. Besides the immediate death after childbirth, the most common consequences are heavy bleeding during surgery, severe pain during menstruation, urinary infections or recurrent inability to hold urine.
              </p>

              <p className="mb-6">
                There are often complications during healing (cyst and abscess formation). The effects can be lost or decreased sexual sensitivity and pain preventing the woman to have a fulfilling sex life. Other possible consequences of FGM are deteriorating sexual pleasure of men and, in general, intimate relations between man and woman.
              </p>

              <p className="mb-6">
                It is important to note the existence of psychic disorders related to FGM: strong anguish, shock, psychological trauma. And long-term depression, sleep disorder, panic attacks, memory loss.
              </p>

              <p className="font-semibold wam-text-gradient">
                WAM aims to establish for women concerned a new approach combining human expertise and technology. Our qualified and passionate collaborators will offer customized support based on individual needs. This new approach, which combines human expertise and best performing high technology, will be fully at the service of women and their personal integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WAM: NGO for Hope */}
      <section className="py-16 wam-gradient-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold wam-text-gradient mb-4">WAM: NGO for Hope</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment and vision for making a global difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="wam-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl wam-text-gradient">UN Member</CardTitle>
                <Badge variant="secondary" className="mx-auto bg-purple-100 text-purple-800">Special ECOSOC Status</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  With the special ECOSOC statute, WAM is a full member of UN which allows us to achieve our missions globally and make a difference.
                </p>
              </CardContent>
            </Card>

            <Card className="wam-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl wam-text-gradient">Two Decades</CardTitle>
                <Badge variant="secondary" className="mx-auto bg-pink-100 text-pink-800">Experience</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  With over two decades dedicated to the cause, WAM aims to raise awareness for victims through legal commissions and concrete actions.
                </p>
              </CardContent>
            </Card>

            <Card className="wam-card text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl wam-text-gradient">Innovation</CardTitle>
                <Badge variant="secondary" className="mx-auto bg-teal-100 text-teal-800">Technology + Care</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We're developing innovative approaches that combine psychological support with technology to help women rebuild their lives with dignity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
