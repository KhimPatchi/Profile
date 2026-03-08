import { useState, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 100, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
    },
  },
};

const SpotlightCertificationCard = memo(({ cert, isRevealed, onToggle }) => {
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
    <motion.div 
      variants={itemVariants}
      className="group relative cursor-pointer h-full"
      onClick={onToggle}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--mouse-x': '0px',
        '--mouse-y': '0px',
        '--spotlight-opacity': '0'
      }}
    >
      <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-[32px] border border-white/10 bg-[#0a0a0a] transition-all duration-700 group-hover:border-primary/50 flex items-center justify-center">
          {/* Optimized Spotlight Gradient */}
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-40"
            style={{
              background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(124, 58, 237, 0.15), transparent 80%)`,
              opacity: 'var(--spotlight-opacity)',
            }}
          />

          {/* Blurred Background Shadow */}
          <img 
            src={cert.img} 
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-125 pointer-events-none z-0"
          />

          {/* Main Certificate Image */}
          <img 
              src={cert.img} 
              alt={cert.title} 
              className={`relative w-full h-full object-contain transition-all duration-1000 ${isRevealed ? 'z-30 blur-0 scale-100' : 'z-10 blur-3xl scale-110'}`} 
          />
          
          {/* Dark Overlay when blurred */}
          <div className={`absolute inset-0 bg-background/60 transition-opacity duration-1000 z-20 ${isRevealed ? 'opacity-0' : 'opacity-100'}`} />
          
          <AnimatePresence mode="wait">
              {!isRevealed && (
                  <motion.div 
                      className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-t from-background/90 via-background/20 to-transparent z-50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                  >
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 mb-6 group-hover:scale-110 transition-transform duration-500">
                          <i className="fas fa-eye text-2xl text-white/50 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-tight">{cert.title}</h3>
                      <p className="text-xs text-textSecondary uppercase tracking-widest">{cert.provider}</p>
                      <div className="mt-8 overflow-hidden">
                        <motion.span 
                          className="block text-[12px] font-bold text-primary"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                          Click to Reveal
                        </motion.span>
                      </div>
                  </motion.div>
              )}
          </AnimatePresence>
          
          {/* Subtle Hover Glow */}
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-[100px] z-0" />
      </div>
    </motion.div>
  );
});

const Certifications = () => {
  const certs = [
    { title: "Java Certification", img: "/assets/cert1.png", provider: 'Oracle Academy' },
    { title: "HTML & CSS Certification", img: "/assets/cert2.png", provider: 'W3C Standard' },
    { title: "Database Certification", img: "/assets/cert3.png", provider: 'SQL Masters' },
    { title: "Network Security Certification", img: "/assets/cert4.png", provider: 'Cyber Academy' }
  ];

  const [revealedIndex, setRevealedIndex] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      },
    },
  };

  return (
    <section id="certifications" className="py-24 px-4 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-150px" }}
           variants={containerVariants}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
            <motion.div 
              className="max-w-2xl"
              variants={itemVariants}
            >
                <span className="section-tag">Validation Portfolio</span>
                <h2 className="text-4xl md:text-6xl font-outfit font-bold text-white tracking-tight">Verified Achievements</h2>
            </motion.div>
            <motion.p 
              className="text-textSecondary max-w-sm"
              variants={itemVariants}
            >
                Each milestone reflects a dedicated pursuit of professional excellence and technical mastery in specific IT domains.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            {certs.map((cert, index) => (
              <SpotlightCertificationCard 
                key={index}
                cert={cert}
                isRevealed={revealedIndex === index}
                onToggle={() => setRevealedIndex(revealedIndex === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
