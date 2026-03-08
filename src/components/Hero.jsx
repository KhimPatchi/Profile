import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="hero">
      <div className="container">
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="hero-wrapper">
            <div className="hero-content">
              <motion.span 
                className="section-tag"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hello, I'm Khim
              </motion.span>
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Aspiring IT <br />Professional
              </motion.h1>
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Currently a dedicated IT Student passionate about crafting digital solutions and exploring
                the vast landscape of technology.
              </motion.p>
              <motion.div 
                className="btn-group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <a href="#about" className="btn btn-primary">About Me</a>
                <a href="#certifications" className="btn btn-secondary">Certifications</a>
              </motion.div>
            </div>
            <motion.div 
              className="profile-img-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <img src="/assets/khim.jpg" alt="Khim - IT Student" className="profile-img" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
