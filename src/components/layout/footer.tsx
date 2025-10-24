import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Organization Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">WAM</h3>
            <p className="text-gray-300 mb-4">
              Women Against Mutilations - Empowering women through awareness, 
              support, and action against female genital mutilation.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                Avenue Louis Casaï 71, CH-1216 Genève - Cointrin, Switzerland
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                info@ngowam.org
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                +41 (0)78 805 05 01
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About WAM
                </Link>
              </li>
              <li>
                <Link href="/donation" className="text-gray-300 hover:text-white transition-colors">
                  Make a Donation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/fashion-for-hope" className="text-gray-300 hover:text-white transition-colors">
                  Fashion For Hope
                </Link>
              </li>
            </ul>
          </div>

          {/* Mission Statement */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-300 text-sm mb-4">
              With special ECOSOC statute, WAM is a full member of UN which allows us 
              to achieve our missions globally and make a difference in the fight 
              against female genital mutilation.
            </p>
            <div className="text-sm text-gray-400">
              <strong>UN Member</strong> • <strong>25 Years Experience</strong>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 WAM - Women Against Mutilations. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="/terms-of-use" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
