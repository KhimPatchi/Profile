import { motion } from 'framer-motion';

const Projects = () => {
  return (
    <section id="projects">
      <div className="container">
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-tag">Learning Portfolio</span>
          <h2 className="section-title">Academic Achievements</h2>
          <p className="hero-subtitle" style={{ margin: '0 auto 32px', textAlign: 'center' }}>
            A collection of projects and milestones from my journey as an IT student.
          </p>
          <div className="grid">
            <motion.div 
              className="feature-item"
              whileHover={{ y: -10 }}
            >
              <div style={{ width: '100%', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-layer-group" style={{ fontSize: '3rem', color: 'var(--secondary-color)' }}></i>
              </div>
              <h3>Web App Components</h3>
              <p>Interactive UI elements designed for academic assignments.</p>
            </motion.div>
            <motion.div 
              className="feature-item"
              whileHover={{ y: -10 }}
            >
              <div style={{ width: '100%', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-brain" style={{ fontSize: '3rem', color: 'var(--primary-color)' }}></i>
              </div>
              <h3>Problem Solving</h3>
              <p>Algorithmic implementations and system design practice.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
