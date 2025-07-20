import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/recipe-finder', label: 'Recipe Finder', icon: '🍳' },
  { to: '/restaurant-finder', label: 'Restaurant Finder', icon: '🍔' },
  { to: '/diet-planner', label: 'Diet Planner', icon: '🥦' },
  { to: '/grocery-list', label: 'Grocery List', icon: '🛒' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b-2 border-black shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="flex items-center text-2xl font-extrabold text-black">
          <span className="mr-2">😋</span> Tastehub
        </Link>
        <button className="md:hidden text-3xl" onClick={() => setOpen(!open)}>
          {open ? '✖️' : '☰'}
        </button>
        <div className="hidden md:flex space-x-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center text-lg font-bold text-black hover:text-blue-600 transition"
            >
              <span className="mr-1">{link.icon}</span> {link.label}
            </Link>
          ))}
        </div>
      </div>
      {open && (
        <div className="md:hidden flex flex-col items-center bg-white border-t-2 border-black py-2">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center text-lg font-bold text-black hover:text-blue-600 py-2 w-full justify-center"
              onClick={() => setOpen(false)}
            >
              <span className="mr-1">{link.icon}</span> {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;