import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-red-600 fill-red-600" />
              <span className="text-xl">Digital Blood Donation Network</span>
            </div>
            <p className="text-gray-400 text-sm">
              Connecting donors with those in need. Saving lives, one donation at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a href="/#home" className="text-gray-400 hover:text-white transition-colors">
                Home
              </a>
              <a href="/#instructions" className="text-gray-400 hover:text-white transition-colors">
                How It Works
              </a>
              <a href="/#contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </a>
             <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
  Privacy Policy
</Link>
            </div>
          </div>

          {/* Resources & Learn */}
          <div>
            <h3 className="text-lg mb-4">Resources</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/resources" className="text-gray-400 hover:text-white transition-colors">
                All Resources
              </Link>
              <Link to="/resources#compatibility" className="text-gray-400 hover:text-white transition-colors">
                Blood Compatibility
              </Link>
              <Link to="/resources#benefits" className="text-gray-400 hover:text-white transition-colors">
                Donation Benefits
              </Link>
              <Link to="/resources#eligibility" className="text-gray-400 hover:text-white transition-colors">
                Eligibility Criteria
              </Link>
              <Link to="/resources#safety" className="text-gray-400 hover:text-white transition-colors">
                Safety Guidelines
              </Link>
              <Link to="/blood-donation-guide" className="text-gray-400 hover:text-white transition-colors">
                Donation Process Guide
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg mb-4">Contact Us</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <p>
                <span className="text-white">Emergency:</span><br />
                <a href="tel:+15559111911" className="text-red-500 hover:text-red-400">
                  +1 (555) 911-1911
                </a>
              </p>
              <p>
                <span className="text-white">Email:</span><br />
                <a href="mailto:info@blooddonation.org" className="hover:text-white">
                  info@blooddonation.org
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2026 Blood Donation System. Saving Lives, One Donation at a Time.
          </p>
        </div>
      </div>
    </footer>
  );
}
