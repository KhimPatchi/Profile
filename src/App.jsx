import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Projects from './components/Projects'
import Footer from './components/Footer'
import './index.css'

function App() {
  return (
    <>
      <div className="bg-container">
        <div className="bg-overlay"></div>
      </div>
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Certifications />
        <Projects />
      </main>
      
      <Footer />
    </>
  )
}

export default App
