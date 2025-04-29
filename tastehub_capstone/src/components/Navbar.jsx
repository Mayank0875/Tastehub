import React, { useState } from 'react';
import Button from './Button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <span className="text-green-500 text-2xl font-bold mr-2">🥗</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">NutriChef</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <div className="flex items-center space-x-4">
            <Button text="Login" variant="outline" size="sm" />
            <Button text="Sign Up" size="sm" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 py-2">
          <div className="flex flex-col space-y-4">
            <MobileNavLinks />
            <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              <Button text="Login" variant="outline" fullWidth />
              <Button text="Sign Up" fullWidth />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLinks = () => (
  <div className="flex items-center space-x-8">
    <a href="#" className="text-gray-600 hover:text-green-500 font-medium">Recipe Finder</a>
    <a href="#" className="text-gray-600 hover:text-green-500 font-medium">Restaurant Finder</a>
    <a href="#" className="text-gray-600 hover:text-green-500 font-medium">Diet Planner</a>
    <a href="#" className="text-gray-600 hover:text-green-500 font-medium">Grocery List</a>
  </div>
);

const MobileNavLinks = () => (
  <>
    <a href="#" className="block text-gray-600 hover:text-green-500 font-medium py-2">Recipe Finder</a>
    <a href="#" className="block text-gray-600 hover:text-green-500 font-medium py-2">Restaurant Finder</a>
    <a href="#" className="block text-gray-600 hover:text-green-500 font-medium py-2">Diet Planner</a>
    <a href="#" className="block text-gray-600 hover:text-green-500 font-medium py-2">Grocery List</a>
  </>
);

export default Navbar;