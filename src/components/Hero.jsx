import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div 
          className="glass-card overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.span 
                className="section-tag inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Available for Projects
              </motion.span>
              <motion.h1 
                className="text-5xl md:text-7xl font-outfit font-bold tracking-tight bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Aspiring IT <br />
                <span className="text-secondary">Professional</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-textSecondary max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Dedicated IT Student crafting digital experiences with precision and passion. 
                Focusing on modern web ecosystems and scalable backend architectures.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <a href="#about" className="btn btn-primary px-10">Explore Work</a>
                <a href="#certifications" className="btn btn-secondary px-10">Credentials</a>
              </motion.div>
            </div>
            
            <motion.div 
              className="relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary blur-3xl opacity-30 animate-pulse" />
                
                <img 
                  src="/assets/khim.jpg" 
                  alt="Khim" 
                  className="relative w-full h-full object-cover animate-morph border-2 border-white/20 shadow-2xl z-10" 
                />
                
                <div className="absolute -bottom-4 -right-4 p-4 glass-card rounded-2xl border-white/20 z-20">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-sm font-semibold">Open to Work</span>
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
