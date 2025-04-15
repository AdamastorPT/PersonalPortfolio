import React from 'react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero3D />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} João Oliveira. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;