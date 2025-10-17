import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-gray-900 text-gray-300 p-6 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
      
      {/* Left Section: Logo and copyright */}
      <aside className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <span className="text-3xl">🧑‍💻</span>
        <p className="text-gray-400 text-sm sm:text-base">
          &copy; {new Date().getFullYear()} DevTinder - All rights reserved
        </p>
      </aside>

      {/* Right Section: Social Links */}
      <nav className="flex gap-4 mt-4 sm:mt-0">
        <a
          href="#"
          className="p-2 rounded-full hover:bg-purple-600 transition-colors text-xl"
        >
          
        </a>
        <a
          href="#"
          className="p-2 rounded-full hover:bg-red-600 transition-colors text-xl"
        >
          ▶️
        </a>
        <a
          href="#"
          className="p-2 rounded-full hover:bg-blue-600 transition-colors text-xl"
        >
          📘
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
