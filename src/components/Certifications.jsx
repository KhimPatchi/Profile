import { useState } from 'react';
import { motion } from 'framer-motion';

const Certifications = () => {
  const certs = [
    { title: "Java Certification", img: "/assets/cert1.png" },
    { title: "HTML & CSS Certification", img: "/assets/cert2.png" },
    { title: "Database Certification", img: "/assets/cert3.png" },
    { title: "Network Security Certification", img: "/assets/cert4.png" }
  ];

  const [revealedIndex, setRevealedIndex] = useState(null);

  return (
    <section id="certifications">
      <div className="container">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
        >
          <span className="section-tag">Validation</span>
          <h2 className="section-title">Certifications Achievements</h2>
          <div className="cert-grid">
            {certs.map((cert, index) => (
              <motion.div 
                key={index}
                className="cert-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setRevealedIndex(revealedIndex === index ? null : index)}
              >
                <div className="cert-img-wrapper">
                  <img 
                    src={cert.img} 
                    alt={cert.title} 
                    className={`cert-img-blurred ${revealedIndex === index ? 'revealed' : ''}`} 
                  />
                  {revealedIndex !== index && (
                    <div className="blur-overlay">
                      <span>Click to Reveal</span>
                    </div>
                  )}
                </div>
                <h3 className="cert-title">{cert.title}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
