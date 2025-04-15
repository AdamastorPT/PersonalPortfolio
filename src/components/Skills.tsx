import { motion } from 'framer-motion';
import { Code2, Layout, Settings } from 'lucide-react';

const skills = [
  {
    category: 'Frontend Development',
    icon: Layout,
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Three.js', 'HTML']
  },
  {
    category: 'DevOps',
    icon: Settings,
    items: ['Docker', 'Git']
  },
  {
    category: 'Programming Languages',
    icon: Code2,
    items: ['JavaScript', 'TypeScript', 'Java', 'Swift', 'CSS',]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and the technologies I work with.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <Icon className="w-6 h-6 text-purple-600 mr-2" />
                  <h3 className="text-xl font-semibold">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm border border-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}