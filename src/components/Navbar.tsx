import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';



export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: 'Home', href: '#home' },
    { title: 'Projects', href: '#projects' },
    { title: 'Skills', href: '#skills' },
    { title: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              DevPortfolio
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="text-gray-700 hover:text-purple-600 transition-colors duration-200"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="https://github.com/AdamastorPT" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-purple-600">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/joão-oliveira-160914299/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-purple-600">
              <Linkedin size={20} />
            </a>
            <a href="mailto:joaooliveirafedv@gmail.com" className="text-gray-700 hover:text-purple-600">
              <Mail size={20} />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-sm">
              {menuItems.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-purple-600"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </a>
              ))}
              <div className="flex space-x-4 px-3 py-2">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-purple-600">
                  <Github size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-purple-600">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:your.email@example.com" className="text-gray-700 hover:text-purple-600">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}