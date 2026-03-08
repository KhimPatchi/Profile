import { motion } from 'framer-motion'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Projects from './components/Projects'
import Footer from './components/Footer'
import CursorFollower from './components/CursorFollower'
import './index.css'

function App() {
  return (
    <div className="relative min-h-screen">
      <CursorFollower />
      {/* Background Layers */}
      <div className="bg-container">
        <div className="bg-overlay"></div>
      </div>
      
      {/* Animated Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div 
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 blur-[120px] rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary/20 blur-[150px] rounded-full"
          animate={{
            x: [0, -120, 0],
            y: [0, -80, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
      </main>
      
      <Footer />
    </div>
  )
}

export default App
