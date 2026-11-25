import React from 'react';
import { Heart, Mail, Phone, MapPin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-700 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 fill-current" />
              <span className="text-xl font-bold">Blood Bank Locator</span>
            </Link>
            <p className="text-primary-200 text-sm">
              Every Drop Counts. Every Second Matters.
              Connecting donors, hospitals, and blood banks through real-time blood inventory management.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-primary-200 hover:text-white text-sm">Home</a></li>
              <li><a href="/blood-banks" className="text-primary-200 hover:text-white text-sm">Locate Banks</a></li>
              <li><a href="/inventory" className="text-primary-200 hover:text-white text-sm">Live Inventory</a></li>
              <li><a href="/about" className="text-primary-200 hover:text-white text-sm">About</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-primary-200">
                <Mail className="h-4 w-4 mr-2" />
                info@bloodbanklocator.org
              </li>
              <li className="flex items-center text-primary-200">
                <Phone className="h-4 w-4 mr-2" />
                1800-BLOOD-BANK
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <p className="text-primary-200 text-sm mb-4">
              Follow us for updates and important announcements.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-200 hover:text-white"
            >
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>

        <div className="border-t border-primary-600 mt-8 pt-6 text-center text-primary-200">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Blood Bank Locator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;