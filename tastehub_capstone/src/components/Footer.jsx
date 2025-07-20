import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-6 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex items-center text-lg font-bold mb-2 md:mb-0">
          <span className="mr-2">😋</span> Tastehub &copy; {new Date().getFullYear()}
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-400 transition">Twitter</a>
          <a href="#" className="hover:text-blue-400 transition">Instagram</a>
          <a href="#" className="hover:text-blue-400 transition">Facebook</a>
        </div>
      </div>
    </footer>
  );
}