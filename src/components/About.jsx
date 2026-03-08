import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about">
      <div className="container">
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="about-grid">
            <div>
              <span className="section-tag">Background</span>
              <h2 className="section-title">About Me</h2>
            </div>
            <div className="about-text">
              <p>
                Hello! I am <span className="about-highlight">Khim</span>, an IT student with a deep fascination
                for how technology shapes our world. My journey in tech started with a simple curiosity
                about how websites work, which has since evolved into a dedicated pursuit of software
                development excellence.
              </p>
              <p style={{ marginTop: '20px' }}>
                I am committed to <span className="about-highlight">continuous learning</span> and staying
                updated with the latest industry standards. My goal is to build meaningful applications that
                solve real-world problems while maintaining a high standard of code quality and user
                experience.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
