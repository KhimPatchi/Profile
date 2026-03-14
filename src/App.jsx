import PortfolioScene from './components/PortfolioScene'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <div className="relative bg-[#020202]">
      <PortfolioScene>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
      </PortfolioScene>
      
      {/* Scrollable Spacer to drive the scroll animation */}
      <div className="h-[500vh] pointer-events-none" />
      
      <Footer />
    </div>
  )
}

export default App
