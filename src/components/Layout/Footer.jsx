import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#1a1a1a] text-gray-400 border-t-1 border-[#1F242A]">
            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Social Links */}
                <div>
                    <h2 className="text-white text-xl font-semibold mb-3">ShreeXpress</h2>
                    <p className="text-sm">
                        Fastest and most reliable courier service. Delivering trust across the nation.
                    </p>
                    <div className="flex mt-4 space-x-4 text-xl">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group inline-block" >
                            <FaFacebook
                                className="text-white transition-all duration-300 transform group-hover:-translate-y-1 group-hover:text-[#1877F2]"
                                size={24}
                            />
                        </a>

                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group inline-block" >
                            <FaInstagram
                                className="text-white transition-all duration-300 transform group-hover:-translate-y-1 group-hover:text-[#E4405F]"
                                size={24}
                            />
                        </a>

                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group inline-block" >
                            <FaTwitter
                                className="text-white transition-all duration-300 transform group-hover:-translate-y-1 group-hover:text-[#1DA1F2]"
                                size={24}
                            />
                        </a>

                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="group inline-block" >
                            <FaLinkedin
                                className="text-white transition-all duration-300 transform group-hover:-translate-y-1 group-hover:text-[#0077B5]"
                                size={24}
                            />
                        </a>
                    </div>

                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-white text-lg font-semibold mb-3">Quick Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-white">Home</Link></li>
                        <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                        <li><Link to="/services" className="hover:text-white">Services</Link></li>
                        <li><Link to="/contact-us" className="hover:text-white">Contact</Link></li>
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
            <div className="border-t-1 border-[#1F242A] py-4 text-center text-sm">
                © {new Date().getFullYear()} ShreeXpress. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
