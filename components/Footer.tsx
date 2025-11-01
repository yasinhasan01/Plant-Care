
import React from 'react';
import { FaLeaf, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-inner mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <NavLink to="/" className="flex items-center gap-2 text-[#2e7d32] hover:opacity-80 transition-opacity">
              <FaLeaf className="h-8 w-8" />
              <span className="font-bold text-xl">PlantCare</span>
            </NavLink>
            <p className="mt-2 text-gray-500 text-center md:text-left">Your personal plant care assistant.</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><NavLink to="/" className="text-gray-500 hover:text-[#2e7d32]">Home</NavLink></li>
              <li><NavLink to="/all-plants" className="text-gray-500 hover:text-[#2e7d32]">All Plants</NavLink></li>
              <li><NavLink to="/my-plants" className="text-gray-500 hover:text-[#2e7d32]">My Plants</NavLink></li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-gray-800">Contact & Socials</h3>
            <p className="mt-4 text-gray-500">contact@plantcare.app</p>
            <div className="flex justify-center md:justify-end mt-4 space-x-6">
              <a href="#" className="text-gray-400 hover:text-[#2e7d32]"><span className="sr-only">GitHub</span><FaGithub className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-[#2e7d32]"><span className="sr-only">Twitter</span><FaTwitter className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-[#2e7d32]"><span className="sr-only">LinkedIn</span><FaLinkedin className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} PlantCare Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
