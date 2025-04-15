import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import projectImage1 from '../assets/project1.jpg';
import projectImage2 from '../assets/project2.jpg';
import projectImage3 from '../assets/project3.jpg';


const projects = [
  {
    title: 'Website Developing - Souzelcede',
    description: 'Developed upon request by a company in the metallurgical industry, with the goal of strengthening their digital presence.',
    image: projectImage1,
    technologies: ['HTML', 'JavaScript', 'CSS', 'AWS'],
    github: 'https://github.com',
    live: 'https://www.souzelcede.com',
    color: 'from-purple-600 to-blue-600'
  },
  {
    title: 'Website Developing - DrBijuteria',
    description: 'Website developed upon request by a jewelry store based in Portugal, designed to showcase their products without integrating a payment system.',
    image: projectImage2,
    technologies: ['Next.js', 'Solidity', 'Web3.js', 'GraphQL'],
    github: 'https://github.com',
    live: 'https://www.drbijuteria.com',
    color: 'from-blue-600 to-cyan-600'
  },
  {
    title: 'Personal Portfolio',
    description: 'Personal project created to showcase my skills and highlight some of the projects I have previously developed.',
    image: projectImage3,
    technologies: ['React', 'JavaScript', 'HTML', 'Node.js'],
    github: 'https://github.com',
    live: 'https://example.com',
    color: 'from-cyan-600 to-emerald-600'
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section id="projects" className="py-20 bg-gray-50" ref={containerRef}>
      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Innovative solutions that push the boundaries of what's possible on the web.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-64 md:h-full overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} mix-blend-multiply opacity-90`} />
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover-lift"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-purple-600 group/link"
                    >
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-700 hover:text-purple-600 group/link"
                    >
                      <ExternalLink size={20} className="mr-2" />
                      <span>Live Demo</span>
                      <ArrowRight size={16} className="ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}