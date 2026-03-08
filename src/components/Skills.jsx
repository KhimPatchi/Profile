import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    {
      title: "Laravel Framework",
      desc: "Building robust, scalable backends and elegant web applications using PHP and the Laravel ecosystem.",
      icon: "fab fa-laravel",
      color: "#ff2d20",
      delay: 0.1
    },
    {
      title: "Web Development",
      desc: "Crafting responsive, high-performance interfaces using modern HTML, CSS, and vanilla JavaScript.",
      icon: "fas fa-code",
      color: "#06b6d4",
      delay: 0.2
    },
    {
      title: "Database Systems",
      desc: "Designing efficient data schemas and managing information with a focus on integrity and speed.",
      icon: "fas fa-database",
      color: "#7c3aed",
      delay: 0.3
    }
  ];

  return (
    <section id="skills">
      <div className="container">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
        >
          <span className="section-tag">Technical Journey</span>
          <h2 className="section-title">Technical Skills</h2>
          <div className="grid">
            {skills.map((skill, index) => (
              <motion.div 
                key={index}
                className={`feature-item ${index === 0 ? 'highlight-laravel' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: skill.delay }}
              >
                <div className="feature-icon" style={{ color: skill.color }}>
                  <i className={skill.icon}></i>
                </div>
                <h3>{skill.title}</h3>
                <p>{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
