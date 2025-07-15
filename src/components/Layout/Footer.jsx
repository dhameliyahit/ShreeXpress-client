import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Social Links */}
        <div>
          <h2 className="text-white text-xl font-semibold mb-3">ShreeXpress</h2>
          <p className="text-sm">
            Fastest and most reliable courier service. Delivering trust across the nation.
          </p>
          <div className="flex mt-4 space-x-4 text-xl">
            <Link to="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook className="hover:text-white hover:pb-1 transition-all" /></Link>
            <Link to="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram className="hover:text-white hover:pb-1 transition-all" /></Link>
            <Link to="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter className="hover:text-white hover:pb-1 transition-all" /></Link>
            <Link to="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin className="hover:text-white hover:pb-1 transition-all" /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h2 className="text-white text-lg font-semibold mb-3">Legal</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link to="/disclaimer" className="hover:text-white">Disclaimer</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} ShreeXpress. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
