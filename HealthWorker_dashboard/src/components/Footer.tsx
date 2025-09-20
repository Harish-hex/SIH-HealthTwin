import React from 'react';
import { Phone, MessageCircle, Smartphone, Mail, MapPin, Globe, Shield, Users, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Support Section */}
      <div className="bg-blue-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Need Help Getting Started?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our support team is available 24/7 to help you set up your account and get familiar with the system
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20">
              <Phone className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Call Support</h3>
              <p className="text-blue-100 mb-4">📞 1800-XXX-XXXX</p>
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
                Call Now
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20">
              <MessageCircle className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Live Chat Support</h3>
              <p className="text-blue-100 mb-4">💬 Available 24/7</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Start Chat
              </button>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20">
              <Smartphone className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Download Mobile App</h3>
              <p className="text-blue-100 mb-4">📱 iOS & Android</p>
              <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Digital Health Twin</h3>
                  <p className="text-blue-200 text-sm">Smart Health Monitoring</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Protecting Northeast India from water-borne diseases through AI-powered early detection 
                and community health monitoring.
              </p>
              <div className="flex items-center space-x-2 text-sm text-blue-200">
                <Shield className="h-4 w-4" />
                <span>🔒 Secure</span>
                <span>•</span>
                <Globe className="h-4 w-4" />
                <span>🌐 Accessible</span>
                <span>•</span>
                <Heart className="h-4 w-4" />
                <span>🤝 Community-First</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Digital Health Twin</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features & Services</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help & FAQ</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Training Resources</a></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-400 mt-1" />
                  <div>
                    <div className="text-gray-300">Email Support</div>
                    <div className="text-white font-medium">support@healthwatch-ne.gov.in</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-400 mt-1" />
                  <div>
                    <div className="text-gray-300">Regional Office</div>
                    <div className="text-white font-medium">Health Technology Hub</div>
                    <div className="text-gray-300">Guwahati, Assam - 781001</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="h-5 w-5 text-blue-400 mt-1" />
                  <div>
                    <div className="text-gray-300">Coverage Area</div>
                    <div className="text-white font-medium">All 8 Northeast States</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Get Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Get Support</h4>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-gray-300 mb-1">Toll-Free Helpline</div>
                  <div className="text-white font-semibold">1800-XXX-HEALTH</div>
                  <div className="text-sm text-gray-400">Live Chat Available 24/7</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-gray-300 mb-1">Mobile App</div>
                  <div className="text-white font-semibold">iOS & Android</div>
                  <div className="text-sm text-gray-400">Download from app stores</div>
                </div>
                <div className="bg-red-900/30 border border-red-600/30 rounded-lg p-4">
                  <div className="text-red-200 mb-1">Health Emergency</div>
                  <div className="text-red-100 font-semibold">📞 108 (Ambulance)</div>
                  <div className="text-sm text-red-300">Available 24/7 across all NE states</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partnership Section */}
      <div className="border-t border-white/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold text-gray-300 mb-4">In partnership with</h4>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
              <span>Government of India & Northeast State Governments</span>
              <span>•</span>
              <span>Ministry of Health & Family Welfare</span>
              <span>•</span>
              <span>DoNER Ministry</span>
              <span>•</span>
              <span>UNICEF India</span>
              <span>•</span>
              <span>WHO South-East Asia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>© 2025 Digital Health Twin. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;