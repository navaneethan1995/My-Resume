import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const NavbarWithSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skill", path: "/skills" },
    { name: "Resume", path: "/resume" },
    { name: "Project", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      
      <nav className="flex justify-between items-center px-6 py-4 bg-transparent text-white fixed top-0 left-0 w-full z-50 ">
        <div className="text-xl font-bold">NK</div>

        
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`${
                  currentPath === item.path
                    ? "bg-blue-600 px-4 py-1.5 rounded-full text-white"
                    : "hover:text-blue-400 transition"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        
        <button onClick={() => setIsOpen(true)} className="md:hidden">
          <FaBars size={24} />
        </button>
      </nav>

      
      <div
        className={`fixed inset-0 bg-[#00000086] z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

     
      <div
        className={`fixed top-0 right-0 w-4/5 max-w-sm h-full bg-[#1e1e1e] text-white z-50 p-6 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        
        <div className="flex justify-end">
          <button onClick={() => setIsOpen(false)}>
            <FaTimes size={24} />
          </button>
        </div>

        
        <div className="mt-6 space-y-4">
          <div>
            <p className="uppercase text-gray-400 text-sm mb-2">Menu</p>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block ${
                      currentPath === item.path
                        ? "text-blue-400 font-semibold"
                        : "hover:text-blue-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="uppercase text-gray-400 text-sm mb-2">Get in Touch</p>
            <p className="text-white">navanee7531@gmail.com</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarWithSidebar;
