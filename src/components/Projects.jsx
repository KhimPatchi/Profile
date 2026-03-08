import { useRef, memo } from 'react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15
    }
  }
};

const SpotlightProjectCard = memo(({ project }) => {
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
      className="group relative bg-[#0a0a0a] rounded-[48px] border border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-700 h-full flex flex-col"
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
        '--spotlight-opacity': '0'
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(124, 58, 237, 0.15), transparent 80%)`,
          opacity: 'var(--spotlight-opacity)',
        }}
      />

      <div className="relative aspect-video overflow-hidden">
        <img 
          src={project.img} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
      </div>

      <div className="p-10 flex flex-col flex-grow relative z-20">
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="text-[10px] font-bold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20 uppercase tracking-widest leading-none">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-textSecondary leading-relaxed text-lg mb-8 line-clamp-3">
          {project.desc}
        </p>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
          <a href={project.link} className="flex items-center gap-3 text-white font-bold group/link">
            <span className="text-sm">View Implementation</span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/link:bg-primary transition-colors duration-500">
              <i className="fas fa-external-link-alt text-[10px]" />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
});

const Projects = () => {
  const projects = [
    {
      title: "Clinic Management System",
      desc: "A comprehensive solution for healthcare providers with real-time patient tracking, appointment scheduling, and integrated billing workflows using the TALL stack.",
      img: "/assets/proj1.png",
      tags: ["Laravel", "Alpine.js", "Tailwind", "PostgreSQL"],
      link: "#"
    },
    {
      title: "Task Orchestration Engine",
      desc: "An intelligent task management and automation platform designed for high-concurrency workflows and multi-team collaboration.",
      img: "/assets/proj2.png",
      tags: ["React", "FastAPI", "Redis", "Docker"],
      link: "#"
    },
    {
      title: "Financial Analytics Suite",
      desc: "Deep-learning driven financial analysis tool providing real-time market insights and portfolio risk assessment with dynamic data visualization.",
      img: "/assets/proj3.png",
      tags: ["Python", "TensorFlow", "D3.js", "AWS"],
      link: "#"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-150px" }}
           variants={containerVariants}
        >
          <div className="max-w-2xl mb-16 px-4">
            <span className="section-tag ml-1 border-l-2 border-primary pl-1 mb-4 block">Production Showcase</span>
            <h2 className="text-4xl md:text-6xl font-outfit font-bold text-white mb-6">Featured Craft</h2>
            <p className="text-textSecondary text-xl leading-relaxed">
              Exploring the convergence of sophisticated architecture and seamless user interaction through real-world ecosystem development.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 px-4">
            {projects.map((project, index) => (
              <motion.div key={index} variants={itemVariants}>
                <SpotlightProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
