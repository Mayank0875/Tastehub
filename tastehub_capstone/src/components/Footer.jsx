import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <span className="text-green-400 text-2xl font-bold mr-2">🥗</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">NutriChef</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your all-in-one solution for healthy eating, recipe discovery, and meal planning.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Recipe Finder</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Restaurant Finder</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Diet Planner</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Grocery List</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">GDPR</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@nutrichef.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Hours: Mon-Fri, 9am-5pm EST</li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-800" />
        
        <div className="text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} NutriChef. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;