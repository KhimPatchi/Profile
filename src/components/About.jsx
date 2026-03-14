import { motion } from 'framer-motion';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="p-4">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="glass-card relative overflow-hidden group"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Decorative Background Blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] -mr-32 -mt-32 rounded-full transition-transform duration-700 group-hover:scale-125" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={itemVariants}>
              <span className="section-tag">About Me</span>
              <h2 className="section-title text-white">The Journey of a Tech Enthusiast</h2>
              <div className="space-y-6 text-lg text-textSecondary">
                <p>
                  I'm <span className="text-white font-bold decoration-secondary underline decoration-2 underline-offset-4">Khim</span>, 
                  an IT undergraduate student driven by the magic of building meaningful digital platforms. 
                  My fascination isn't just with code, but with the impact technology has on daily lives.
                </p>
                <p>
                  Currently honing skills in <span className="text-primary font-semibold">modern frameworks</span> and 
                  <span className="text-secondary font-semibold"> UI/UX design</span>. I believe in writing 
                  clean code that tells a story and solves complex problems elegantly.
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-2 gap-6">
                 {[
                    { label: 'Year', val: 'Final Year' },
                    { label: 'Major', val: 'Information Tech' }
                 ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                        <p className="text-xs uppercase tracking-widest text-textSecondary mb-1">{stat.label}</p>
                        <p className="text-xl font-bold text-white">{stat.val}</p>
                    </div>
                 ))}
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
                {[
                   { icon: 'fas fa-graduation-cap', title: 'Education' },
                   { icon: 'fas fa-lightbulb', title: 'Creativity' },
                   { icon: 'fas fa-laptop-code', title: 'Engineering' },
                   { icon: 'fas fa-rocket', title: 'Innovation' }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        className="p-6 bg-white/5 border border-white/10 rounded-3xl text-center group/item hover:bg-white/10 transition-all duration-300"
                        whileHover={{ y: -5 }}
                        variants={itemVariants}
                    >
                        <i className={`${item.icon} text-3xl mb-4 text-primary transition-colors duration-300 group-hover/item:text-secondary`} />
                        <p className="font-bold text-white">{item.title}</p>
                    </motion.div>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
