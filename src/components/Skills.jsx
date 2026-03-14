import { useRef, memo } from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const SpotlightCard = memo(({ children }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    cardRef.current.style.setProperty('--spotlight-opacity', '1');
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--spotlight-opacity', '0');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all duration-500 hover:border-white/20 overflow-hidden"
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
        '--spotlight-opacity': '0'
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(124, 58, 237, 0.1), transparent 40%)`,
          opacity: 'var(--spotlight-opacity)',
        }}
      />
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 group-hover:block z-10"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(124, 58, 237, 0.15), transparent 80%)`,
          opacity: 'var(--spotlight-opacity)',
        }}
      />
      {children}
    </div>
  );
});

const Skills = () => {
  const skills = [
    {
      title: "Laravel Framework",
      desc: "Building robust, scalable backends and elegant web applications using PHP and the Laravel ecosystem.",
      icon: "fab fa-laravel",
      color: "text-laravel", 
      tag: 'Backend'
    },
    {
      title: "Web Development",
      desc: "Crafting responsive, high-performance interfaces using modern HTML, CSS, and vanilla JavaScript.",
      icon: "fas fa-code",
      color: "text-secondary",
      tag: 'Frontend'
    },
    {
      title: "Database Systems",
      desc: "Designing efficient data schemas and managing information with a focus on integrity and speed.",
      icon: "fas fa-database",
      color: "text-primary",
      tag: 'Infrastructure'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="skills" className="p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <span className="section-tag pl-1 border-l-2 border-secondary mb-4 ml-1">Technical Foundation</span>
            <h2 className="text-4xl md:text-6xl font-outfit font-bold mb-16 text-white tracking-tight">Technical Mastery</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div key={index} variants={itemVariants}>
                <SpotlightCard>
                    <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                            <div className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500 group-hover:bg-white/10 ${skill.color}`}>
                                <i className={`${skill.icon} text-3xl transition-transform duration-500 group-hover:rotate-6`}></i>
                            </div>
                            <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-white/10 rounded-full text-textSecondary border border-white/5">{skill.tag}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">{skill.title}</h3>
                    <p className="text-textSecondary leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                        {skill.desc}
                    </p>
                    
                    <motion.div 
                        className="mt-8 flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <span>Explore More</span>
                        <i className="fas fa-arrow-right text-xs" />
                    </motion.div>
                    </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
